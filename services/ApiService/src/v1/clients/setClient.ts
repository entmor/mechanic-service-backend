import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Client } from '../../../../../interface/client.interface';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { ClientSchema, SetClientRequest } from '../../../../../grpc/Client/Client_pb';
import { grpcClientClient } from '../../../../grpcClients';
import { catchErrorAndResponse } from '../../middleware/catchError';
import { Logger } from '../../../../../middleware/Logger/logger';
import { User } from '../../../../../interface/user.interface';

type OmittedClient = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedClient>;
type ResponseApi = Response<{ id: string } | ApiResponse, { logger: Logger; user: User }>;

export default function (requestApi: RequestApi, responseApi: ResponseApi) {
    try {
        const { body } = requestApi;
        const { logger, user } = responseApi.locals;

        /** LOGGER  **/
        logger.log('debug', body);

        /** PREPARE DATE FOR GRPC_REQUEST [SET_CLIENT] **/
        const clientSchema = fromJsonToGrpc<ClientSchema, Client>(new ClientSchema(), body, {
            excludeKeys: ['id', 'createdAt', 'updatedAt'],
        });

        /** MAKE GRPC_REQUEST [SET_CLIENT] **/
        const requestGRPC = new SetClientRequest();
        requestGRPC.setClient(clientSchema);

        grpcClientClient.setClient(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [SET_CLIENT] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [SET_CLIENT] **/
                responseApi.json({
                    id: grpcResponse.getId(),
                });

                /** LOGGER  **/
                logger.apiResponse(requestApi, {
                    userId: user.id,
                    rest: {
                        setId: grpcResponse.getId(),
                    },
                });
            }
        });
    } catch (error) {
        /** ERROR GRPC_REQUEST HANDLER [SET_CLIENT] **/
        catchErrorAndResponse(error, responseApi, 'setClient');
    }
}
