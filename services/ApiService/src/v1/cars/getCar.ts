import Joi from 'joi';
import { Request, Response } from 'express';
import { Car } from '../../../../../interface/car';
import { ApiResponse, errorsHandler } from '../../errors';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { GetCarRequest } from '../../../../../grpc/Car/Car_pb';
import { grpcCarClient } from '../../grpcClients';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<Car | ApiResponse>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_CAR] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'Wrong ID',
            });
        } else {
            /** MAKE GRPC_REQUEST [GET_CAR] **/
            const requestGRPC = new GetCarRequest();
            requestGRPC.setId(param_id.value);

            grpcCarClient.getCar(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_CAR] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_CAR] **/
                    const car: Car = grpcResponse.getCar().toObject();

                    responseApi.json(car);
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_CAR] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
