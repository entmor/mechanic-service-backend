import { Request, Response } from 'express';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { UpdateUserRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../../../grpcClients';
import { UserSchema } from '../../../../../grpc/Schema/UserSchema_pb';
import { Logger } from '../../../../../middleware/Logger/logger';
import { catchErrorAndResponse } from '../../middleware/catchError';

type OmittedUser = Omit<User, 'createdAt' | 'updatedAt'>;

type RequestApi = Request<unknown, unknown, OmittedUser>;
type ResponseApi = Response<{ updated: boolean } | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { body } = requestApi;
        const { logger, user } = responseApi.locals;

        /** LOGGER  **/
        logger.log('debug', body);

        /** PREPARE DATE FOR GRPC_REQUEST [UPDATE_USER] **/
        const userSchema = fromJsonToGrpc<UserSchema, User>(new UserSchema(), body, {
            excludeKeys: ['createdAt', 'sendEmail', 'updatedAt'],
        });

        /** MAKE GRPC_REQUEST [UPDATE_USER] **/
        const requestGRPC = new UpdateUserRequest();
        requestGRPC.setUser(userSchema);

        grpcUserClient.updateUser(requestGRPC, (error, grpcResponse) => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [UPDATE_USER] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [UPDATE_USER] **/

                responseApi.status(200).json({
                    updated: grpcResponse.getUpdated(),
                });

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    userId: user.id,
                    rest: {
                        updated: grpcResponse.getUpdated(),
                    },
                });
            }
        });
        //
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [UPDATE_USER] **/
        catchErrorAndResponse(error, responseApi, 'updatedUser');
    }
}
