import * as grpc from '@grpc/grpc-js';
import { CarService } from '../../../grpc/Car/Car_grpc_pb';
import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { Car } from '../../../interface/car';
import { getCar } from './services/getCar';
import { setCar } from './services/setCar';
import { updateCar } from './services/updateCar';
import { deleteCar } from './services/deleteCar';
import { getAllCars } from './services/getAllCars';

const mongodb = new MongoDb<Car>('cars');

mongodb
    .connection()
    .then((db) => {
        const server = new grpc.Server();

        server.addService(CarService, {
            getCar: getCar(db),
            setCar: setCar(db),
            updateCar: updateCar(db),
            deleteCar: deleteCar(db),
            getAllCars: getAllCars(db),
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
