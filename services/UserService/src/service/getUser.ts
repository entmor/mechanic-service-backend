import * as grpc from '@grpc/grpc-js';
import { GetUserRequest, GetUserResponse } from '../../../../grpc/User/User_pb';
import { User } from '../../../../interface/user.interface';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';
import { isFound, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { ObjectId } from 'mongodb';

type Call = grpc.ServerUnaryCall<GetUserRequest, GetUserResponse>;
type Callback = grpc.sendUnaryData<GetUserResponse>;

export const getUser = (mongodb: MongoDb<User>) => {
    return async ({ request, metadata }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET USER FROM DATABASE **/
            const userId = new ObjectId(request.getId());
            const userObject = await isFound(await mongodb.collection.findOne(userId));

            /** SUCCESS RESPONSE GRPC [GET_USER]  */
            if ('_id' in userObject) {
                userObject.id = userObject._id.toString();
            }

            const userSchema = fromJsonToGrpc<UserSchema, User>(new UserSchema(), userObject, {
                excludeKeys: ['password', 'salt'],
            });

            const responseGRPC = new GetUserResponse();
            responseGRPC.setUser(userSchema);

            callback(null, responseGRPC);
            //
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_USER] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
