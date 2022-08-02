import * as grpc from '@grpc/grpc-js';
import { DeleteCarRequest, DeleteCarResponse } from '../../../../grpc/Car/Car_pb';
import { MongoDb } from '../../../../middleware/Mongodb';
import { ObjectId } from 'mongodb';

type Call = grpc.ServerUnaryCall<DeleteCarRequest, DeleteCarResponse>;
type Callback = grpc.sendUnaryData<DeleteCarResponse>;

export const deleteCar = (mongodb: MongoDb) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** DELETE CAR FROM DATABASE **/
            const carId = new ObjectId(request.getId());
            const responseFromDb = await mongodb.collection.findOneAndDelete(carId);

            if (responseFromDb.ok === 0) {
                /** SEND RESPONSE_ERROR [DELETE_CAR] **/
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: "Object isn't exist.",
                });
            } else {
                /** SUCCESS RESPONSE GRPC [DELETE_CAR] */
                const responseGRPC = new DeleteCarResponse();
                responseGRPC.setDeleted(true);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
