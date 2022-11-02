import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Repair } from '../../../../../interface/repair.interface';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { GetRepairRequest } from '../../../../../grpc/Repair/Repair_pb';
import { grpcRepairClient } from '../../../../grpcClients';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';
import { status } from '@grpc/grpc-js';
import { catchErrorAndResponse } from '../../middleware/catchError';

type RequestApi = Request<{ id: number }>;
type ResponseApi = Response<Repair | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi): void {
    try {
        const { logger, user } = responseApi.locals;

        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_REPAIR] **/
            Promise.reject({
                code: status.INVALID_ARGUMENT,
                message: 'WRONG ID',
            });

            /** LOGGER  **/
            logger.log('debug', param_id.error);
        } else {
            /** MAKE GRPC_REQUEST [GET_REPAIR] **/
            const requestGRPC = new GetRepairRequest();
            requestGRPC.setId(param_id.value);

            /** LOGGER  **/
            logger.log('debug', param_id.value);

            grpcRepairClient.getRepair(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_REPAIR] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_REPAIR] **/
                    const repair = grpcResponse.getRepair().toObject();

                    responseApi.json(repair);

                    /** LOGGER  **/
                    logger.apiResponse(requestApi, {
                        userId: user.id,
                        rest: {
                            repair,
                        },
                    });
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_REPAIR] **/
        catchErrorAndResponse(error, responseApi, 'getRepair');
    }
}
