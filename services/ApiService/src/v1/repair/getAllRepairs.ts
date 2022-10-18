import { Request, Response } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { Repair } from '../../../../../interface/repair.interface';
import { GetAllRepairsRequest } from '../../../../../grpc/Repair/Repair_pb';
import { grpcRepairClient } from '../../../../grpcClients';

type RequestApi = Request<unknown, unknown, unknown, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<Repair> | ApiResponse>;

export default function ({ query }: RequestApi, responseApi: ResponseApi): void {
    try {
        /** SET PARAMS FROM CALL **/
        const requestGRPC = new GetAllRepairsRequest();

        requestGRPC.setPage(+query.page || +'');
        requestGRPC.setPerPage(+query.per_page || +'');
        requestGRPC.setOrderby(query.orderby || '');
        requestGRPC.setSort(query.sort || '');
        requestGRPC.setWhere(JSON.stringify(query.where || {}));

        /** MAKE GRPC_REQUEST [GET_ALL_REPAIRS] **/
        grpcRepairClient.getAllRepairs(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                console.log(error);
                /** ERROR GRPC_REQUEST HANDLER [GET_ALL_REPAIRS] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [GET_ALL_REPAIRS] **/
                const { count, repairsList, page, perPage, sort, isNextPage } =
                    grpcResponse.toObject();

                responseApi.json({
                    count,
                    page,
                    per_page: perPage,
                    sort,
                    isNextPage,
                    data: repairsList,
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
