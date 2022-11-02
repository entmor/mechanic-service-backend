import { Request, Response } from 'express';
import Joi from 'joi';
import { ApiResponse, errorsHandler } from '../../errors';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { grpcVehicleClient } from '../../../../grpcClients';
import { DeleteVehicleRequest } from '../../../../../grpc/Vehicle/Vehicle_pb';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { status } from '@grpc/grpc-js';

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
            /** ERROR GRPC_REQUEST HANDLER [DELETE_VEHICLE] **/
            Promise.reject({
                code: status.INVALID_ARGUMENT,
                message: 'WRONG ID',
            });

            /** LOGGER  **/
            logger.log('debug', param_id.error);
        } else {
            /** MAKE GRPC_REQUEST [DELETE_VEHICLE] **/
            const requestGRPC = new DeleteVehicleRequest();
            requestGRPC.setId(param_id.value);

            /** LOGGER  **/
            logger.log('debug', { setId: param_id.value });

            grpcVehicleClient.deleteVehicle(requestGRPC, (error, grpcResponse): void => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [DELETE_VEHICLE] **/
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
        /** ERROR GRPC_REQUEST HANDLER [DELETE_VEHICLE] **/
        catchErrorAndResponse(error, responseApi, 'deleteVehicle');
    }
}
