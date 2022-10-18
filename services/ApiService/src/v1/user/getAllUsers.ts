import { Request, Response } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request.interface';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { GetAllUsersRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../../../grpcClients';

type RequestApi = Request<null, null, null, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<User> | ApiResponse>;

export default function ({ query }: RequestApi, responseApi: ResponseApi) {
    try {
        /** SET PARAMS FROM CALL **/
        const requestGRPC = new GetAllUsersRequest();

        requestGRPC.setPage(+query.page || +'');
        requestGRPC.setPerPage(+query.per_page || +'');
        requestGRPC.setOrderby(query.orderby || '');
        requestGRPC.setSort(query.sort || '');
        requestGRPC.setWhere(JSON.stringify(query.where || {}));

        /** MAKE GRPC_REQUEST [GET_ALL_USERS] **/
        grpcUserClient.getAllUsers(requestGRPC, (error, grpcResponse) => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [GET_ALL_USERS] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [GET_ALL_USERS] **/
                const { count, usersList, page, perPage, sort, isNextPage } =
                    grpcResponse.toObject();

                responseApi.status(200).json({
                    count,
                    page,
                    per_page: perPage,
                    sort,
                    isNextPage,
                    data: usersList,
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_ALL_USERS] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
