import * as grpc from '@grpc/grpc-js';
import { isDeleted, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { ObjectId } from 'mongodb';
import { Vehicle } from '../../../../interface/vehicle-interface';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { DeleteVehicleRequest, DeleteVehicleResponse } from '../../../../grpc/Vehicle/Vehicle_pb';

type Call = grpc.ServerUnaryCall<DeleteVehicleRequest, DeleteVehicleResponse>;
type Callback = grpc.sendUnaryData<DeleteVehicleResponse>;

export const deleteVehicle = (mongodb: MongoDb<Vehicle>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [DELETE_VEHICLE] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** DELETE VEHICLE FROM DATABASE **/
                const vehicleId = new ObjectId(request.getId());
                const deleted = await isDeleted(
                    await mongodb.collection.deleteOne({
                        _id: vehicleId,
                    })
                );

                /** SUCCESS RESPONSE GRPC [DELETE_VEHICLE] */
                const responseGRPC = new DeleteVehicleResponse();
                responseGRPC.setDeleted(deleted);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_VEHICLE] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
