import { Response, Request } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request';
import { Car } from '../../../../../interface/car';
import { ApiResponse, errorsHandler } from '../../errors';
import { GetAllCarsRequest } from '../../../../../grpc/Car/Car_pb';
import { grpcCarClient } from '../../grpcClients';

type RequestApi = Request<unknown, unknown, unknown, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<Car> | ApiResponse>;

export default function ({ query }: RequestApi, responseApi: ResponseApi): void {
    try {
        /** SET PARAMS FROM CALL **/
        const requestGRPC = new GetAllCarsRequest();

        requestGRPC.setPage(+query.page);
        requestGRPC.setPerPage(+query.per_page);
        requestGRPC.setOrderby(query.orderBy);
        requestGRPC.setSort(query.sort);
        requestGRPC.setWhere(JSON.stringify(query.where));

        /** MAKE GRPC_REQUEST [GET_ALL_CARS] **/
        grpcCarClient.getAllCars(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [GET_ALL_CARS] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [GET_ALL_CARS] **/
                const { count, carsList, page, perPage, sort, isNextPage } =
                    grpcResponse.toObject();

                responseApi.json({
                    count,
                    page,
                    per_page: perPage,
                    sort,
                    isNextPage,
                    data: carsList,
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
