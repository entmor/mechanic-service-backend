import { Logger } from '../../../../middleware/Logger/logger';

import * as grpc from '@grpc/grpc-js';
import { Metadata } from '@grpc/grpc-js';
import { NextFunction, Request, Response } from 'express';
import { grpcAuthClient } from '../../../grpcClients';
import { errorsHandler } from '../errors';

import { GetAuthRequest } from '../../../../grpc/Auth/Auth_pb';
import { checkToken } from '../../../../helpers/authorization';
import { User } from '../../../../interface/user.interface';
import { getToken } from './getToken';
import { catchErrorAndResponse } from './catchError';

type RequestApi = Request<unknown, unknown, { token: string }, unknown, unknown>;
type ResponseApi = Response<
    unknown,
    { user: User; token: string; type: string; authMetadata: any }
>;

const logger = new Logger('api-service-authenticator');

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
    { body, headers }: RequestApi,
    responseApi: ResponseApi,
    next: NextFunction
) => {
    try {
        /**
         *  VALIDATE TOKEN FROM USER
         */
        const token = await checkToken(await getToken(headers.authorization));
        // const type = await isType(responseApi.locals.type);

        /**
         *
         *  1) PREPARE DATA FOR GRPC_REQUEST [GET_AUTH]
         *  2) SEND REQUEST [GET_AUTH]
         */
        const grpcAuthRequest = new GetAuthRequest();
        grpcAuthRequest.setToken(token);
        // grpcAuthRequest.setType(type);

        grpcAuthClient.getAuth(grpcAuthRequest, (error, grpcAuthResponse) => {
            if (error) {
                /** SEND RESPONSE_ERROR [GET_AUTH] */
                const errorResponse = errorsHandler(error);
                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                const token = grpcAuthResponse.getToken();
                const user = grpcAuthResponse.getUser().toObject();

                const grpcMetadata = new Metadata();
                grpcMetadata.add('id', user.id);
                grpcMetadata.add('type', responseApi.locals.type);
                grpcMetadata.add('role', user.role);

                responseApi.locals.token = token;
                responseApi.locals.user = user;
                responseApi.locals.authMetadata = grpcMetadata;
                responseApi.set('Authorization', `Bearer ${token}`);

                logger.log('debug', {
                    message: 'Authorization ok',
                    user,
                    token,
                });

                next();
            }
        });
    } catch (error) {
        catchErrorAndResponse(error, responseApi, 'authenticator');
    }
};
