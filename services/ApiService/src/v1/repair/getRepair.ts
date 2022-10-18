import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Repair } from '../../../../../interface/repair.interface';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { GetRepairRequest } from '../../../../../grpc/Repair/Repair_pb';
import { grpcRepairClient } from '../../../../grpcClients';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<Repair | ApiResponse>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_REPAIR] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'Wrong ID',
            });
        } else {
            /** MAKE GRPC_REQUEST [GET_REPAIR] **/
            const requestGRPC = new GetRepairRequest();
            requestGRPC.setId(param_id.value);

            grpcRepairClient.getRepair(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_REPAIR] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_REPAIR] **/
                    const repair = grpcResponse.getRepair().toObject();

                    responseApi.json(repair);
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_REPAIR] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
