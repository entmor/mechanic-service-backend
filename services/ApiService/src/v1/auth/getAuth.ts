import { Request, Response } from 'express';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { grpcAuthClient } from '../../../../grpcClients';
import { GetAuthRequest } from '../../../../../grpc/Auth/Auth_pb';
import { getToken } from '../../middleware/getToken';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { Logger } from '../../../../../middleware/Logger/logger';

type ResponseApi = Response<
    { token: string; user: User } | ApiResponse,
    { type: 'user' | 'client'; logger: Logger }
>;
type RequestApi = Request<unknown, unknown, { token: string }>;

export default async function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { headers } = requestApi;
        const { logger } = responseApi.locals;

        const token = await getToken(headers.authorization);
        /** MAKE GRPC_REQUEST [GET_AUTH] **/
        const grpcAuthRequest = new GetAuthRequest();
        grpcAuthRequest.setToken(token);

        /** LOGGER  **/
        logger.log('debug', { token });

        grpcAuthClient.getAuth(grpcAuthRequest, (error, grpcAuthResponse) => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [GET_AUTH] **/
                const errorResponse = errorsHandler(error);
                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [GET_AUTH] **/
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
        /** ERROR GRPC_REQUEST HANDLER [GET_AUTH] **/
        catchErrorAndResponse(error, responseApi, 'getAuth');
    }
}
