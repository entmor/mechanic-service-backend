import { Response, Request } from 'express';
import { GetAllRequest, GetAllResponse } from '../../../../../interface/request';
import { Car } from '../../../../../interface/car';
import { ApiResponse } from '../../errors';
import { GetAllCarsRequest } from '../../../../../grpc/Car/Car_pb';

type RequestApi = Request<any, any, any, GetAllRequest>;
type ResponseApi = Response<GetAllResponse<Car> | ApiResponse>;

export default function ({ query }: RequestApi, responseApi: ResponseApi): void {
    const requestGRPC = new GetAllCarsRequest();

    requestGRPC.setPage(+query.page);
    requestGRPC.setPerPage(+query.per_page);
    // requestGRPC.setOrderby(query.)
    requestGRPC.setSort(query.sort);
}
