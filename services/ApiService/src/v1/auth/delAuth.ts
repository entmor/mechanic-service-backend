import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { grpcAuthClient } from '../../../../grpcClients';
import { DeleteAuthRequest } from '../../../../../grpc/Auth/Auth_pb';
import { getToken } from '../../middleware/getToken';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { Logger } from '../../../../../middleware/Logger/logger';

type ResponseApi = Response<
    { deleted: boolean } | ApiResponse,
    { type: 'user' | 'client'; logger: Logger }
>;
type RequestApi = Request<unknown, unknown, { token: string }>;

export default async function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { headers } = requestApi;
        const { logger } = responseApi.locals;

        const token = await getToken(headers.authorization);
        /** MAKE GRPC_REQUEST [DELETE_AUTH] **/
        const grpcAuthRequest = new DeleteAuthRequest();
        grpcAuthRequest.setToken(token);

        /** LOGGER  **/
        logger.log('debug', { token });

        grpcAuthClient.deleteAuth(grpcAuthRequest, (error, grpcAuthResponse) => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [DELETE_AUTH] **/
                const errorResponse = errorsHandler(error);
                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [DELETE_AUTH] **/

                responseApi.json({
                    deleted: grpcAuthResponse.getDeleted(),
                });

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    rest: {
                        token,
                        deleted: grpcAuthResponse.getDeleted(),
                    },
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [DELETE_AUTH] **/
        catchErrorAndResponse(error, responseApi, 'deleteAuth');
    }
}
