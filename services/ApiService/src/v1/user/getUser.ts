import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { User } from '../../../../../interface/user.interface';
import { grpcUserClient } from '../../../../grpcClients';
import { GetUserRequest } from '../../../../../grpc/User/User_pb';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../../helpers/validate';
import { Metadata } from '@grpc/grpc-js';

interface ParamsRequest {
    id: string;
}
type ResponseApi = Response<User | ApiResponse, { authMetadata: Metadata }>;
type RequestApi = Request<ParamsRequest>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        /** CHECK PARAMS FROM REQUEST **/
        const param_id = Joi.string()
            .required()
            .pattern(RegExpPatterns.mongoId)
            .validate(requestApi.params.id);

        if (param_id.error) {
            /** ERROR GRPC_REQUEST HANDLER [GET_USER] **/
            responseApi.status(400).json({
                code: 3,
                http_code: 400,
                message: 'Wrong ID',
            });
        } else {
            /** MAKE GRPC_REQUEST [GET_USER] **/
            const request = new GetUserRequest();
            request.setId(param_id.value);

            const grpc_metadata = responseApi.locals.authMetadata;

            grpcUserClient.getUser(request, grpc_metadata, (error, grpcResponse) => {
                if (error) {
                    /** ERROR GRPC_REQUEST HANDLER [GET_USER] **/
                    const errorResponse = errorsHandler(error);

                    responseApi.status(errorResponse.http_code).json(errorResponse);
                } else {
                    /** SUCCESS GRPC_REQUEST HANDLER [GET_USER] **/
                    const user: User = grpcResponse.getUser().toObject();

                    responseApi.status(200).json(user);
                }
            });
        }
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [GET_USER] **/

        responseApi.status(500).json({
            code: 13,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
