import * as grpc from '@grpc/grpc-js';
import { isUpdated, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { Vehicle } from '../../../../interface/vehicle-interface';
import { JoiValidator } from '../../../../helpers/validate';
import { UpdateVehicleValidator } from '../models/vehicle.joi-schema';
import { ObjectId } from 'mongodb';
import { UpdateVehicleRequest, UpdateVehicleResponse } from '../../../../grpc/Vehicle/Vehicle_pb';

type Call = grpc.ServerUnaryCall<UpdateVehicleRequest, UpdateVehicleResponse>;
type Callback = grpc.sendUnaryData<UpdateVehicleResponse>;

type VehicleValidated = Omit<Vehicle, 'updateAt' | 'createAt'>;

export const updateVehicle = (mongodb: MongoDb<Vehicle>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET VEHICLE FROM GRPC && VALIDATE */
            const vehicleFromGRPC = request.getVehicle().toObject();
            const vehicleValidated = await JoiValidator<VehicleValidated, VehicleValidated>(
                UpdateVehicleValidator(),
                vehicleFromGRPC,
                {
                    removeId: false,
                    removeEmptyProperties: true,
                    excludeKeys: ['createdAt', 'updatedAt'],
                }
            );

            /** GET ID AND REMOVE FROM VALIDATED OBJECT ID, BECAUSE ID CANT BE UPDATED **/
            const vehicleId = new ObjectId(vehicleValidated.id);
            delete vehicleValidated.id;

            /** IS VEHICLE ARLREADY EXISTS **/
            let isCarExists = null;
            if (vehicleValidated.plate || vehicleValidated.vin) {
                const _or = [];

                if (vehicleValidated.plate) {
                    _or.push({ plate: vehicleValidated.plate });
                }

                if (vehicleValidated.vin) {
                    _or.push({ vin: vehicleValidated.vin });
                }

                isCarExists = await mongodb.collection.findOne({
                    $and: [{ _id: { $ne: vehicleId } }, { $or: _or }],
                });
            }

            if (isCarExists === null) {
                const updatedResponse = await isUpdated(
                    await mongodb.collection.updateOne(
                        {
                            _id: vehicleId,
                        },
                        {
                            $set: {
                                ...vehicleValidated,
                                updatedAt: Date.now(),
                            },
                        }
                    )
                );

                /** SUCCESS RESPONSE GRPC [UPDATE_VEHICLE]  */
                const responseGRPC = new UpdateVehicleResponse();
                responseGRPC.setUpdated(updatedResponse);

                callback(null, responseGRPC);
            } else {
                /** SEND RESPONSE_ERROR [UPDATE_VEHICLE] **/
                callback({
                    code: grpc.status.ALREADY_EXISTS,
                    message: 'Vehicle already exists',
                });
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [UPDATE_VEHICLE] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
