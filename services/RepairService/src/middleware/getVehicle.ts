import grpc from '@grpc/grpc-js';

import { GetVehicleRequest } from '../../../../grpc/Vehicle/Vehicle_pb';
import { grpcVehicleClient } from '../../../grpcClients';

export function getVehicle(id: string, message = 'getVehicleError') {
    return new Promise((resolve, reject) => {
        try {
            const requestGRPCVehicle = new GetVehicleRequest();
            requestGRPCVehicle.setId(id);

            grpcVehicleClient.getVehicle(requestGRPCVehicle, (error, vehicle) => {
                if (error) reject(error);
                if (vehicle) resolve(vehicle.getVehicle());
            });
        } catch (e) {
            reject({
                code: grpc.status.INTERNAL,
                message: message,
            });
        }
    });
}
