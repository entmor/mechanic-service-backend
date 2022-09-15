import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Vehicle, VehicleEngine } from '../../../../../interface/vehicle-interface';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { grpcVehicleClient } from '../../grpcClients';
import {
    UpdateVehicleRequest,
    VehicleEngineSchema,
    VehicleSchema,
} from '../../../../../grpc/Vehicle/Vehicle_pb';

type OmittedVehicle = Omit<Vehicle, 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedVehicle>;
type ResponseApi = Response<{ updated: boolean } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
        /** PREPARE DATE FOR GRPC_REQUEST [UPDATE_VEHICLE] **/
        const vehicleSchema = fromJsonToGrpc<VehicleSchema, Vehicle>(new VehicleSchema(), body, {
            excludeKeys: ['engine', 'createdAt', 'updatedAt'],
        });

        if (body.engine) {
            const vehicleEngine = fromJsonToGrpc<VehicleEngineSchema, VehicleEngine>(
                new VehicleEngineSchema(),
                body.engine
            );
            vehicleSchema.setEngine(vehicleEngine);
        }

        /** MAKE GRPC_REQUEST [UPDATE_VEHICLE] **/
        const requestGRPC = new UpdateVehicleRequest();
        requestGRPC.setVehicle(vehicleSchema);

        grpcVehicleClient.updateVehicle(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [UPDATE_VEHICLE] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [UPDATE_VEHICLE] **/
                responseApi.json({
                    updated: grpcResponse.getUpdated(),
                });
            }
        });
    } catch (error) {
        const errorResponse = errorsHandler(error);

        responseApi.status(errorResponse.http_code).json(errorResponse);
    }
}
