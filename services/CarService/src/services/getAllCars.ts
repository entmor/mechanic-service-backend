import * as grpc from '@grpc/grpc-js';
import { CarSchema, GetAllCarsRequest, GetAllCarsResponse } from '../../../../grpc/Car/Car_pb';
import {
    isNextPage,
    MongoDb,
    prepareFindFilter,
    prepareFindOptions,
} from '../../../../middleware/Mongodb/mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Car } from '../../../../interface/car';
import { FindFilterValidator } from '../models/validator.joi';

type Call = grpc.ServerUnaryCall<GetAllCarsRequest, GetAllCarsResponse>;
type Callback = grpc.sendUnaryData<GetAllCarsResponse>;

export const getAllCars = (mongodb: MongoDb<Car>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**  PREPARE DATA FROM GRPC **/

            const where = request.hasWhere() ? JSON.parse(request.getWhere()) : {};
            const preparedWhere = prepareFindFilter<Car>(FindFilterValidator(), where);

            const preparedFindOptions = prepareFindOptions({
                per_page: +request.getPerPage(),
                page: +request.getPage(),
                sort: request.getSort(),
                orderby: request.getOrderby(),
            });

            /** GET ALL CARS FROM DATABASE **/
            const countCarsQuery = mongodb.collection.countDocuments(preparedWhere);
            const getCarsQuery = mongodb.collection
                .find(preparedWhere, preparedFindOptions.findOptions)
                .toArray();

            const [countCars, carsArray] = await Promise.all([countCarsQuery, getCarsQuery]);
            const _isNextPage = isNextPage(
                preparedFindOptions.findOptions.limit,
                preparedFindOptions.query.page,
                +countCars
            );

            /** SUCCESS RESPONSE GRPC [GET_ALL_CARS]  */
            const responseGRPC = new GetAllCarsResponse();

            responseGRPC.setCount(+countCars);
            responseGRPC.setPage(+preparedFindOptions.query.page);
            responseGRPC.setPerPage(+preparedFindOptions.findOptions.limit);
            responseGRPC.setSort(preparedFindOptions.query.sort);
            responseGRPC.setIsNextPage(_isNextPage);

            carsArray.forEach((car): void => {
                if ('_id' in car) {
                    car.id = car._id.toString();
                }
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
