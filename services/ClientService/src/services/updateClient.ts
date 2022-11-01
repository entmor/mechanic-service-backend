import * as grpc from '@grpc/grpc-js';
import { isUpdated, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { UpdateClientRequest, UpdateClientResponse } from '../../../../grpc/Client/Client_pb';
import { Client } from '../../../../interface/client.interface';
import { JoiValidator } from '../../../../helpers/validate';
import { UpdateClientValidator } from '../models/client.joi-schema';
import { ObjectId } from 'mongodb';

type Call = grpc.ServerUnaryCall<UpdateClientRequest, UpdateClientResponse>;
type Callback = grpc.sendUnaryData<UpdateClientResponse>;

type ClientValidated = Omit<Client, 'updateAt' | 'createAt'>;

export const updateClient = (mongodb: MongoDb<Client>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET CAR FROM GRPC && VALIDATE */
            const clientObjectFromGRPC = request.getClient().toObject();
            const clientValidated = await JoiValidator<ClientValidated, ClientValidated>(
                UpdateClientValidator,
                clientObjectFromGRPC,
                {
                    removeId: false,
                    removeEmptyProperties: true,
                    excludeKeys: ['createdAt', 'updatedAt'],
                    removeZeroValueProperties: ['taxNumber'],
                }
            );

            /** GET ID AND REMOVE FROM VALIDATED OBJECT ID, BECAUSE ID CANT BE UPDATED **/
            const clientId = new ObjectId(clientValidated.id);
            delete clientValidated.id;

            const updatedResponse = await isUpdated(
                await mongodb.collection.updateOne(
                    {
                        _id: clientId,
                    },
                    {
                        $set: {
                            ...clientValidated,
                            updatedAt: Date.now(),
                        },
                    }
                )
            );

            /** SUCCESS RESPONSE GRPC [UPDATE_CLIENT]  */
            const responseGRPC = new UpdateClientResponse();
            responseGRPC.setUpdated(updatedResponse);

            callback(null, responseGRPC);
        } catch (e) {
            /** SEND RESPONSE_ERROR [UPDATE_CLIENT] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
