import * as grpc from '@grpc/grpc-js';
import { UpdateCarRequest, UpdateCarResponse } from '../../../../grpc/Car/Car_pb';
import { isUpdated, MongoDb } from '../../../../middleware/Mongodb';
import { Car } from '../../../../interface/car';
import { JoiValidator } from '../../../../helpers/validate';
import { UpdateCarValidator } from '../models/validator';
import { ObjectId } from 'mongodb';

type Call = grpc.ServerUnaryCall<UpdateCarRequest, UpdateCarResponse>;
type Callback = grpc.sendUnaryData<UpdateCarResponse>;

type CarValidated = Omit<Car, 'updateAt' | 'createAt'>;

export const updateCar = (mongodb: MongoDb<Car>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET CAR FROM GRPC && VALIDATE */
            const carObjectFromGRPC = request.getCar().toObject();
            const carValidated = await JoiValidator<CarValidated, CarValidated>(
                UpdateCarValidator,
                carObjectFromGRPC,
                {
                    removeId: false,
                    removeEmptyProperties: true,
                }
            );

            /** GET ID AND REMOVE FROM VALIDATED OBJECT ID, BECAUSE ID CANT BE UPDATED **/
            const carId = new ObjectId(carValidated.id);
            delete carValidated.id;

            const updatedResponse = await isUpdated(
                await mongodb.collection.updateOne(
                    {
                        _id: carId,
                    },
                    {
                        $set: {
                            ...carValidated,
                            updatedAt: Date.now(),
                        },
                    }
                )
            );

            /** SUCCESS RESPONSE GRPC [UPDATE_CAR]  */
            const responseGRPC = new UpdateCarResponse();
            responseGRPC.setUpdated(updatedResponse);

            callback(null, responseGRPC);
        } catch (e) {
            /** SEND RESPONSE_ERROR [UPDATE_CAR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
