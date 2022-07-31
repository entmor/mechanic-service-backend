import * as grpc from '@grpc/grpc-js';
import { GetCarRequest, GetCarResponse } from '../../../../grpc/Car/Car_pb';

type Call = grpc.ServerUnaryCall<GetCarRequest, GetCarResponse>;
type Callback = grpc.sendUnaryData<GetCarResponse>;

export const getCar = () => {
    //Promise<( call: any, callback: any): Promise<void> >
    return async ({ request }: Call, callback: Callback): Promise<void> => {

    };
};
