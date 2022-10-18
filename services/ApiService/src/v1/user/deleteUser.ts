import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { DeleteUserRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../../../grpcClients';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';

type RequestApi = Request<{ id: string }>;
type ResponseApi = Response<{ deleted: boolean } | ApiResponse>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [DELETE_USER] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'WRONG ID',
            });
        } else {
            /** MAKE GRPC_REQUEST [DELETE_USER] **/
            const requestGRPC = new DeleteUserRequest();
            requestGRPC.setId(param_id.value);

            grpcUserClient.deleteUser(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [DELETE_USER] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    responseApi.status(200).json({
                        deleted: grpcResponse.getDeleted(),
                    });
                }
            });
        }
    } catch (e) {
        /** ERROR GRPC_REQUEST HANDLER [DELETE_USER] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
