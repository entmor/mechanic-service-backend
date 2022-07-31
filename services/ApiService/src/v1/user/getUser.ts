import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { GenderClient, GenderGrpc } from '../../../../../interface/gender';
import { User } from '../../../../../interface/user';
import { grpcUserClient } from '../../grpcClients';
import { GetUserRequest } from '../../../../../grpc/User/User_pb';
import { Gender } from '../../../../../grpc/Instructor/Instructor_pb';

interface ParamsRequest {
    id: number;
}
type ResponseApi = Response<User<GenderClient> | ApiResponse>;
type RequestApi = Request<ParamsRequest>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const ID = +requestApi.params.id;
        const auth = responseApi.locals.authUserMessage;

        if (ID > 0) {
            const request = new GetUserRequest();
            request.setId(ID);
            request.setAuth(auth);

            grpcUserClient.getUser(request, (error, grpcResponse) => {
                if (error) {
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    const user: User<GenderGrpc> = grpcResponse.getUser().toObject();

                    // GENDER - from number format to string format
                    const gender = <GenderClient>(
                        Object.keys(Gender).find(
                            (value: GenderClient) => Gender[value] === user.gender
                        )
                    );

                    responseApi.status(200).json({
                        ...user,
                        gender,
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
    } catch (error) {
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
