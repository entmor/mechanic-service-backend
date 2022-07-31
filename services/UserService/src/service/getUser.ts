import * as grpc from '@grpc/grpc-js';
import { GetUserRequest, GetUserResponse } from '../../../../grpc/User/User_pb';
import { SequelizeInit } from '../../../../middleware/Sequelize';
import { modelName as USER_MODEL_NAME, UserInstance } from '../model/db.model';
import { getByID } from '../../../../helpers/database';
import { GenderGrpc } from '../../../../interface/gender';
import { User } from '../../../../interface/user';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';
import { checkAuthorization } from '../../../../helpers/authorization';
import { authorizationConfig } from '../config/authorization';

type Call = grpc.ServerUnaryCall<GetUserRequest, GetUserResponse>;
type Callback = grpc.sendUnaryData<GetUserResponse>;

export const getUser = (sequelize: SequelizeInit<UserInstance>) => {
    const database = sequelize.getModel(USER_MODEL_NAME);

    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            const auth = request.getAuth().toObject();

            const authorization = await checkAuthorization(
                authorizationConfig.getUser,
                auth,
                request.getId()
            );

            //GET FROM DATABASE
            const user = await getByID<UserInstance, User<GenderGrpc>>(database, request.getId());

            // GRPC RESPONSE
            const userSchema = fromJsonToGrpc<UserSchema, User<GenderGrpc>>(
                new UserSchema(),
                user,
                {
                    getTimeChange: true,
                    excludeKeys: ['password', 'salt'],
                }
            );
            const response = new GetUserResponse();
            response.setUser(userSchema);

            callback(null, response);
            //
        } catch (e) {
            callback(e, null);
        }
    };
};
