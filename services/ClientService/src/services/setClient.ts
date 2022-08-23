import * as grpc from '@grpc/grpc-js';
import { MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { SetClientRequest, SetClientResponse } from '../../../../grpc/Client/Client_pb';
import { Client } from '../../../../interface/client.interface';
import { JoiValidator } from '../../../../helpers/validate';
import { SetClientValidator } from '../models/client.joi-schema';

type Call = grpc.ServerUnaryCall<SetClientRequest, SetClientResponse>;
type Callback = grpc.sendUnaryData<SetClientResponse>;

type ClientValidated = Omit<Client, 'id' | 'updateAt' | 'createAt'>;

export const setClient = (mongodb: MongoDb<Client>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * GET CLIENT FROM GRPC && VALIDATE
             */
            const clientObjectFromGRPC = request.getClient().toObject();
            console.log('tutaj');
            const clientValidated = await JoiValidator<ClientValidated, ClientValidated>(
                SetClientValidator,
                clientObjectFromGRPC,
                {
                    removeId: true,
                    removeEmptyProperties: true,
                }
            );
            console.log('tutaj tez');
            const insertResponse = await mongodb.collection.insertOne({
                ...clientValidated,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });

            /** SUCCESS RESPONSE GRPC [SET_CLIENT]  */
            const responseGRPC = new SetClientResponse();
            responseGRPC.setId(insertResponse.insertedId.toString());

            callback(null, responseGRPC);
        } catch (e) {
            console.log(e);
            /** SEND RESPONSE_ERROR [SET_CLIENT] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
