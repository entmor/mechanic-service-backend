import * as grpc from '@grpc/grpc-js';
import { CarSchema, GetCarRequest, GetCarResponse } from '../../../../grpc/Car/Car_pb';
import { MongoDb } from '../../../../middleware/Mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Car } from '../../../../interface/car';
import { ObjectId } from 'mongodb';

type Call = grpc.ServerUnaryCall<GetCarRequest, GetCarResponse>;
type Callback = grpc.sendUnaryData<GetCarResponse>;

export const getCar = (mongodb: MongoDb) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {

        try {
            const carId = new ObjectId(request.getId());

            //GET FROM DATABASE
            const carObject = await mongodb.collection.findOne(carId);

            if (carObject === null) {
                /* SEND RESPONSE_ERROR [GET_CAR] */
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: "Object isn't exist.",
                });
            } else {
                /**
                 * SUCCESS RESPONSE GRPC
                 */
                const carSchema = fromJsonToGrpc<CarSchema, Car>(new CarSchema(), carObject, {
                    getTimeChange: true,
                });

                const responseGRPC = new GetCarResponse();
                responseGRPC.setCar(carSchema);

                callback(null, responseGRPC);
            }

            //
        } catch (e) {
            /* SEND RESPONSE_ERROR [GET_CAR] */
            callback(e, null);
        }
    };
};
