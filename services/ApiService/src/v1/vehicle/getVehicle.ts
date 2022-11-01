import Joi from 'joi';
import { Request, Response } from 'express';
import { Vehicle } from '../../../../../interface/vehicle.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { grpcVehicleClient } from '../../../../grpcClients';
import { GetVehicleRequest } from '../../../../../grpc/Vehicle/Vehicle_pb';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { status } from '@grpc/grpc-js';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<Vehicle | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        const { logger, user } = responseApi.locals;

        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_VEHICLE] **/
            Promise.reject({
                code: status.INVALID_ARGUMENT,
                message: 'WRONG ID',
            });

            /** LOGGER  **/
            logger.log('debug', param_id.error);
        } else {
            /** MAKE GRPC_REQUEST [GET_CAR] **/
            const requestGRPC = new GetVehicleRequest();
            requestGRPC.setId(param_id.value);

            /** LOGGER  **/
            logger.log('debug', param_id.value);

            grpcVehicleClient.getVehicle(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_VEHICLE] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_VEHICLE] **/
                    const vehicle: Vehicle = grpcResponse.getVehicle().toObject();

                    responseApi.json(vehicle);

                    /** LOGGER  **/
                    logger.apiResponse(requestApi, {
                        userId: user.id,
                        rest: {
                            vehicle,
                        },
                    });
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_VEHICLE] **/
        catchErrorAndResponse(error, responseApi, 'getVehicle');
    }
}
