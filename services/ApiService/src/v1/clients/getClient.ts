import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { GetClientRequest } from '../../../../../grpc/Client/Client_pb';
import { grpcClientClient } from '../../../../grpcClients';
import { Client } from '../../../../../interface/client.interface';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<Client | ApiResponse>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_CLIENT] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'Wrong ID',
            });
        } else {
            /** MAKE GRPC_REQUEST [GET_CLIENT] **/
            const requestGRPC = new GetClientRequest();
            requestGRPC.setId(param_id.value);

            grpcClientClient.getClient(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_CLIENT] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_CLIENT] **/
                    const client: Client = grpcResponse.getClient().toObject();

                    responseApi.json(client);
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_CLIENT] **/
        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
