import * as grpc from '@grpc/grpc-js';
import { isUpdated, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { UpdateRepairRequest, UpdateRepairResponse } from '../../../../grpc/Repair/Repair_pb';
import { Repair } from '../../../../interface/repair.interface';
import { JoiValidator } from '../../../../helpers/validate';
import { UpdateRepairValidator } from '../models/repair.joi-schema';
import { ObjectId } from 'mongodb';
import { summaryCost } from '../middleware/summaryCost';
import { generatePartListPrices } from '../middleware/generatePartPrices';

type Call = grpc.ServerUnaryCall<UpdateRepairRequest, UpdateRepairResponse>;
type Callback = grpc.sendUnaryData<UpdateRepairResponse>;

type RepairValidated = Omit<Repair, 'updateAt' | 'createAt'>;

export const updateRepair = (mongodb: MongoDb<Repair>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET REPAIR FROM GRPC && VALIDATE */
            const repairFromGRPC = request.getRepair().toObject();
            const repairValidated = await JoiValidator<RepairValidated, RepairValidated>(
                UpdateRepairValidator,
                repairFromGRPC,
                {
                    removeId: false,
                    removeEmptyProperties: true,
                    excludeKeys: ['createdAt', 'updatedAt', 'costs'],
                }
            );

            /** GET ID AND REMOVE FROM VALIDATED OBJECT ID, BECAUSE ID CANT BE UPDATED **/
            const repairId = new ObjectId(repairValidated.id);
            delete repairValidated.id;

            if (repairValidated.partsList) {
                /** GENERATE PRICES AND COSTS **/
                repairValidated.partsList = await generatePartListPrices(repairValidated.partsList);
                repairValidated.costs = await summaryCost(repairValidated.partsList);
            }

            /** UPDATE DB **/
            const updatedResponse = await isUpdated(
                await mongodb.collection.updateOne(
                    {
                        _id: repairId,
                    },
                    {
                        $set: {
                            ...repairValidated,
                            updatedAt: Date.now(),
                        },
                    }
                )
            );

            /** SUCCESS RESPONSE GRPC [UPDATE_REPAIR]  */
            const responseGRPC = new UpdateRepairResponse();
            responseGRPC.setUpdated(updatedResponse);

            callback(null, responseGRPC);
        } catch (e) {
            /** SEND RESPONSE_ERROR [UPDATE_REPAIR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
