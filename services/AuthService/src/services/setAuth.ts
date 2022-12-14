import * as grpc from '@grpc/grpc-js';
import { Redis } from 'ioredis';

import { SetAuthRequest, SetAuthResponse } from '../../../../grpc/Auth/Auth_pb';
import { UserSchema } from '../../../../grpc/Schema/UserSchema_pb';
import { User } from '../../../../interface/user.interface';
import { PasswordModule } from '../../../../middleware/Pbkdf2/pbkdf2';
import { createToken } from '../middleware/token';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { userAuth } from './setAuth/userAuth';
import { JoiValidator } from '../../../../helpers/validate';
import { SetAuth } from '../../../../interface/auth.interface';
import { SetLoginValidator } from '../model/validator.joi';

const EXP: number = +process.env.JWT_EXP;

type Call = grpc.ServerUnaryCall<SetAuthRequest, SetAuthResponse>;
type Callback = grpc.sendUnaryData<SetAuthResponse>;

export const setAuth = (redisClient: Redis) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             *  1) GET DATA FROM GRPC_REQUEST [SET_AUTH] AND VALIDATE
             */
            const { email, password } = await JoiValidator<SetAuth, SetAuth>(
                SetLoginValidator,
                {
                    email: request.getEmail(),
                    password: request.getPassword(),
                },
                {
                    removeEmptyProperties: true,
                }
            );

            /**
             * RESOLVE USER/CLIENT-DATA OR REJECT
             */
            const { user, salt } = await userAuth(email);
            const hashedPassword = user.password;

            const isPasswordCorrect = await PasswordModule.verify(password, hashedPassword, salt);

            if (isPasswordCorrect) {
                /**
                 * 1) CREATE TOKEN
                 * 2) SAVE TO DB
                 */
                const jwtToken = await createToken(user);
                await redisClient.set(
                    `user_token:${user.id}:${jwtToken}`,
                    jwtToken,
                    'EX',
                    60 * EXP
                );

                /**
                 *
                 * 1) PREPARE DATA FOR GRPC_RESPONSE [SET_AUTH]
                 * 2) SEND RESPONSE [SET_AUTH]
                 *
                 */
                const userSchema = fromJsonToGrpc<UserSchema, User>(new UserSchema(), user, {
                    excludeKeys: ['password', 'salt'],
                });

                const grpcSetAuthResponse = new SetAuthResponse();
                grpcSetAuthResponse.setToken(jwtToken);
                grpcSetAuthResponse.setUser(userSchema);

                callback(null, grpcSetAuthResponse);
            } else {
                /* SEND RESPONSE_ERROR [SET_AUTH] */
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: 'Wrong password',
                });
            }
        } catch (e) {
            /* SEND RESPONSE_ERROR [SET_AUTH] */
            callback(e);
        }
    };
};
