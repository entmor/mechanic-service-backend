import * as grpc from '@grpc/grpc-js';
import { UpdateUserRequest, UpdateUserResponse } from '../../../../grpc/User/User_pb';
import { SequelizeInit } from '../../../../middleware/Sequelize';
import { modelName as USER_MODEL_NAME, UserInstance } from '../model/db.model';
import { JoiValidator } from '../../../../helpers/validate';
import { User } from '../../../../interface/user';
import { GenderGrpc } from '../../../../interface/gender';
import { UpdateUserValidator } from '../validator';
import { isExistByID, updateByID } from '../../../../helpers/database';
import { PasswordModule } from '../../../../middleware/Pbkdf2/pbkdf2';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';

type Call = grpc.ServerUnaryCall<UpdateUserRequest, UpdateUserResponse>;
type Callback = grpc.sendUnaryData<UpdateUserResponse>;

type OmittedUser = Omit<User<GenderGrpc>, 'createdAt' | 'updatedAt'>;

interface UserUpdate extends OmittedUser {
    password?: string;
    salt?: string;
}

export const updateInstructor = (sequelize: SequelizeInit<UserInstance>) => {
    const database = sequelize.getModel(USER_MODEL_NAME);

    const userToUpdate: Partial<UserUpdate> = {};

    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            // GET USER FROM GRPC && VALIDATE
            const user = request.getUser().toObject();
            const validated = await JoiValidator<OmittedUser, OmittedUser>(
                UpdateUserValidator,
                user,
                {
                    removeId: false,
                    removeEmptyProperties: true,
                }
            );

            // GET ID AND REMOVE FROM VALIDATED OBJECT ID, BECAUSE ID CANT BE UPDATED
            const ID = validated.id;
            delete validated.id;

            // if PASSWORD is to change
            if (validated.password) {
                const { hashedPassword, salt } = await PasswordModule.create(validated.password);
                userToUpdate.password = hashedPassword;
                userToUpdate.salt = salt;
            }

            // IF USER EXIST, THEN UPDATE
            await isExistByID<UserInstance, User<GenderGrpc>>(database, ID);
            const updatedUser = updateByID<UserInstance, Partial<OmittedUser>, User<GenderGrpc>>(
                database,
                ID,
                { ...validated, ...userToUpdate }
            );

            // GRPC RESPONSE
            const userSchema = fromJsonToGrpc<UserSchema, User<GenderGrpc>>(
                new UserSchema(),
                updatedUser,
                { getTimeChange: true, excludeKeys: ['password', 'salt'] }
            );

            const setResponse = new UpdateUserResponse();
            setResponse.setUser(userSchema);

            callback(null, setResponse);
            //
        } catch (e) {
            callback(e, null);
        }
    };
};
