import * as grpc from '@grpc/grpc-js';
import { AuthService } from '../../../grpc/Auth/Auth_grpc_pb';
import IORedis from 'ioredis';
import { setAuth } from './services/setAuth';
import { getAuth } from './services/getAuth';
import { deleteAuth } from './services/deleteAuth';
import { deleteAuthById } from './services/deleteAuthById';

// GRPC SERVER
const server = new grpc.Server();

const redisClient = new IORedis({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});

server.addService(AuthService, {
    getAuth: getAuth(redisClient),
    setAuth: setAuth(redisClient),
    deleteAuth: deleteAuth(redisClient),
    deleteAuthById: deleteAuthById(redisClient),
});

server.bindAsync(
    `${process.env.GRPC_AUTH_SERVICE_URL}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
        server.start();

        console.log('---------------');
        console.log('GRPC Auth-Service Started');
        console.log('---------------');
    }
);
