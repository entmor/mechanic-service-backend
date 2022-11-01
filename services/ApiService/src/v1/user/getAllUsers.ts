import { Request, Response } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request.interface';
import { User } from '../../../../../interface/user.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { GetAllUsersRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../../../grpcClients';
import { Logger } from '../../../../../middleware/Logger/logger';
import { catchErrorAndResponse } from '../../middleware/catchError';

type RequestApi = Request<null, null, null, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<User> | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { query } = requestApi;
        const { logger, user } = responseApi.locals;

        /** SET PARAMS FROM CALL **/
        const requestGRPC = new GetAllUsersRequest();

        requestGRPC.setPage(+query.page || +'');
        requestGRPC.setPerPage(+query.per_page || +'');
        requestGRPC.setOrderby(query.orderby || '');
        requestGRPC.setSort(query.sort || '');
        requestGRPC.setWhere(JSON.stringify(query.where || {}));

        /** LOGGER  **/
        logger.log('debug', query);

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

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    userId: user.id,
                    rest: {
                        user,
                        count,
                        listCount: usersList.length,
                        page,
                        perPage,
                        sort,
                        isNextPage,
                    },
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_ALL_USERS] **/
        catchErrorAndResponse(error, responseApi, 'getAllUsers');
    }
}
