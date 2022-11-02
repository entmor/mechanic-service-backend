import * as grpc from '@grpc/grpc-js';

import { UserClient } from '../grpc/User/User_grpc_pb';
import { AuthClient } from '../grpc/Auth/Auth_grpc_pb';
import { ClientClient } from '../grpc/Client/Client_grpc_pb';
import { VehicleClient } from '../grpc/Vehicle/Vehicle_grpc_pb';
import { RepairClient } from '../grpc/Repair/Repair_grpc_pb';

export const grpcUserClient = new UserClient(
    `${process.env.GRPC_USER_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);

export const grpcAuthClient = new AuthClient(
    `${process.env.GRPC_AUTH_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);

export const grpcVehicleClient = new VehicleClient(
    `${process.env.GRPC_VEHICLE_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);

export const grpcClientClient = new ClientClient(
    `${process.env.GRPC_CLIENT_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);

export const grpcRepairClient = new RepairClient(
    `${process.env.GRPC_REPAIR_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);
