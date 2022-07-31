import * as grpc from '@grpc/grpc-js';

import { SequelizeInit } from '../../../middleware/Sequelize';
import * as UserModel from './model/db.model';
import { UserInstance } from './model/db.model';
import { UserService } from '../../../grpc/User/User_grpc_pb';
import { setUser } from './service/setUser';
import messageQueue from '../../../middleware/MessageQueue/messageQueue';
import { EmailSend } from '../../../interface/email';
import { getAllUsers } from './service/getAllUsers';
import { deleteUser } from './service/deleteUser';
import { getUserAuth } from './service/getUserAuth';
import { getUser } from './service/getUser';

// DATABASE
const sequelize = new SequelizeInit<UserInstance>([UserModel]);

// queue
export const queueEmailService = messageQueue.setQueue<EmailSend, any, string>({
    name: 'emailService',
});

// GRPC SERVER
const server = new grpc.Server();

server.addService(UserService, {
    getUser: getUser(sequelize),
    setUser: setUser(sequelize),
    deleteUser: deleteUser(sequelize),
    getAllUsers: getAllUsers(sequelize),
    getUserAuth: getUserAuth(sequelize),
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
