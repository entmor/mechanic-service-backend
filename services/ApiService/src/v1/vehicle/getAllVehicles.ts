import { Response, Request } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request';
import { Vehicle } from '../../../../../interface/vehicle-interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { grpcVehicleClient } from '../../grpcClients';
import { GetAllVehiclesRequest } from '../../../../../grpc/Vehicle/Vehicle_pb';

type RequestApi = Request<unknown, unknown, unknown, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<Vehicle> | ApiResponse>;

export default function ({ query }: RequestApi, responseApi: ResponseApi): void {
    try {
        /** SET PARAMS FROM CALL **/
        const requestGRPC = new GetAllVehiclesRequest();

        requestGRPC.setPage(+query.page || +'');
        requestGRPC.setPerPage(+query.per_page || +'');
        requestGRPC.setOrderby(query.orderby || '');
        requestGRPC.setSort(query.sort || '');
        requestGRPC.setWhere(JSON.stringify(query.where || {}));

        /** MAKE GRPC_REQUEST [GET_ALL_VEHICLES] **/
        grpcVehicleClient.getAllVehicles(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                console.log(error);
                /** ERROR GRPC_REQUEST HANDLER [GET_ALL_VEHICLES] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [GET_ALL_VEHICLES] **/
                const { count, vehiclesList, page, perPage, sort, isNextPage } =
                    grpcResponse.toObject();

                responseApi.json({
                    count,
                    page,
                    per_page: perPage,
                    sort,
                    isNextPage,
                    data: vehiclesList,
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
