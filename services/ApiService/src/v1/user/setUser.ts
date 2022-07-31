import { Request, Response } from 'express';
import { GenderClient, GenderGrpc } from '../../../../../interface/gender';
import { User } from '../../../../../interface/user';
import { ApiResponse, errorsHandler } from '../../errors';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { SetUserRequest } from '../../../../../grpc/User/User_pb';
import { grpcUserClient } from '../../grpcClients';
import { Gender, UserSchema } from '../../../../../grpc/Schema/UserSchema_pb';

type OmittedUser = Omit<User<GenderClient>, 'id' | 'createdAt' | 'updatedAt'>;
interface RequestBody extends OmittedUser {
    sendEmail: boolean | string;
}

type RequestApi = Request<any, any, RequestBody>;
type ResponseApi = Response<{ id: number } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
        /**
         *  BUILD GRPC REQUEST
         */

        const userSchema = fromJsonToGrpc<UserSchema, User<GenderGrpc>>(new UserSchema(), body, {
            excludeKeys: ['id', 'gender', 'createdAt', 'sendEmail', 'updatedAt'],
        });
        userSchema.setGender(Gender[body.gender]);

        const requestUser = new SetUserRequest();

        requestUser.setUser(userSchema);

        // TODO usunac 'true'
        requestUser.setSendEmail(body.sendEmail == true || body.sendEmail == 'true');

        /**
         *
           SEND GRPC REQUEST
         *
        **/
        grpcUserClient.setUser(requestUser, (error, res) => {
            if (error) {
                const errorResponse = errorsHandler(error);
                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                responseApi.status(200).json({
                    id: res.getId(),
                });
            }
        });
        //
    } catch (error) {
        const errorResponse = errorsHandler(error);

        responseApi.status(errorResponse.http_code).json(errorResponse);
    }
}
