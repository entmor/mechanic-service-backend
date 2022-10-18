import { Redis } from 'ioredis';
import * as grpc from '@grpc/grpc-js';
import { DeleteAllAuthByIdRequest, DeleteAllAuthByIdResponse } from '../../../../grpc/Auth/Auth_pb';
import { JoiValidator } from '../../../../helpers/validate';
import { DeleteAuthByIdValidator } from '../model/validator.joi';
import { DeleteById } from '../../../../interface/auth.interface';
import { searchRedisKeys } from '../../../../helpers/redis';

type Call = grpc.ServerUnaryCall<DeleteAllAuthByIdRequest, DeleteAllAuthByIdResponse>;
type Callback = grpc.sendUnaryData<DeleteAllAuthByIdResponse>;

export const deleteAuthById = (redisClient: Redis) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**
             *  GET DATA FROM GRPC_REQUEST [DELETE_AUTH_BY_ID] AND VALIDATE
             */
            const { id } = await JoiValidator<DeleteById, DeleteById>(
                DeleteAuthByIdValidator,
                {
                    id: request.getId(),
                },
                {
                    removeEmptyProperties: true,
                }
            );

            /** FIND AND DELETE TOKENS **/
            const tokens = await searchRedisKeys(redisClient, `user_token:${id}:*`);
            if (tokens.length > 0) {
                tokens.map(async (value): Promise<number> => {
                    return await redisClient.del(`${value}`);
                });
            }

            /** SUCCESS RESPONSE GRPC [DELETE_AUTH_BY_ID]  */
            const grpcDeleteAllAuthByIdResponse = new DeleteAllAuthByIdResponse();
            grpcDeleteAllAuthByIdResponse.setDeleted(true);

            callback(null, grpcDeleteAllAuthByIdResponse);
        } catch (e) {
            /** SEND RESPONSE_ERROR [DELETE_AUTH_BY_ID] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
