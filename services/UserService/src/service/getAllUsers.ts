import * as grpc from '@grpc/grpc-js';
import { GetAllUsersRequest, GetAllUsersResponse } from '../../../../grpc/User/User_pb';
import { User } from '../../../../interface/user.interface';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';
import {
    isNextPage,
    MongoDb,
    prepareFindFilter,
    prepareFindOptions,
} from '../../../../middleware/Mongodb/mongodb';
import { FindUsersFilter } from '../model/user.joi-schema';

type Call = grpc.ServerUnaryCall<GetAllUsersRequest, GetAllUsersResponse>;
type Callback = grpc.sendUnaryData<GetAllUsersResponse>;

export const getAllUsers = (mongodb: MongoDb<User>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**  PREPARE DATA FROM GRPC **/
            const where = request.hasWhere() ? JSON.parse(request.getWhere()) : {};
            const preparedWhere = await prepareFindFilter<User>(FindUsersFilter, where);

            const preparedFindOptions = prepareFindOptions({
                per_page: +request.getPerPage(),
                page: +request.getPage(),
                sort: request.getSort(),
                orderby: request.getOrderby(),
            });

            /** GET ALL USERS FROM DATABASE **/
            const countUsersQuery = mongodb.collection.countDocuments(preparedWhere);
            const getUsersQuery = mongodb.collection
                .find(preparedWhere, preparedFindOptions.findOptions)
                .toArray();

            const [countUsers, UsersArray] = await Promise.all([countUsersQuery, getUsersQuery]);

            const _isNextPage = isNextPage(
                preparedFindOptions.findOptions.limit,
                preparedFindOptions.query.page,
                +countUsers
            );

            /** SUCCESS RESPONSE GRPC [GET_ALL_USERS]  */

            const responseGRPC = new GetAllUsersResponse();

            responseGRPC.setCount(+countUsers);
            responseGRPC.setPage(+preparedFindOptions.query.page || 1);
            responseGRPC.setPerPage(+preparedFindOptions.query.per_page || 0);
            responseGRPC.setSort(preparedFindOptions.query.sort);
            responseGRPC.setIsNextPage(_isNextPage);

            UsersArray.forEach((user) => {
                if ('_id' in user) {
                    user.id = user._id.toString();
                }
                responseGRPC.addUsers(
                    fromJsonToGrpc<UserSchema, User>(new UserSchema(), user, {
                        excludeKeys: ['salt', 'password'],
                    })
                );
            });

            callback(null, responseGRPC);
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_ALL_USERS] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
