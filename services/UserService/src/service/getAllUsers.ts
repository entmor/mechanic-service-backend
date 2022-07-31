import * as grpc from '@grpc/grpc-js';

import { SequelizeInit } from '../../../../middleware/Sequelize';
import { GetAllUsersRequest, GetAllUsersResponse } from '../../../../grpc/User/User_pb';
import { modelName as USER_MODEL_NAME, UserInstance } from '../model/db.model';
import { getAllWithLimit } from '../../../../helpers/database';
import { GetAllResponse } from '../../../../interface/request';
import { User } from '../../../../interface/user';
import { GenderGrpc } from '../../../../interface/gender';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';

type Call = grpc.ServerUnaryCall<GetAllUsersRequest, GetAllUsersResponse>;
type Callback = grpc.sendUnaryData<GetAllUsersResponse>;

export const getAllUsers = (sequelize: SequelizeInit<UserInstance>) => {
    const database = sequelize.getModel(USER_MODEL_NAME);

    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            const response = new GetAllUsersResponse();

            const { count, page, per_page, sort, isNextPage, data } = await getAllWithLimit<
                UserInstance,
                GetAllResponse<User<GenderGrpc>>
            >(database, {
                page: request.getPage(),
                per_page: request.getPerPage(),
                sort: request.getSort(),
            });

            response.setCount(count);
            response.setPage(page);
            response.setPerPage(per_page);
            response.setSort(sort);
            response.setIsNextPage(isNextPage);

            data.forEach((object: User<GenderGrpc>) => {
                response.addUsers(
                    fromJsonToGrpc<UserSchema, User<GenderGrpc>>(new UserSchema(), object, {
                        getTimeChange: true,
                        excludeKeys: ['salt', 'password'],
                    })
                );
            });

            callback(null, response);
        } catch (e) {
            callback(e, null);
        }
    };
};
