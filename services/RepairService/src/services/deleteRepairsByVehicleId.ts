import * as grpc from '@grpc/grpc-js';
import Joi from 'joi';

import { isDeleted, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { RegExpPatterns } from '../../../../helpers/validate';
import { Repair } from '../../../../interface/repair.interface';
import {
    DeleteAllRepairsByVehicleIdRequest,
    DeleteAllRepairsByVehicleIdResponse,
} from '../../../../grpc/Repair/Repair_pb';
import { DeleteAllVehiclesByClientIdResponse } from '../../../../grpc/Vehicle/Vehicle_pb';

type Call = grpc.ServerUnaryCall<
    DeleteAllRepairsByVehicleIdRequest,
    DeleteAllRepairsByVehicleIdResponse
>;
type Callback = grpc.sendUnaryData<DeleteAllRepairsByVehicleIdResponse>;

export const deleteAllRepairsByVehicleId = (mongodb: MongoDb<Repair>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getVehicleId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [DELETE_ALL_REPAIRS_BY_VEHICLE_ID] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** DELETE ALL REPAIRS FROM DATABASE **/
                const vehicleId = request.getVehicleId();
                const deleted = await isDeleted(
                    await mongodb.collection.deleteMany({
                        vehicleId,
                    })
                );

                /** SUCCESS RESPONSE GRPC [DELETE_ALL_REPAIRS_BY_VEHICLE_ID] */
                const responseGRPC = new DeleteAllVehiclesByClientIdResponse();
                responseGRPC.setDeleted(deleted);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_REPAIR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
