import { Request, Response } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { Client } from '../../../../../interface/client.interface';
import { grpcClientClient } from '../../../../grpcClients';
import { GetAllClientsRequest } from '../../../../../grpc/Client/Client_pb';

type RequestApi = Request<unknown, unknown, unknown, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<Client> | ApiResponse>;

export default function ({ query }: RequestApi, responseApi: ResponseApi): void {
    try {
        /** SET PARAMS FROM CALL **/
        const requestGRPC = new GetAllClientsRequest();

        requestGRPC.setPage(+query.page || +'');
        requestGRPC.setPerPage(+query.per_page || +'');
        requestGRPC.setOrderby(query.orderby || '');
        requestGRPC.setSort(query.sort || '');
        requestGRPC.setWhere(JSON.stringify(query.where || {}));

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
