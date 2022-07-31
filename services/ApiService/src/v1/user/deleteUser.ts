import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { DeleteUserRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../grpcClients';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<{ success: boolean } | ApiResponse>;

export default function ({ params }: RequestApi, responseApi: ResponseApi) {
    const ID = +params.id;

    try {
        if (ID > 0) {
            const deleteRequest = new DeleteUserRequest();

            deleteRequest.setId(ID);

            /*
              GRPC REQUEST
           */

            grpcUserClient.deleteUser(deleteRequest, (error, grpcResponse): void => {
                if (error) {
                    const errorResponse = errorsHandler(error);

                    console.log(errorResponse);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    responseApi.status(200).json({
                        success: grpcResponse.getSuccess(),
                    });
                }
            });
        } else {
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'ID must be a integer',
            });
        }
    } catch (e) {
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
