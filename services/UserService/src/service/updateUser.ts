import * as grpc from '@grpc/grpc-js';
import { UpdateUserRequest, UpdateUserResponse } from '../../../../grpc/User/User_pb';
import { JoiValidator } from '../../../../helpers/validate';
import { User } from '../../../../interface/user.interface';
import { UpdateUserValidator } from '../model/user.joi-schema';
import { PasswordModule } from '../../../../middleware/Pbkdf2/pbkdf2';
import { isUpdated, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { ObjectId } from 'mongodb';
import { grpcAuthClient } from '../../../grpcClients';
import { DeleteAllAuthByIdRequest } from '../../../../grpc/Auth/Auth_pb';

type Call = grpc.ServerUnaryCall<UpdateUserRequest, UpdateUserResponse>;
type Callback = grpc.sendUnaryData<UpdateUserResponse>;

type OmittedUser = Omit<User, 'createdAt' | 'updatedAt'>;

interface UserUpdate extends OmittedUser {
    password?: string;
    salt?: string;
}

export const updateUser = (mongodb: MongoDb<User>) => {
    const userToUpdate: Partial<UserUpdate> = {};

    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** GET CAR FROM GRPC && VALIDATE */
            const clientObjectFromGRPC = request.getUser().toObject();
            const userValidated = await JoiValidator<OmittedUser, OmittedUser>(
                UpdateUserValidator,
                clientObjectFromGRPC,
                {
                    removeId: false,
                    removeEmptyProperties: true,
                    excludeKeys: ['createdAt', 'updatedAt'],
                }
            );

            /** if PASSWORD is to change **/
            if (userValidated.password) {
                const { hashedPassword, salt } = await PasswordModule.create(
                    userValidated.password
                );
                userToUpdate.password = hashedPassword;
                userToUpdate.salt = salt;


            }

            /** GET ID AND REMOVE FROM VALIDATED OBJECT ID, BECAUSE ID CANT BE UPDATED **/
            const userId = new ObjectId(userValidated.id);
            delete userValidated.id;

            const updatedResponse = await isUpdated(
                await mongodb.collection.updateOne(
                    {
                        _id: userId,
                    },
                    {
                        $set: {
                            ...userValidated,
                            ...userToUpdate,
                            updatedAt: Date.now(),
                        },
                    }
                )
            );

            /** DELETE ACTIVE AUTH SESSIONS **/
            const requestGRPC = new DeleteAllAuthByIdRequest();
            requestGRPC.setId(clientObjectFromGRPC.id);
            grpcAuthClient.deleteAuthById(requestGRPC, (err, value) => {
                return value;
            });

            /** SUCCESS RESPONSE GRPC [UPDATE_USER]  */
            const responseGRPC = new UpdateUserResponse();
            responseGRPC.setUpdated(updatedResponse);

            callback(null, responseGRPC);
            //
        } catch (e) {
            /** SEND RESPONSE_ERROR [UPDATE_CLIENT] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
