import * as grpc from '@grpc/grpc-js';
import Joi from 'joi';

import { isDeleted, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { ObjectId } from 'mongodb';
import { RegExpPatterns } from '../../../../helpers/validate';
import { Repair } from '../../../../interface/repair.interface';
import { DeleteRepairRequest, DeleteRepairResponse } from '../../../../grpc/Repair/Repair_pb';

type Call = grpc.ServerUnaryCall<DeleteRepairRequest, DeleteRepairResponse>;
type Callback = grpc.sendUnaryData<DeleteRepairResponse>;

export const deleteRepair = (mongodb: MongoDb<Repair>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [DELETE_REPAIR] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** DELETE REPAIR FROM DATABASE **/
                const repairId = new ObjectId(request.getId());
                const deleted = await isDeleted(
                    await mongodb.collection.deleteOne({
                        _id: repairId,
                    })
                );

                /** SUCCESS RESPONSE GRPC [DELETE_REPAIR] */
                const responseGRPC = new DeleteRepairResponse();
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
