import * as grpc from '@grpc/grpc-js';
import { SetUserRequest, SetUserResponse } from '../../../../grpc/User/User_pb';
import { SequelizeInit } from '../../../../middleware/Sequelize';
import { modelName as USER_MODEL_NAME, UserInstance } from '../model/db.model';
import { JoiValidator } from '../../../../helpers/validate';
import { GenderGrpc } from '../../../../interface/gender';
import { User } from '../../../../interface/user';
import { SetUserValidator } from '../validator';
import { PasswordModule } from '../../../../middleware/Pbkdf2/pbkdf2';
import { isRoleExist } from '../middleware/role';
import { ACTION_EMAIL_REGISTER } from '../../../MailerService/services/mailerService';
import { systemEmail } from '../../../../config/admin';
import { insert } from '../../../../helpers/database';
import { queueEmailService } from '../userService';
import { isStatusExist } from '../middleware/status';

type Call = grpc.ServerUnaryCall<SetUserRequest, SetUserResponse>;
type Callback = grpc.sendUnaryData<SetUserResponse>;

type ValidType = User<GenderGrpc> & { sendEmail: boolean };

export const setUser = (sequelize: SequelizeInit<UserInstance>) => {
    const database = sequelize.getModel(USER_MODEL_NAME);

    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             * GET USER FROM GRPC && VALIDATE
             */
            const userObject = request.getUser().toObject();
            const validated = await JoiValidator<ValidType, ValidType>(
                SetUserValidator,
                {
                    ...userObject,
                    sendEmail: request.getSendEmail(),
                },
                {
                    removeId: true,
                    removeEmptyProperties: true,
                }
            );

            /* check Role and Status */
            const role = await isRoleExist(validated.role);
            const status = await isStatusExist(validated.status);

            /* create Hashed Password and generate salt */
            const { hashedPassword, salt } = await PasswordModule.create(validated.password);

            /**
             * Insert Object to database
             */
            const { id } = await insert<UserInstance, User<GenderGrpc>, { id: number }>(database, {
                ...validated,
                password: hashedPassword,
                salt,
                role,
                status,
            });

            /**
             *  SEND E-MAIL, dont wait for response
             */
            if (validated.sendEmail)
                // TODO REGISTER EMAIL
                queueEmailService
                    .add(ACTION_EMAIL_REGISTER, {
                        from: systemEmail,
                        to: validated.email,
                        subject: 'Rejestracja',
                        data: [
                            {
                                from: '{{ url }}',
                                to: 'dasds',
                            },
                        ],
                    })
                    .then(() => console.log('Register Email sent to ' + validated.email))
                    .catch(() => {
                        //TODO
                        //REPORT ERROR
                    });

            /**
             * RESPONSE GRPC
             */
            const setResponse = new SetUserResponse();
            setResponse.setId(id);

            callback(null, setResponse);
            //
        } catch (e) {
            callback(e, null);
        }
    };
};
