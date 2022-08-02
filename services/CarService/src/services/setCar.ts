import * as grpc from '@grpc/grpc-js';
import { CarSchema, SetCarRequest, SetCarResponse } from '../../../../grpc/Car/Car_pb';
import { MongoDb } from '../../../../middleware/Mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Car } from '../../../../interface/car';
import { JoiValidator } from '../../../../helpers/validate';
import { SetCarValidator } from '../models/validator';

type Call = grpc.ServerUnaryCall<SetCarRequest, SetCarResponse>;
type Callback = grpc.sendUnaryData<SetCarResponse>;

type CarValidated = Omit<Car, 'id' | 'updateAt' | 'createAt'>;

export const setCar = (mongodb: MongoDb) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * GET CAR FROM GRPC && VALIDATE
             */
            const carObjectFromGRPC = request.getCar().toObject();
            const carValidated = await JoiValidator<CarValidated, CarValidated>(
                SetCarValidator,
                carObjectFromGRPC,
                {
                    removeId: true,
                    removeEmptyProperties: true,
                }
            );

            await mongodb.collection.insertOne({
                ...carValidated,
            })

            if (carObject === null) {
                /** SEND RESPONSE_ERROR [GET_CAR] **/
                callback({
                    code: grpc.status.NOT_FOUND,
                    message: "Object isn't exist.",
                });
            } else {
                /** SUCCESS RESPONSE GRPC [GET_CAR]  */
                const carSchema = fromJsonToGrpc<CarSchema, Car>(new CarSchema(), carObject, {
                    getTimeChange: true,
                });

                const responseGRPC = new SetCarResponse();
                responseGRPC.setCar(carSchema);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
