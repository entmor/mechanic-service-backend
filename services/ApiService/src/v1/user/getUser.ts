import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { User } from '../../../../../interface/user.interface';
import { grpcUserClient } from '../../../../grpcClients';
import { GetUserRequest } from '../../../../../grpc/User/User_pb';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { Metadata, status } from '@grpc/grpc-js';
import { Logger } from '../../../../../middleware/Logger/logger';
import { catchErrorAndResponse } from '../../middleware/catchError';

interface ParamsRequest {
    id: string;
}
type ResponseApi = Response<
    User | ApiResponse,
    { authMetadata: Metadata; logger: Logger; user: User }
>;
type RequestApi = Request<ParamsRequest>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { logger, user } = responseApi.locals;

        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_USER] **/
            Promise.reject({
                code: status.INVALID_ARGUMENT,
                message: 'WRONG ID',
            });

            /** LOGGER  **/
            logger.log('debug', param_id.error);
        } else {
            /** MAKE GRPC_REQUEST [GET_USER] **/
            const request = new GetUserRequest();
            request.setId(param_id.value);

            /** LOGGER  **/
            logger.log('debug', param_id.value);

            const grpc_metadata = responseApi.locals.authMetadata;

            grpcUserClient.getUser(request, grpc_metadata, (error, grpcResponse) => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_USER] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_USER] **/
                    const _user: User = grpcResponse.getUser().toObject();

                    responseApi.status(200).json(_user);

                    /** LOGGER  **/
                    logger.apiResponse(requestApi, {
                        userId: user.id,
                        rest: {
                            _user,
                        },
                    });
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_USER] **/
        catchErrorAndResponse(error, responseApi, 'getUser');
    }
}
