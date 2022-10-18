import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Client } from '../../../../../interface/client.interface';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { ClientSchema, UpdateClientRequest } from '../../../../../grpc/Client/Client_pb';
import { grpcClientClient } from '../../../../grpcClients';

type OmittedClient = Omit<Client, 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedClient>;
type ResponseApi = Response<{ updated: boolean } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
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
            }
        });
    } catch (error) {
        const errorResponse = errorsHandler(error);

        responseApi.status(errorResponse.http_code).json(errorResponse);
    }
}
