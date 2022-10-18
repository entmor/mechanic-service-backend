import { Request, Response } from 'express';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { grpcAuthClient } from '../../../../grpcClients';
import { SetAuthRequest } from '../../../../../grpc/Auth/Auth_pb';

type ResponseApi = Response<
    { token: string; user: User } | ApiResponse,
    { type: 'user' | 'client' }
>;
type RequestApi = Request<any, any, Pick<User, 'password' | 'email'>>;

export default function ({ body }: RequestApi, responseApi: ResponseApi): void {
    try {
        /** MAKE GRPC_REQUEST [SET_AUTH] **/
        const grpcAuthRequest = new SetAuthRequest();
        grpcAuthRequest.setEmail(body.email);
        grpcAuthRequest.setPassword(body.password);

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
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [SET_AUTH] **/

        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
