import { Request, Response } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request';
import { GenderClient, GenderGrpc } from '../../../../../interface/gender';
import { User } from '../../../../../interface/user';
import { ApiResponse, errorsHandler } from '../../errors';
import { GetAllUsersRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../grpcClients';
import { Gender } from '../../../../../grpc/Schema/UserSchema_pb';

type RequestApi = Request<null, null, null, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<User<GenderClient>> | ApiResponse>;

export default function ({ query }: RequestApi, responseApi: ResponseApi) {
    const request = new GetAllUsersRequest();

    request.setPage(query.page);
    request.setPerPage(query.per_page);
    request.setSort(query.sort);

    grpcUserClient.getAllUsers(request, (error, grpcResponse) => {
        if (error) {
            const errorResponse = errorsHandler(error);

            responseApi.status(errorResponse.http_code).json(errorResponse);
        } else {
            const { count, usersList, page, perPage, sort, isNextPage } = grpcResponse.toObject();

            const usersData = usersList.map((object) => {
                const gender = <GenderClient>(
                    Object.keys(Gender).find(
                        (value: GenderClient) => Gender[value] === object.gender
                    )
                );

                return {
                    ...object,
                    gender,
                };
            });

            responseApi.status(200).json({
                count,
                page,
                per_page: perPage,
                sort,
                isNextPage,
                data: usersData,
            });
        }
    });
}
