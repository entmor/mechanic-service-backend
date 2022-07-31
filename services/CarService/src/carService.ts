import * as grpc from '@grpc/grpc-js';
import { CarService } from '../../../grpc/Car/Car_grpc_pb';
import { MongoDb } from '../../../middleware/Mongodb';

const mongodb = new MongoDb('cv', 'cars');

mongodb
    .connection()
    .then((db) => {
        const server = new grpc.Server();

        server.addService(CarService, {});

        //TODO SSL
        server.bindAsync(
            `${process.env.GRPC_CAR_SERVICE_URL}`,
            grpc.ServerCredentials.createInsecure(),
            () => {
                server.start();
                console.log('---------------');
                console.log('GRPC Car-Service Started');
                console.log('---------------');
            }
        );
    })
    .catch(console.error);
