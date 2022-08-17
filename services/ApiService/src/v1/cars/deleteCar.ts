import { Request, Response } from 'express';
import Joi from 'joi';
import { ApiResponse, errorsHandler } from '../../errors';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { DeleteCarRequest } from '../../../../../grpc/Car/Car_pb';
import { grpcCarClient } from '../../grpcClients';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<{ deleted: boolean } | ApiResponse>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [DELETE_CAR] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'WRONG ID',
            });

        } else {
            /** MAKE GRPC_REQUEST [DELETE_CAR] **/
            const requestGRPC = new DeleteCarRequest();
            requestGRPC.setId(param_id.value);

            grpcCarClient.deleteCar(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [DELETE_CAR] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    responseApi.json({
                        deleted: grpcResponse.getDeleted(),
                    });
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [DELETE_CAR] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
