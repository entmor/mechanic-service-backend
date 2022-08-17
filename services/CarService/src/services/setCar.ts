import * as grpc from '@grpc/grpc-js';
import { SetCarRequest, SetCarResponse } from '../../../../grpc/Car/Car_pb';
import { MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { Car } from '../../../../interface/car';
import { JoiValidator } from '../../../../helpers/validate';
import { SetCarValidator } from '../models/validator.joi';

type Call = grpc.ServerUnaryCall<SetCarRequest, SetCarResponse>;
type Callback = grpc.sendUnaryData<SetCarResponse>;

type CarValidated = Omit<Car, 'id' | 'updateAt' | 'createAt'>;

export const setCar = (mongodb: MongoDb<Car>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * GET CAR FROM GRPC && VALIDATE
             */
            const carObjectFromGRPC = request.getCar().toObject();
            const carValidated = await JoiValidator<CarValidated, CarValidated>(
                SetCarValidator(),
                carObjectFromGRPC,
                {
                    removeId: true,
                    removeEmptyProperties: true,
                }
            );

            /** IS CAR ARLREADY EXISTS **/
            const isCarExists = await mongodb.collection.findOne({
                $or: [{ plate: carValidated.plate, vin: carValidated.vin }],
            });

            if (isCarExists === null) {
                const insertResponse = await mongodb.collection.insertOne({
                    ...carValidated,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });

                /** SUCCESS RESPONSE GRPC [SET_CAR]  */
                const responseGRPC = new SetCarResponse();
                responseGRPC.setId(insertResponse.insertedId.toString());

                callback(null, responseGRPC);
            } else {
                /** SEND RESPONSE_ERROR [SET_CAR] **/
                callback({
                    code: grpc.status.ALREADY_EXISTS,
                    message: 'Car already exists',
                });
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [SET_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
