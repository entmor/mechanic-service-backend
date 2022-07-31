import * as grpc from '@grpc/grpc-js';

import { UserClient } from '../../../grpc/User/User_grpc_pb';
import { AuthClient } from '../../../grpc/Auth/Auth_grpc_pb';

export const grpcUserClient = new UserClient(
    `${process.env.GRPC_USER_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);

export const grpcAuthClient = new AuthClient(
    `${process.env.GRPC_AUTH_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);
