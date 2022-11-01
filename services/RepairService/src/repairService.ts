import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { Repair } from '../../../interface/repair.interface';
import * as grpc from '@grpc/grpc-js';
import { RepairService } from '../../../grpc/Repair/Repair_grpc_pb';
import { getRepair } from './services/getRepair';
import { setRepair } from './services/setRepair';
import { updateRepair } from './services/updateRepair';
import { deleteRepair } from './services/deleteRepair';
import { getAllRepairs } from './services/getAllRepairs';
import { deleteAllRepairsByVehicleId } from './services/deleteRepairsByVehicleId';

const mongodb = new MongoDb<Repair>('repair');

mongodb
    .connection()
    .then((db) => {
        const server = new grpc.Server();

        server.addService(RepairService, {
            getRepair: getRepair(db),
            setRepair: setRepair(db),
            updateRepair: updateRepair(db),
            deleteRepair: deleteRepair(db),
            getAllRepairs: getAllRepairs(db),
            deleteAllRepairsByVehicleId: deleteAllRepairsByVehicleId(db),
        });

        //TODO SSL
        server.bindAsync(
            `${process.env.GRPC_REPAIR_SERVICE_URL}`,
            grpc.ServerCredentials.createInsecure(),
            () => {
                server.start();
                console.log('---------------');
                console.log('GRPC Repair-Service Started');
                console.log('---------------');
            }
        );
    })
    .catch(console.error);
