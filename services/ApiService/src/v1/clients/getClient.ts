import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { GetClientRequest } from '../../../../../grpc/Client/Client_pb';
import { grpcClientClient } from '../../../../grpcClients';
import { Client } from '../../../../../interface/client.interface';
import { status } from '@grpc/grpc-js';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<Client | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        const { logger, user } = responseApi.locals;

        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_CLIENT] **/
            Promise.reject({
                code: status.INVALID_ARGUMENT,
                message: 'WRONG ID',
            });

            /** LOGGER  **/
            logger.log('debug', param_id.error);
        } else {
            /** MAKE GRPC_REQUEST [GET_CLIENT] **/
            const requestGRPC = new GetClientRequest();
            requestGRPC.setId(param_id.value);

            /** LOGGER  **/
            logger.log('debug', { setId: param_id.value });

            grpcClientClient.getClient(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_CLIENT] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_CLIENT] **/
                    const client: Client = grpcResponse.getClient().toObject();

                    responseApi.json(client);

                    /** LOGGER  **/
                    logger.apiResponse(requestApi, {
                        userId: user.id,
                        rest: {
                            client,
                        },
                    });
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_CLIENT] **/
        catchErrorAndResponse(error, responseApi, 'getClient');
    }
}
