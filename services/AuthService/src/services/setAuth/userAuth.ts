import { User } from '../../../../../interface/user.interface';
import { GetUserAuthRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../../../grpcClients';

export const userAuth = (
    email: string
): Promise<{
    user: User;
    salt: string;
}> => {
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
            } else {
                resolve({
                    user: grpcUserAuthResponse.getUser().toObject(),
                    salt: grpcUserAuthResponse.getSalt(),
                });
            }
        });
    });
};
