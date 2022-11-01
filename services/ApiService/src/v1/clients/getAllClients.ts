import { Request, Response } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { Client } from '../../../../../interface/client.interface';
import { grpcClientClient } from '../../../../grpcClients';
import { GetAllClientsRequest } from '../../../../../grpc/Client/Client_pb';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';
import { catchErrorAndResponse } from '../../middleware/catchError';

type RequestApi = Request<unknown, unknown, unknown, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<Client> | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        const { query } = requestApi;
        const { logger, user } = responseApi.locals;

        /** SET PARAMS FROM CALL **/
        const requestGRPC = new GetAllClientsRequest();

        requestGRPC.setPage(+query.page || +'');
        requestGRPC.setPerPage(+query.per_page || +'');
        requestGRPC.setOrderby(query.orderby || '');
        requestGRPC.setSort(query.sort || '');
        requestGRPC.setWhere(JSON.stringify(query.where || {}));

        /** LOGGER  **/
        logger.log('debug', query);

        /** MAKE GRPC_REQUEST [GET_ALL_CLIENTS] **/
        grpcClientClient.getAllClients(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [GET_ALL_CARS] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [GET_ALL_CARS] **/
                const { count, clientsList, page, perPage, sort, isNextPage } =
                    grpcResponse.toObject();

                responseApi.json({
                    count,
                    page,
                    per_page: perPage,
                    sort,
                    isNextPage,
                    data: clientsList,
                });

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    userId: user.id,
                    rest: {
                        user,
                        count,
                        listCount: clientsList.length,
                        page,
                        perPage,
                        sort,
                        isNextPage,
                    },
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_ALL_CARS] **/
        catchErrorAndResponse(error, responseApi, 'getAllCars');
    }
}
