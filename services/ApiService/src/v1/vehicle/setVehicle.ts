import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Vehicle, VehicleEngine } from '../../../../../interface/vehicle.interface';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { grpcVehicleClient } from '../../../../grpcClients';
import { SetVehicleRequest } from '../../../../../grpc/Vehicle/Vehicle_pb';
import { VehicleEngineSchema } from '../../../../../grpc/Schema/VehicleEngineSchema_pb';
import { VehicleSchema } from '../../../../../grpc/Schema/VehicleSchema_pb';

type OmittedVehicle = Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedVehicle>;
type ResponseApi = Response<{ id: string } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
        /** PREPARE DATE FOR GRPC_REQUEST [SET_VEHICLE] **/
        const vehicleSchema = fromJsonToGrpc<VehicleSchema, Vehicle>(new VehicleSchema(), body, {
            excludeKeys: ['id', 'engine', 'createdAt', 'updatedAt'],
        });

        if (body.engine) {
            const vehicleEngine = fromJsonToGrpc<VehicleEngineSchema, VehicleEngine>(
                new VehicleEngineSchema(),
                body.engine
            );
            vehicleSchema.setEngine(vehicleEngine);
        }

        /** MAKE GRPC_REQUEST [SET_VEHICLE] **/
        const requestGRPC = new SetVehicleRequest();
        requestGRPC.setVehicle(vehicleSchema);

        grpcVehicleClient.setVehicle(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [SET_VEHICLE] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [SET_VEHICLE] **/
                responseApi.json({
                    id: grpcResponse.getId(),
                });
            }
        });
    } catch (error) {
        const errorResponse = errorsHandler(error);

        responseApi.status(errorResponse.http_code).json(errorResponse);
    }
}
