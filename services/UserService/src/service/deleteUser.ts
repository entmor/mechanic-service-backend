import * as grpc from '@grpc/grpc-js';
import { DeleteUserRequest, DeleteUserResponse } from '../../../../grpc/User/User_pb';
import { isDeleted, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { User } from '../../../../interface/user.interface';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { ObjectId } from 'mongodb';
import { grpcAuthClient } from '../../../grpcClients';
import { DeleteAllAuthByIdRequest } from '../../../../grpc/Auth/Auth_pb';

type Call = grpc.ServerUnaryCall<DeleteUserRequest, DeleteUserResponse>;
type Callback = grpc.sendUnaryData<DeleteUserResponse>;

export const deleteUser = (mongodb: MongoDb<User>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [DELETE_USER] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** DELETE USER FROM DATABASE **/
                const userId = new ObjectId(request.getId());
                const deleted = await isDeleted(
                    await mongodb.collection.deleteOne({
                        _id: userId,
                    })
                );

                const requestGRPC = new DeleteAllAuthByIdRequest();
                requestGRPC.setId(request.getId());

                grpcAuthClient.deleteAuthById(requestGRPC, (err, value) => {
                    return value;
                });

                /** SUCCESS RESPONSE GRPC [DELETE_USER] */
                const responseGRPC = new DeleteUserResponse();
                responseGRPC.setDeleted(deleted);

                callback(null, responseGRPC);
                //
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_USER] **/

            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
