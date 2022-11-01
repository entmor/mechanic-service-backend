import * as grpc from '@grpc/grpc-js';
import { UserService } from '../../../grpc/User/User_grpc_pb';
import { setUser } from './service/setUser';
import messageQueue from '../../../middleware/MessageQueue/messageQueue';
import { EmailSend } from '../../../interface/email.interface';
import { getAllUsers } from './service/getAllUsers';
import { deleteUser } from './service/deleteUser';
import { getUserAuth } from './service/getUserAuth';
import { getUser } from './service/getUser';
import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { User } from '../../../interface/user.interface';
import { updateUser } from './service/updateUser';

// queue
export const queueEmailService = messageQueue.setQueue<EmailSend, any, string>({
    name: 'emailService',
});

const mongodb = new MongoDb<User>('users');

mongodb
    .connection()
    .then((db) => {
        // GRPC SERVER
        const server = new grpc.Server();

        server.addService(UserService, {
            getUser: getUser(db),
            setUser: setUser(db),
            updateUser: updateUser(db),
            deleteUser: deleteUser(db),
            getAllUsers: getAllUsers(db),
            getUserAuth: getUserAuth(db),
        });

        server.bindAsync(
            `${process.env.GRPC_USER_SERVICE_URL}`,
            grpc.ServerCredentials.createInsecure(),
            () => {
                server.start();

                console.log('---------------');
                console.log('GRPC User-Service Started');
                console.log('---------------');
            }
        );
    })
    .catch(console.error);
