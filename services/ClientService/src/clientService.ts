import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { Client } from '../../../interface/client.interface';
import * as grpc from '@grpc/grpc-js';
import { ClientService } from '../../../grpc/Client/Client_grpc_pb';
import { getClient } from './services/getClient';
import { setClient } from './services/setClient';
import { updateClient } from './services/updateClient';
import { deleteClient } from './services/deleteClient';
import { getAllClients } from './services/getAllClients';

const mongodb = new MongoDb<Client>('clients');

mongodb
    .connection()
    .then((db) => {
        const server = new grpc.Server();

        server.addService(ClientService, {
            getClient: getClient(db),
            setClient: setClient(db),
            updateClient: updateClient(db),
            deleteClient: deleteClient(db),
            getAllClients: getAllClients(db),
        });

        //TODO SSL
        server.bindAsync(
            `${process.env.GRPC_CLIENT_SERVICE_URL}`,
            grpc.ServerCredentials.createInsecure(),
            () => {
                server.start();
                console.log('---------------');
                console.log('GRPC Client-Service Started');
                console.log('---------------');
            }
        );
    })
    .catch(console.error);
