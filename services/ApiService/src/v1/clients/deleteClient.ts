import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { DeleteClientRequest } from '../../../../../grpc/Client/Client_pb';
import { grpcClientClient } from '../../../../grpcClients';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { status } from '@grpc/grpc-js';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<{ deleted: boolean } | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        const { logger, user } = responseApi.locals;

        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [DELETE_CLIENT] **/
            Promise.reject({
                code: status.INVALID_ARGUMENT,
                message: 'WRONG ID',
            });

            /** LOGGER  **/
            logger.log('debug', param_id.error);
        } else {
            /** MAKE GRPC_REQUEST [DELETE_CLIENT] **/
            const requestGRPC = new DeleteClientRequest();
            requestGRPC.setId(param_id.value);

            /** LOGGER  **/
            logger.log('debug', { setId: param_id.value });

            grpcClientClient.deleteClient(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [DELETE_CLIENT] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    responseApi.json({
                        deleted: grpcResponse.getDeleted(),
                    });

                    /** LOGGER  **/
                    logger.apiResponse(requestApi, {
                        userId: user.id,
                        rest: {
                            deletedId: param_id.value,
                        },
                    });
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [DELETE_CLIENT] **/
        catchErrorAndResponse(error, responseApi, 'deleteClient');
    }
}
