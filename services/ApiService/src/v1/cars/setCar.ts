import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Car } from '../../../../../interface/car';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { CarSchema, SetCarRequest } from '../../../../../grpc/Car/Car_pb';
import { grpcCarClient } from '../../grpcClients';

type OmittedCar = Omit<Car, 'id' | 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedCar>;
type ResponseApi = Response<{ id: string } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
        /** PREPARE DATE FOR GRPC_REQUEST [SET_CAR] **/
        const carSchema = fromJsonToGrpc<CarSchema, Car>(new CarSchema(), body, {
            excludeKeys: ['id', 'createdAt', 'updatedAt'],
        });

        /** MAKE GRPC_REQUEST [SET_CAR] **/
        const requestGRPC = new SetCarRequest();
        requestGRPC.setCar(carSchema);

        grpcCarClient.setCar(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [SET_CAR] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [SET_CAR] **/
                responseApi.json({
                    id: grpcResponse.getId(),
                });
            }
        });
    } catch (error) {
        const errorResponse = errorsHandler(error);

        responseApi.status(errorResponse.http_code).json(errorResponse);
    }
}
