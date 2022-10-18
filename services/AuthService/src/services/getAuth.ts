import { Redis } from 'ioredis';
import * as grpc from '@grpc/grpc-js';
import { GetAuthRequest, GetAuthResponse } from '../../../../grpc/Auth/Auth_pb';
import { verifyToken } from '../middleware/token';
import { GetUserRequest } from '../../../../grpc/User/User_pb';
import { JoiValidator } from '../../../../helpers/validate';
import { GetLoginValidator } from '../model/validator.joi';
import { GetAuth } from '../../../../interface/auth.interface';
import { grpcUserClient } from '../../../grpcClients';

type Call = grpc.ServerUnaryCall<GetAuthRequest, GetAuthResponse>;
type Callback = grpc.sendUnaryData<GetAuthResponse>;

export const getAuth = (redisClient: Redis) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             *  GET DATA FROM GRPC_REQUEST [GET_AUTH] AND VALIDATE
             */
            const { token } = await JoiValidator<GetAuth, GetAuth>(
                GetLoginValidator,
                {
                    token: request.getToken(),
                },
                {
                    removeEmptyProperties: true,
                }
            );

            /**
             * 1) VERIFY TOKEN
             * 2) IS STILL EXIST ON DB?
             */
            const { id } = await verifyToken(token);
            const isTokenActive = await redisClient.get(`user_token:${id}:${token}`);

            if (isTokenActive !== null) {
                /**
                 * 1) PREPARE DATA FOR GRPC_REQUEST [GET_USER]
                 * 2) SEND REQUEST [GET_USER]
                 */
                const grpcGetUserRequest = new GetUserRequest();
                grpcGetUserRequest.setId(id);
                grpcUserClient.getUser(grpcGetUserRequest, (error, grpcUserGetResponse) => {
                    if (error) {
                        /** SEND RESPONSE_ERROR [GET_AUTH] */
                        console.log('titaj errror auth');
                        callback(error);
                    } else {
                        /**
                         *
                         * 1) PREPARE DATA FOR GRPC_RESPONSE [GET_AUTH]
                         * 2) SEND RESPONSE [GET_AUTH]
                         *
                         */
                        const grpcGetAuthResponse = new GetAuthResponse();
                        grpcGetAuthResponse.setToken(token);
                        grpcGetAuthResponse.setUser(grpcUserGetResponse.getUser());

                        callback(null, grpcGetAuthResponse);
                    }
                });
            } else {
                /** SEND RESPONSE_ERROR [GET_AUTH] **/
                callback({
                    code: grpc.status.UNAUTHENTICATED,
                    message: 'Token is not exist',
                });
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_AUTH] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
