import * as grpc from '@grpc/grpc-js';
import { Response, Request, NextFunction } from 'express';
import { grpcAuthClient } from '../grpcClients';
import { errorsHandler } from '../errors';
import { User } from '../../../../interface/user';
import { GenderGrpc } from '../../../../interface/gender';

import { GetAuthRequest } from '../../../../grpc/Auth/Auth_pb';
import { AuthUser } from '../../../../grpc/Schema/AuthSchema_pb';
import { checkToken } from '../../../../helpers/authorization';

type RequestApi = Request<any, any, { token: string }, any, any>;
type ResponseApi = Response<
    any,
    { user: User<GenderGrpc>; token: string; type: string; authUserMessage: any }
>;

const isType = async (type: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (typeof type == 'string' && type.length > 0) {
            return resolve(type);
        } else {
            return reject({
                code: grpc.status.INTERNAL,
                message: 'Type is required',
            });
        }
    });
};

export const authenticator = async (
    { body }: RequestApi,
    responseApi: ResponseApi,
    next: NextFunction
) => {
    try {
        /**
         *  VALIDATE TOKEN FROM USER
         */
        const token = await checkToken(body.token);
        const type = await isType(responseApi.locals.type);

        /**
         *
         *  1) PREPARE DATA FOR GRPC_REQUEST [GET_AUTH]
         *  2) SEND REQUEST [GET_AUTH]
         */
        const grpcAuthRequest = new GetAuthRequest();
        grpcAuthRequest.setToken(token);
        grpcAuthRequest.setType(type);

        grpcAuthClient.getAuth(grpcAuthRequest, (error, grpcAuthResponse) => {
            if (error) {
                /* SEND RESPONSE_ERROR [GET_AUTH] */
                const errorResponse = errorsHandler(error);
                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                const token = grpcAuthResponse.getToken();
                const user = grpcAuthResponse.getUser().toObject();

                const authGrpcMessage = new AuthUser();
                authGrpcMessage.setType(responseApi.locals.type);
                authGrpcMessage.setId(user.id);
                authGrpcMessage.setRole(user.role);

                responseApi.locals.user = user;
                responseApi.locals.token = token;
                responseApi.locals.authUserMessage = authGrpcMessage;
                responseApi.set('Authorization', `Bearer ${token}`);

                next();
            }
        });
    } catch (error) {
        /* SEND RESPONSE_ERROR [GET_AUTH] */

        if (error !== null) {
            const errorResponse = errorsHandler(error);
            responseApi.status(errorResponse.http_code).json(errorResponse);
        } else {
            responseApi.status(500).json({
                code: grpc.status.INTERNAL,
                http_code: 500,
                message: 'Server ERROR',
            });
        }
    }
};
