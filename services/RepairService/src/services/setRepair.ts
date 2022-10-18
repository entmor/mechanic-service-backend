import { MongoDb } from '../../../../middleware/Mongodb/mongodb';
import * as grpc from '@grpc/grpc-js';
import { SetRepairRequest, SetRepairResponse } from '../../../../grpc/Repair/Repair_pb';
import { Repair } from '../../../../interface/repair.interface';
import { JoiValidator } from '../../../../helpers/validate';
import { SetRepairValidator } from '../models/repair.joi-schema';
import { summaryCost } from '../middleware/summaryCost';
import { generatePartListPrices } from '../middleware/generatePartPrices';

type RepairValidated = Omit<Repair, 'id' | 'updateAt' | 'createAt'>;

type Call = grpc.ServerUnaryCall<SetRepairRequest, SetRepairResponse>;
type Callback = grpc.sendUnaryData<SetRepairResponse>;

export const setRepair = (mongodb: MongoDb<Repair>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * GET REPAIR FROM GRPC && VALIDATE
             */

            const repairFromGRPC = request.getRepair().toObject();

            const repairValidated = await JoiValidator<RepairValidated, RepairValidated>(
                SetRepairValidator,
                repairFromGRPC,
                {
                    removeId: true,
                    removeEmptyProperties: true,
                    excludeKeys: ['createdAt', 'updatedAt', 'costs'],
                }
            );

            /** GENERATE PRICES AND COSTS **/
            repairValidated.partsList = await generatePartListPrices(repairValidated.partsList);
            repairValidated.costs = await summaryCost(repairValidated.partsList);

            /** SAVE TO DB **/
            const insertResponse = await mongodb.collection.insertOne({
                ...repairValidated,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });

            /** SUCCESS RESPONSE GRPC [SET_REPAIR]  */
            const responseGRPC = new SetRepairResponse();
            responseGRPC.setId(insertResponse.insertedId.toString());

            callback(null, responseGRPC);
        } catch (e) {
            console.log(e);
            /** SEND RESPONSE_ERROR [SET_REPAIR] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
