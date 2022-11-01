import { Redis } from 'ioredis';
import * as grpc from '@grpc/grpc-js';
import { DeleteAuthRequest, DeleteAuthResponse } from '../../../../grpc/Auth/Auth_pb';
import { verifyToken } from '../middleware/token';
import { JoiValidator } from '../../../../helpers/validate';
import { DeleteLoginValidator } from '../model/validator.joi';
import { GetAuth } from '../../../../interface/auth.interface';

type Call = grpc.ServerUnaryCall<DeleteAuthRequest, DeleteAuthResponse>;
type Callback = grpc.sendUnaryData<DeleteAuthResponse>;

export const deleteAuth = (redisClient: Redis) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             *  GET DATA FROM GRPC_REQUEST [DELETE_AUTH] AND VALIDATE
             */
            const { token } = await JoiValidator<GetAuth, GetAuth>(
                DeleteLoginValidator,
                {
                    token: request.getToken(),
                },
                {
                    removeEmptyProperties: true,
                }
            );

            /** VERIFY TOKEN */
            const { id } = await verifyToken(token);

            /** delete TOKEN **/
            const deleted = await redisClient.del(`user_token:${id}:${token}`);

            /**
             * 1) PREPARE DATA FOR GRPC_RESPONSE [DELETE_AUTH]
             * 2) SEND RESPONSE [DELETE_AUTH]
             */
            const grpcDeleteAuthResponse = new DeleteAuthResponse();
            grpcDeleteAuthResponse.setDeleted(!!deleted);

            callback(null, grpcDeleteAuthResponse);
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_AUTH] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
