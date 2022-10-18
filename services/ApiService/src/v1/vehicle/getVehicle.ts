import Joi from 'joi';
import { Request, Response } from 'express';
import { Vehicle } from '../../../../../interface/vehicle.interface';
import { ApiResponse, errorsHandler } from '../../errors';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { grpcVehicleClient } from '../../../../grpcClients';
import { GetVehicleRequest } from '../../../../../grpc/Vehicle/Vehicle_pb';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<Vehicle | ApiResponse>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_VEHICLE] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'Wrong ID',
            });
        } else {
            /** MAKE GRPC_REQUEST [GET_CAR] **/
            const requestGRPC = new GetVehicleRequest();
            requestGRPC.setId(param_id.value);

            grpcVehicleClient.getVehicle(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_VEHICLE] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_VEHICLE] **/
                    const vehicle: Vehicle = grpcResponse.getVehicle().toObject();

                    responseApi.json(vehicle);
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_VEHICLE] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
