import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { grpcRepairClient } from '../../../../grpcClients';
import { DeleteRepairRequest } from '../../../../../grpc/Repair/Repair_pb';

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
            /** ERROR GRPC_REQUEST HANDLER [DELETE_REPAIR] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'WRONG ID',
            });
        } else {
            /** MAKE GRPC_REQUEST [DELETE_REPAIR] **/
            const requestGRPC = new DeleteRepairRequest();
            requestGRPC.setId(param_id.value);

            grpcRepairClient.deleteRepair(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [DELETE_REPAIR] **/
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
        /** ERROR GRPC_REQUEST HANDLER [DELETE_REPAIR] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
