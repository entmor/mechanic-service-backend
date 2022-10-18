import { Request, Response } from 'express';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { grpcAuthClient } from '../../../../grpcClients';
import { GetAuthRequest } from '../../../../../grpc/Auth/Auth_pb';
import { getToken } from '../../middleware/getToken';

type ResponseApi = Response<
    { token: string; user: User } | ApiResponse,
    { type: 'user' | 'client' }
>;
type RequestApi = Request<unknown, unknown, { token: string }>;

export default async function ({ headers }: RequestApi, responseApi: ResponseApi) {
    try {
        const token = await getToken(headers.authorization);
        /** MAKE GRPC_REQUEST [GET_AUTH] **/
        const grpcAuthRequest = new GetAuthRequest();
        grpcAuthRequest.setToken(token);

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
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_AUTH] **/

        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}