import * as grpc from '@grpc/grpc-js';
import { CarSchema, GetAllCarsRequest, GetAllCarsResponse } from '../../../../grpc/Car/Car_pb';
import { isNextPage, MongoDb, prepareFindOptions } from '../../../../middleware/Mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Car } from '../../../../interface/car';
import { response } from 'express';

type Call = grpc.ServerUnaryCall<GetAllCarsRequest, GetAllCarsResponse>;
type Callback = grpc.sendUnaryData<GetAllCarsResponse>;

export const getAllCar = (mongodb: MongoDb<Car>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * PREPARE DATA FROM GRPC
             * GET ALL CARS FROM DATABASE
             **/

            const where = request.hasWhere() ? JSON.parse(request.getWhere()) : {};

            const _prepareFindOptions = prepareFindOptions({
                per_page: +request.getPerPage(),
                page: +request.getPage(),
                sort: request.getSort(),
                orderby: request.getOrderby(),
            });

            const countCarsQuery = mongodb.collection.countDocuments(where);
            const getCarsQuery = mongodb.collection
                .find(where, _prepareFindOptions.findOptions)
                .toArray();

            const [countCars, carsArray] = await Promise.all([countCarsQuery, getCarsQuery]);
            const _isNextPage = isNextPage(
                _prepareFindOptions.findOptions.limit,
                _prepareFindOptions.query.page,
                +countCars
            );

            /** SUCCESS RESPONSE GRPC [GET_ALL_CARS]  */
            const responseGRPC = new GetAllCarsResponse();

            responseGRPC.setCount(+countCars);
            responseGRPC.setPage(+_prepareFindOptions.query.page);
            responseGRPC.setPerPage(+_prepareFindOptions.findOptions.limit);
            responseGRPC.setSort(_prepareFindOptions.query.sort);
            responseGRPC.setIsNextPage(_isNextPage);

            carsArray.forEach((car: Car): void => {
                responseGRPC.addCars(fromJsonToGrpc<CarSchema, Car>(new CarSchema(), car));
            });

            callback(null, responseGRPC);
            //
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
