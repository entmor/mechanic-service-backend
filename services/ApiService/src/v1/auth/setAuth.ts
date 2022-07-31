import { Request, Response } from 'express';
import { User } from '../../../../../interface/user';
import { GenderClient, GenderGrpc } from '../../../../../interface/gender';
import { ApiResponse, errorsHandler } from '../../errors';
import { grpcAuthClient } from '../../grpcClients';
import { SetAuthRequest } from '../../../../../grpc/Auth/Auth_pb';

type ResponseApi = Response<
    { token: string; user: User<GenderGrpc> } | ApiResponse,
    { type: 'user' | 'client' }
>;
type RequestApi = Request<any, any, Pick<User<GenderClient>, 'password' | 'email'>>;

export default function ({ body }: RequestApi, responseApi: ResponseApi): void {
    try {
        // CREATE AuthRequestBody
        const grpcAuthRequest = new SetAuthRequest();
        grpcAuthRequest.setEmail(body.email);
        grpcAuthRequest.setPassword(body.password);

        grpcAuthClient.setAuth(grpcAuthRequest, (error, grpcAuthResponse) => {
            if (error) {
                const errorResponse = errorsHandler(error);
                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                const token = grpcAuthResponse.getToken();
                const user = grpcAuthResponse.getUser().toObject();

                responseApi.json({
                    token,
                    user,
                });
            }
        });
    } catch (error) {
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
