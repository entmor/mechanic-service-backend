import * as grpc from '@grpc/grpc-js';
import { isFound, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import {
    ClientSchema,
    GetClientRequest,
    GetClientResponse,
} from '../../../../grpc/Client/Client_pb';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { ObjectId } from 'mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Client } from '../../../../interface/client.interface';

type Call = grpc.ServerUnaryCall<GetClientRequest, GetClientResponse>;
type Callback = grpc.sendUnaryData<GetClientResponse>;

export const getClient = (mongodb: MongoDb<Client>) => {
    return async ({ request, metadata }: Call, callback: Callback): Promise<void> => {
        try {
            console.log(metadata.get('test'));
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [GET_CLIENT] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** GET CLIENT FROM DATABASE **/
                const clientId = new ObjectId(request.getId());
                const clientObject = await isFound(await mongodb.collection.findOne(clientId));

                /** SUCCESS RESPONSE GRPC [GET_CLIENT]  */
                if ('_id' in clientObject) {
                    clientObject.id = clientObject._id.toString();
                }
                const clientSchema = fromJsonToGrpc<ClientSchema, Client>(
                    new ClientSchema(),
                    clientObject
                );

                const responseGRPC = new GetClientResponse();
                responseGRPC.setClient(clientSchema);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_CLIENT] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
