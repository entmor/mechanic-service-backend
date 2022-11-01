import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Client } from '../../../../../interface/client.interface';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { ClientSchema, UpdateClientRequest } from '../../../../../grpc/Client/Client_pb';
import { grpcClientClient } from '../../../../grpcClients';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';
import { catchErrorAndResponse } from '../../middleware/catchError';

type OmittedClient = Omit<Client, 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedClient>;
type ResponseApi = Response<{ updated: boolean } | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { body } = requestApi;
        const { logger, user } = responseApi.locals;

        /** LOGGER  **/
        logger.log('debug', body);

        /** PREPARE DATE FOR GRPC_REQUEST [UPDATE_CLIENT] **/
        const clientSchema = fromJsonToGrpc<ClientSchema, Client>(new ClientSchema(), body, {
            excludeKeys: ['createdAt', 'updatedAt'],
        });

        /** MAKE GRPC_REQUEST [UPDATE_CLIENT] **/
        const requestGRPC = new UpdateClientRequest();
        requestGRPC.setClient(clientSchema);

        grpcClientClient.updateClient(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [UPDATE_CLIENT] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [UPDATE_CLIENT] **/
                responseApi.json({
                    updated: grpcResponse.getUpdated(),
                });

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    userId: user.id,
                    rest: {
                        updated: grpcResponse.getUpdated(),
                    },
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [DELETE_CLIENT] **/
        catchErrorAndResponse(error, responseApi, 'deleteClient');
    }
}
