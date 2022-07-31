import * as grpc from '@grpc/grpc-js';

import { User } from '../../../../../interface/user';
import { GenderGrpc } from '../../../../../interface/gender';
import { UserClient } from '../../../../../grpc/User/User_grpc_pb';
import { GetUserAuthRequest } from '../../../../../grpc/User/User_pb';

const grpcUserClient = new UserClient(
    `${process.env.GRPC_USER_SERVICE_URL}`,
    grpc.credentials.createInsecure()
);

export const userAuth = (email: string): Promise<User<GenderGrpc>> => {
    /**
     * 1) PREPARE DATA FOR GRPC_REQUEST [GET_USER_AUTH]
     * 2) SEND REQUEST [GET_USER_AUTH]
     */
    const grpcUserAuthRequest = new GetUserAuthRequest();
    grpcUserAuthRequest.setEmail(email);

    return new Promise((resolve, reject) => {
        grpcUserClient.getUserAuth(grpcUserAuthRequest, async (error, grpcUserAuthResponse) => {
            if (error) {
                reject(error);
            }

            resolve(grpcUserAuthResponse.getUser().toObject());
        });
    });
};
