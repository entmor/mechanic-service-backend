import * as grpc from '@grpc/grpc-js';
import { GetUserAuthRequest, GetUserAuthResponse } from '../../../../grpc/User/User_pb';
import { User } from '../../../../interface/user.interface';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';
import { isFound, MongoDb } from '../../../../middleware/Mongodb/mongodb';

type Call = grpc.ServerUnaryCall<GetUserAuthRequest, GetUserAuthResponse>;
type Callback = grpc.sendUnaryData<GetUserAuthResponse>;

export const getUserAuth = (mongodb: MongoDb<User>) => {
    return async ({ request }: Call, callback: Callback) => {
        try {
            /** GET USER FROM DATABASE **/
            const userObject = await isFound(
                await mongodb.collection.findOne({ email: request.getEmail(), status: 'active' })
            );

            /** SUCCESS RESPONSE GRPC [GET_AUTH_USER]  */
            if ('_id' in userObject) {
                userObject.id = userObject._id.toString();
            }

            const userSchema = fromJsonToGrpc<UserSchema, User>(new UserSchema(), userObject);
            const responseGRPC = new GetUserAuthResponse();

            responseGRPC.setUser(userSchema);
            responseGRPC.setSalt(userObject.salt);

            callback(null, responseGRPC);
            //
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_AUTH_USER] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
