import * as grpc from '@grpc/grpc-js';
import { SetUserRequest, SetUserResponse } from '../../../../grpc/User/User_pb';
import { JoiValidator } from '../../../../helpers/validate';
import { User } from '../../../../interface/user.interface';
import { SetUserValidator } from '../model/user.joi-schema';
import { PasswordModule } from '../../../../middleware/Pbkdf2/pbkdf2';
import { isRoleExist } from '../middleware/role';
import { isStatusExist } from '../middleware/status';
import { MongoDb } from '../../../../middleware/Mongodb/mongodb';

type Call = grpc.ServerUnaryCall<SetUserRequest, SetUserResponse>;
type Callback = grpc.sendUnaryData<SetUserResponse>;

type ValidType = Omit<User, 'id' | 'updateAt' | 'createAt'> & { sendEmail: boolean };

export const setUser = (mongodb: MongoDb<User>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * GET USER FROM GRPC && VALIDATE
             */
            const userObjectFromGRPC = request.getUser().toObject();
            const userValidated = await JoiValidator<ValidType, ValidType>(
                SetUserValidator,
                {
                    ...userObjectFromGRPC,
                    sendEmail: request.getSendEmail(),
                },
                {
                    removeId: true,
                    removeEmptyProperties: true,
                    excludeKeys: ['createdAt', 'updatedAt'],
                }
            );

            /* check Role and Status */
            const role = await isRoleExist(userValidated.role);
            const status = await isStatusExist(userValidated.status);

            const user = await mongodb.collection.findOne({
                email: userValidated.email,
            });

            if (user === null) {
                /** create Hashed Password and generate salt */
                const { hashedPassword, salt } = await PasswordModule.create(
                    userValidated.password
                );

                /**
                 * Insert Object to database
                 */
                const insertResponse = await mongodb.collection.insertOne({
                    ...userValidated,
                    password: hashedPassword,
                    salt,
                    role,
                    status,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });

                /**
                 *  SEND E-MAIL, dont wait for response
                 */
                // if (validated.sendEmail)
                //     // TODO REGISTER EMAIL
                //     queueEmailService
                //         .add(ACTION_EMAIL_REGISTER, {
                //             from: systemEmail,
                //             to: validated.email,
                //             subject: 'Rejestracja',
                //             data: [
                //                 {
                //                     from: '{{ url }}',
                //                     to: 'dasds',
                //                 },
                //             ],
                //         })
                //         .then(() => console.log('Register Email sent to ' + validated.email))
                //         .catch(() => {
                //             //TODO
                //             //REPORT ERROR
                //         });

                /** SUCCESS RESPONSE GRPC [SET_USER]  */
                const responseGRPC = new SetUserResponse();
                responseGRPC.setId(insertResponse.insertedId.toString());

                callback(null, responseGRPC);
            } else {
                /** SEND RESPONSE_ERROR [SET_CLIENT] **/
                callback({
                    code: grpc.status.ALREADY_EXISTS,
                    message: 'USER EXIST',
                });
            }

            //  ,
        } catch (e) {
            /** SEND RESPONSE_ERROR [SET_CLIENT] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
