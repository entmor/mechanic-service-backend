import * as grpc from '@grpc/grpc-js';
import { MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { Vehicle } from '../../../../interface/vehicle.interface';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import {
    DeleteAllVehiclesByClientIdRequest,
    DeleteAllVehiclesByClientIdResponse,
} from '../../../../grpc/Vehicle/Vehicle_pb';
import { DeleteAllRepairsByVehicleIdRequest } from '../../../../grpc/Repair/Repair_pb';
import { grpcRepairClient } from '../../../grpcClients';

type Call = grpc.ServerUnaryCall<
    DeleteAllVehiclesByClientIdRequest,
    DeleteAllVehiclesByClientIdResponse
>;
type Callback = grpc.sendUnaryData<DeleteAllVehiclesByClientIdResponse>;

export const deleteAllVehiclesByClientId = (mongodb: MongoDb<Vehicle>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getClientId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [DELETE_VEHICLE] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                const clientId = param_id.value;

                const vehiclesArray = await mongodb.collection
                    .find({
                        clientId,
                    })
                    .toArray();

                for (const vehicle of vehiclesArray) {
                    /** DELETE VEHICLE FROM DATABASE **/
                    await mongodb.collection.deleteOne({
                        _id: vehicle._id,
                    });

                    /** DELETE ALL REPAIRS THIS VEHICLE **/
                    const grpcDeleteAllRepairByVehicleIdRequest =
                        new DeleteAllRepairsByVehicleIdRequest();
                    grpcDeleteAllRepairByVehicleIdRequest.setVehicleId(vehicle._id.toString());
                    grpcRepairClient.deleteAllRepairsByVehicleId(
                        grpcDeleteAllRepairByVehicleIdRequest,
                        () => {
                            return true;
                        }
                    );
                }

                /** SUCCESS RESPONSE GRPC [DELETE_VEHICLE] */
                const responseGRPC = new DeleteAllVehiclesByClientIdResponse();
                responseGRPC.setDeleted(true);

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
