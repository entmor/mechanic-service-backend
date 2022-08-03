import * as grpc from '@grpc/grpc-js';
import { DeleteCarRequest, DeleteCarResponse } from '../../../../grpc/Car/Car_pb';
import { isDeleted, MongoDb } from '../../../../middleware/Mongodb';
import { ObjectId } from 'mongodb';
import { Car } from '../../../../interface/car';

type Call = grpc.ServerUnaryCall<DeleteCarRequest, DeleteCarResponse>;
type Callback = grpc.sendUnaryData<DeleteCarResponse>;

export const deleteCar = (mongodb: MongoDb<Car>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** DELETE CAR FROM DATABASE **/
            const carId = new ObjectId(request.getId());
            const deleted = await isDeleted(await mongodb.collection.findOneAndDelete(carId));

            /** SUCCESS RESPONSE GRPC [DELETE_CAR] */
            const responseGRPC = new DeleteCarResponse();
            responseGRPC.setDeleted(deleted);

            callback(null, responseGRPC);
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
