import * as grpc from '@grpc/grpc-js';
import { CarService } from '../../../grpc/Car/Car_grpc_pb';
import { MongoDb } from '../../../middleware/Mongodb';
import { getCar } from './services/getCar';
import { deleteCar } from './services/deleteCar';

const mongodb = new MongoDb('cv', 'cars');

mongodb
    .connection()
    .then((db) => {
        const server = new grpc.Server();

        server.addService(CarService, {
            getCar: getCar(db),
            deleteCar: deleteCar(db),
        });

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
