import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Vehicle, VehicleEngine } from '../../../../../interface/vehicle.interface';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { grpcVehicleClient } from '../../../../grpcClients';
import { UpdateVehicleRequest } from '../../../../../grpc/Vehicle/Vehicle_pb';
import { VehicleEngineSchema } from '../../../../../grpc/Schema/VehicleEngineSchema_pb';
import { VehicleSchema } from '../../../../../grpc/Schema/VehicleSchema_pb';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';
import { catchErrorAndResponse } from '../../middleware/catchError';

type OmittedVehicle = Omit<Vehicle, 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedVehicle>;
type ResponseApi = Response<{ updated: boolean } | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { body } = requestApi;
        const { logger, user } = responseApi.locals;

        /** LOGGER  **/
        logger.log('debug', body);

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

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    userId: user.id,
                    rest: {
                        updated: grpcResponse.getUpdated(),
                    },
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [UPDATE_VEHICLE] **/
        catchErrorAndResponse(error, responseApi, 'updatedVehicle');
    }
}
