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
        /** CHECK PARAMS FROM CALL **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.value) {
            /** MAKE GRPC_REQUEST [DELETE_CAR] **/
            const requestGRPC = new DeleteCarRequest();

            grpcCarClient.deleteCar(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_CAR] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    responseApi.json({
                        deleted: grpcResponse.getDeleted(),
                    });
                }
            });
        } else {
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'ID must be a integer',
            });
        }
    } catch (error) {
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
