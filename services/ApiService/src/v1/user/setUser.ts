import { Request, Response } from 'express';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { SetUserRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../../../grpcClients';
import { UserSchema } from '../../../../../grpc/Schema/UserSchema_pb';
import { Logger } from '../../../../../middleware/Logger/logger';
import { catchErrorAndResponse } from '../../middleware/catchError';

type OmittedUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
interface RequestBody extends OmittedUser {
    sendEmail: boolean | string;
}

type RequestApi = Request<unknown, unknown, RequestBody>;
type ResponseApi = Response<{ id: string } | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { body } = requestApi;
        const { logger, user } = responseApi.locals;

        /** LOGGER  **/
        logger.log('debug', body);

        /** PREPARE DATE FOR GRPC_REQUEST [SET_USER] **/
        const userSchema = fromJsonToGrpc<UserSchema, User>(new UserSchema(), body, {
            excludeKeys: ['id', 'createdAt', 'sendEmail', 'updatedAt'],
        });

        /** MAKE GRPC_REQUEST [SET_USER] **/
        const requestGRPC = new SetUserRequest();
        requestGRPC.setUser(userSchema);

        // TODO usunac 'true'
        requestGRPC.setSendEmail(body.sendEmail == true || body.sendEmail == 'true');

        grpcUserClient.setUser(requestGRPC, (error, grpcResponse) => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [SET_USER] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [SET_USER] **/

                responseApi.status(200).json({
                    id: grpcResponse.getId(),
                });

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    userId: user.id,
                    rest: {
                        setId: grpcResponse.getId(),
                    },
                });
            }
        });
        //
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [SET_USER] **/
        catchErrorAndResponse(error, responseApi, 'setUser');
    }
}
