import * as grpc from '@grpc/grpc-js';
import { isDeleted, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { DeleteClientRequest, DeleteClientResponse } from '../../../../grpc/Client/Client_pb';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { ObjectId } from 'mongodb';
import { Client } from '../../../../interface/client.interface';

type Call = grpc.ServerUnaryCall<DeleteClientRequest, DeleteClientResponse>;
type Callback = grpc.sendUnaryData<DeleteClientResponse>;

export const deleteClient = (mongodb: MongoDb<Client>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [DELETE_CLIENT] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** DELETE CLIENT FROM DATABASE **/
                const clientId = new ObjectId(request.getId());
                const deleted = await isDeleted(
                    await mongodb.collection.deleteOne({
                        _id: clientId,
                    })
                );

                /** SUCCESS RESPONSE GRPC [DELETE_CAR] */
                const responseGRPC = new DeleteClientResponse();
                responseGRPC.setDeleted(deleted);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_CLIENT] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
