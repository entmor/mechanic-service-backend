import * as grpc from '@grpc/grpc-js';
import { DeleteUserRequest, DeleteUserResponse } from '../../../../grpc/User/User_pb';
import { SequelizeInit } from '../../../../middleware/Sequelize';
import { modelName as USER_MODEL_NAME, UserInstance } from '../model/db.model';
import { deleteByID } from '../../../../helpers/database';

type Call = grpc.ServerUnaryCall<DeleteUserRequest, DeleteUserResponse>;
type Callback = grpc.sendUnaryData<DeleteUserResponse>;

export const deleteUser = (sequelize: SequelizeInit<UserInstance>) => {
    const database = sequelize.getModel(USER_MODEL_NAME);

    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            const ID = request.getId();

            // DELETE OBJECT
            const deleteResponse = await deleteByID<UserInstance>(database, ID);

            // GRPC RESPONSE
            const response = new DeleteUserResponse();
            response.setSuccess(deleteResponse);

            callback(null, response);
            //
        } catch (e) {
            callback(e, null);
        }
    };
};
