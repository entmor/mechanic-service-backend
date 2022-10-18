import * as grpc from '@grpc/grpc-js';
import { isFound, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { Repair } from '../../../../interface/repair.interface';
import {
    GetRepairRequest,
    GetRepairResponse,
    RepairCostsSchema,
    RepairPartSchema,
    RepairSchema,
} from '../../../../grpc/Repair/Repair_pb';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { ObjectId } from 'mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { getVehicle } from '../middleware/getVehicle';
import { VehicleSchema } from '../../../../grpc/Schema/VehicleSchema_pb';

type Call = grpc.ServerUnaryCall<GetRepairRequest, GetRepairResponse>;
type Callback = grpc.sendUnaryData<GetRepairResponse>;

export const getRepair = (mongodb: MongoDb<Repair>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [GET_REPAIR] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** GET REPAIR FROM DATABASE **/
                const repairId = new ObjectId(request.getId());
                const repairObject = await isFound(
                    await mongodb.collection.findOne({ _id: repairId })
                );

                /** SUCCESS RESPONSE GRPC [GET_REPAIR]  */
                if ('_id' in repairObject) {
                    repairObject.id = repairObject._id.toString();
                }

                /** PREPARE REPAIR **/
                const repairSchema = fromJsonToGrpc<RepairSchema, Repair>(
                    new RepairSchema(),
                    repairObject,
                    {
                        excludeKeys: ['costs', 'partsList'],
                    }
                );

                /** PREPARE REPAIR.COSTS **/
                if (repairObject.costs) {
                    const repairCosts = fromJsonToGrpc<RepairCostsSchema, Repair>(
                        new RepairCostsSchema(),
                        repairObject.costs
                    );
                    repairSchema.setCosts(repairCosts);
                }

                /** PREPARE REPAIR.PARTS **/
                if (repairObject.partsList.length > 0) {
                    repairObject.partsList.forEach((value) => {
                        const part = fromJsonToGrpc<RepairPartSchema, Repair>(
                            new RepairPartSchema(),
                            value
                        );

                        repairSchema.addParts(part);
                    });
                }

                /** GET VEHICLE DATA **/
                const vehicleData = (await getVehicle(repairObject.vehicleId)) as VehicleSchema;
                repairSchema.setVehicle(vehicleData);

                /** SUCCESS RESPONSE GRPC [GET_REPAIR]  */
                const responseGRPC = new GetRepairResponse();
                responseGRPC.setRepair(repairSchema);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_REPAIR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
