import * as grpc from '@grpc/grpc-js';
import { MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { Vehicle } from '../../../../interface/vehicle.interface';
import { JoiValidator } from '../../../../helpers/validate';
import { SetVehicleValidator } from '../models/vehicle.joi-schema';
import { SetVehicleRequest, SetVehicleResponse } from '../../../../grpc/Vehicle/Vehicle_pb';

type Call = grpc.ServerUnaryCall<SetVehicleRequest, SetVehicleResponse>;
type Callback = grpc.sendUnaryData<SetVehicleResponse>;

type VehicleValidated = Omit<Vehicle, 'id' | 'updateAt' | 'createAt'>;

export const setVehicle = (mongodb: MongoDb<Vehicle>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * GET VEHICLE FROM GRPC && VALIDATE
             */
            const vehicleFromGRPC = request.getVehicle().toObject();

            const vehicleValidated = await JoiValidator<VehicleValidated, VehicleValidated>(
                SetVehicleValidator(),
                vehicleFromGRPC,
                {
                    removeId: true,
                    removeEmptyProperties: true,
                    excludeKeys: ['createdAt', 'updatedAt'],
                    removeZeroValueProperties: ['year'],
                }
            );

            console.log(vehicleValidated);

            /** IS VEHICLE ALREADY EXISTS **/
            const isVehicleExists = await mongodb.collection.findOne({
                $or: [{ plate: vehicleValidated.plate || '', vin: vehicleValidated.vin || '' }],
            });

            if (isVehicleExists === null) {
                const insertResponse = await mongodb.collection.insertOne({
                    ...vehicleValidated,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });

                /** SUCCESS RESPONSE GRPC [SET_VEHICLE]  */
                const responseGRPC = new SetVehicleResponse();
                responseGRPC.setId(insertResponse.insertedId.toString());

                callback(null, responseGRPC);
            } else {
                /** SEND RESPONSE_ERROR [SET_VEHICLE] **/
                callback({
                    code: grpc.status.ALREADY_EXISTS,
                    message: 'Vehicle already exists',
                });
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [SET_VEHICLE] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
