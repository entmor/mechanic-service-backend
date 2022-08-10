import * as grpc from '@grpc/grpc-js';
import { CarSchema, GetCarRequest, GetCarResponse } from '../../../../grpc/Car/Car_pb';
import { isFound, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Car } from '../../../../interface/car';
import { ObjectId } from 'mongodb';

type Call = grpc.ServerUnaryCall<GetCarRequest, GetCarResponse>;
type Callback = grpc.sendUnaryData<GetCarResponse>;

export const getCar = (mongodb: MongoDb<Car>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET CAR FROM DATABASE **/
            const carId = new ObjectId(request.getId());
            const carObject = await isFound(await mongodb.collection.findOne(carId));

            /** SUCCESS RESPONSE GRPC [GET_CAR]  */
            const carSchema = fromJsonToGrpc<CarSchema, Car>(new CarSchema(), carObject);

            const responseGRPC = new GetCarResponse();
            responseGRPC.setCar(carSchema);

            callback(null, responseGRPC);
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
