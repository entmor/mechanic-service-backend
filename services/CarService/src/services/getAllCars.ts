import * as grpc from '@grpc/grpc-js';
import {
    CarSchema,
    GetAllCarsRequest,
    GetAllCarsResponse,
    GetCarRequest,
    GetCarResponse
} from '../../../../grpc/Car/Car_pb';
import { isFound, MongoDb } from '../../../../middleware/Mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Car } from '../../../../interface/car';
import {FindOptions, ObjectId} from 'mongodb';

type Call = grpc.ServerUnaryCall<GetAllCarsRequest, GetAllCarsResponse>;
type Callback = grpc.sendUnaryData<GetAllCarsResponse>;

export const getAllCar = (mongodb: MongoDb<Car>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET CARS FROM DATABASE **/

            const where =  ( request.hasWhere() ? JSON.parse(request.getWhere()) : { });
            const limit = +request.getPerPage() || 25;
            const offset = +request.get() || 25;

            const optionFind: FindOptions = {
                limit,
                skip

            }

            const getCars = await mongodb.collection.find( where );

            // const carId = new ObjectId(request.getId());
            // const carObject = await isFound(await mongodb.collection.findOne(carId));
            //
            // /** SUCCESS RESPONSE GRPC [GET_CAR]  */
            // const carSchema = fromJsonToGrpc<CarSchema, Car>(new CarSchema(), carObject);
            //
            // const responseGRPC = new GetCarResponse();
            // responseGRPC.setCar(carSchema);
            //
            // callback(null, responseGRPC);
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
