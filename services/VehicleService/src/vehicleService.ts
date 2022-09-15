import * as grpc from '@grpc/grpc-js';
import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { Vehicle } from '../../../interface/vehicle-interface';
import { getVehicle } from './services/getVehicle';
import { setVehicle } from './services/setVehicle';
import { updateVehicle } from './services/updateVehicle';
import { deleteVehicle } from './services/deleteVehicle';
import { getAllVehicles } from './services/getAllVehicles';
import { VehicleService } from '../../../grpc/Vehicle/Vehicle_grpc_pb';

const mongodb = new MongoDb<Vehicle>('vehicle');

mongodb
    .connection()
    .then((db) => {
        const server = new grpc.Server();

        server.addService(VehicleService, {
            getVehicle: getVehicle(db),
            setVehicle: setVehicle(db),
            updateVehicle: updateVehicle(db),
            deleteVehicle: deleteVehicle(db),
            getAllVehicles: getAllVehicles(db),
        });

        //TODO SSL
        server.bindAsync(
            `${process.env.GRPC_VEHICLE_SERVICE_URL}`,
            grpc.ServerCredentials.createInsecure(),
            () => {
                server.start();
                console.log('---------------');
                console.log('GRPC Vehicle-Service Started');
                console.log('---------------');
            }
        );
    })
    .catch(console.error);
