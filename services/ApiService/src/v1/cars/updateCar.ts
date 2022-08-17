import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Car } from '../../../../../interface/car';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import { CarSchema, UpdateCarRequest } from '../../../../../grpc/Car/Car_pb';
import { grpcCarClient } from '../../grpcClients';

type OmittedCar = Omit<Car, 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedCar>;
type ResponseApi = Response<{ updated: boolean } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
        /** PREPARE DATE FOR GRPC_REQUEST [UPDATE_CAR] **/
        const carSchema = fromJsonToGrpc<CarSchema, Car>(new CarSchema(), body, {
            excludeKeys: ['createdAt', 'updatedAt'],
        });

        /** MAKE GRPC_REQUEST [UPDATE_CAR] **/
        const requestGRPC = new UpdateCarRequest();
        requestGRPC.setCar(carSchema);

        grpcCarClient.updateCar(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [UPDATE_CAR] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [UPDATE_CAR] **/
                responseApi.json({
                    updated: grpcResponse.getUpdated(),
                });
            }
        });
    } catch (error) {
        const errorResponse = errorsHandler(error);

        responseApi.status(errorResponse.http_code).json(errorResponse);
    }
}
