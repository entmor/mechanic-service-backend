import { Request, Response } from 'express';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { grpcAuthClient } from '../../../../grpcClients';
import { SetAuthRequest } from '../../../../../grpc/Auth/Auth_pb';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { Logger } from '../../../../../middleware/Logger/logger';

type ResponseApi = Response<
    { token: string; user: User } | ApiResponse,
    { type: 'user' | 'client'; logger: Logger }
>;
type RequestApi = Request<any, any, Pick<User, 'password' | 'email'>>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        const { body } = requestApi;
        const { logger } = responseApi.locals;

        /** MAKE GRPC_REQUEST [SET_AUTH] **/
        const grpcAuthRequest = new SetAuthRequest();
        grpcAuthRequest.setEmail(body.email);
        grpcAuthRequest.setPassword(body.password);

        /** LOGGER  **/
        logger.log('debug', { body });

        grpcAuthClient.setAuth(grpcAuthRequest, (error, grpcAuthResponse) => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [SET_AUTH] **/
                const errorResponse = errorsHandler(error);
                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [SET_AUTH] **/
                const token = grpcAuthResponse.getToken();
                const user = grpcAuthResponse.getUser().toObject();

                responseApi.json({
                    token,
                    user,
                });

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    rest: {
                        token,
                        user,
                    },
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [SET_AUTH] **/
        catchErrorAndResponse(error, responseApi, 'setAuth');
    }
}
