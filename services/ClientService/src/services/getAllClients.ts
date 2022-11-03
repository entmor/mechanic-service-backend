import * as grpc from '@grpc/grpc-js';
import {
    isNextPage,
    MongoDb,
    prepareFindFilter,
    prepareFindOptions,
} from '../../../../middleware/Mongodb/mongodb';
import {
    ClientSchema,
    GetAllClientsRequest,
    GetAllClientsResponse,
} from '../../../../grpc/Client/Client_pb';
import { Client } from '../../../../interface/client.interface';
import { FindClientsFilter } from '../models/client.joi-schema';
import { fromJsonToGrpc } from '../../../../helpers/grpc';

type Call = grpc.ServerUnaryCall<GetAllClientsRequest, GetAllClientsResponse>;
type Callback = grpc.sendUnaryData<GetAllClientsResponse>;

export const getAllClients = (mongodb: MongoDb<Client>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**  PREPARE DATA FROM GRPC **/
            const where = request.hasWhere() ? JSON.parse(request.getWhere()) : {};
            const preparedWhere = await prepareFindFilter<Client>(FindClientsFilter, where);

            const preparedFindOptions = prepareFindOptions({
                per_page: +request.getPerPage(),
                page: +request.getPage(),
                sort: request.getSort(),
                orderby: request.getOrderby(),
            });

            /** GET ALL CLIENTS FROM DATABASE **/
            const countClientsQuery = mongodb.collection.countDocuments(preparedWhere);
            const getClientsQuery = mongodb.collection
                .find(preparedWhere, preparedFindOptions.findOptions)
                .toArray();

            const [countClients, clientsArray] = await Promise.all([
                countClientsQuery,
                getClientsQuery,
            ]);
            const _isNextPage = isNextPage(
                preparedFindOptions.findOptions.limit,
                preparedFindOptions.query.page,
                +countClients
            );

            /** SUCCESS RESPONSE GRPC [GET_ALL_CLIENTS]  */
            const responseGRPC = new GetAllClientsResponse();

            responseGRPC.setCount(+countClients);
            responseGRPC.setPage(+preparedFindOptions.query.page || 1);
            responseGRPC.setPerPage(+preparedFindOptions.query.per_page || 0);
            responseGRPC.setSort(preparedFindOptions.query.sort);
            responseGRPC.setIsNextPage(_isNextPage);

            clientsArray.forEach((client): void => {
                if ('_id' in client) {
                    client.id = client._id.toString();
                }
                responseGRPC.addClients(
                    fromJsonToGrpc<ClientSchema, Client>(new ClientSchema(), client)
                );
            });
            callback(null, responseGRPC);
            //
        } catch (e) {
            console.log(e);
            /** SEND RESPONSE_ERROR [GET_ALL_CLIENTS] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
