import * as grpc from '@grpc/grpc-js';
import { GetUserAuthRequest, GetUserAuthResponse } from '../../../../grpc/User/User_pb';
import { SequelizeInit } from '../../../../middleware/Sequelize';
import { modelName as USER_MODEL_NAME, UserInstance } from '../model/db.model';
import { getByID } from '../../../../helpers/database';
import { GenderGrpc } from '../../../../interface/gender';
import { User } from '../../../../interface/user';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';

type Call = grpc.ServerUnaryCall<GetUserAuthRequest, GetUserAuthResponse>;
type Callback = grpc.sendUnaryData<GetUserAuthResponse>;

export const getUserAuth = (sequelize: SequelizeInit<UserInstance>) => {
    const database = sequelize.getModel(USER_MODEL_NAME);

    return async ({ request }: Call, callback: Callback) => {
        try {
            //GET FROM DATABASE

            const user = await database.findOne({
                where: { email: request.getEmail() },
                raw: true,
            });

            //GRPC RESPONSE
            const userSchema = fromJsonToGrpc<UserSchema, User<GenderGrpc>>(
                new UserSchema(),
                user,
                {
                    getTimeChange: true,
                }
            );
            const response = new GetUserAuthResponse();
            response.setUser(userSchema);
            response.setSalt(user.salt);

            callback(null, response);
            //
        } catch (e) {
            callback(e, null);
        }
    };
};
