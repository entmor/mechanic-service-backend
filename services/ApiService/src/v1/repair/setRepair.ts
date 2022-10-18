import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import {
    RepairPartSchema,
    RepairSchema,
    SetRepairRequest,
} from '../../../../../grpc/Repair/Repair_pb';
import { Repair } from '../../../../../interface/repair.interface';
import { grpcRepairClient } from '../../../../grpcClients';

type OmittedRepair = Omit<Repair, 'id' | 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedRepair>;
type ResponseApi = Response<{ id: string } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
        /** PREPARE DATE FOR GRPC_REQUEST [SET_REPAIR] **/
        const repairSchema = fromJsonToGrpc<RepairSchema, Repair>(new RepairSchema(), body, {
            excludeKeys: ['id', 'partsList', 'costs', 'createdAt', 'updatedAt'],
        });

        if (body.partsList) {
            body.partsList.forEach((value) => {
                const part = fromJsonToGrpc<RepairPartSchema, Repair>(
                    new RepairPartSchema(),
                    value,
                );

                repairSchema.addParts(part);
            });
        }

        /** MAKE GRPC_REQUEST [SET_REPAIR] **/
        const requestGRPC = new SetRepairRequest();
        requestGRPC.setRepair(repairSchema);

        grpcRepairClient.setRepair(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                /** ERROR GRPC_REQUEST HANDLER [SET_REPAIR] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [SET_REPAIR] **/
                responseApi.json({
                    id: grpcResponse.getId(),
                });
            }
        });
    } catch (error) {
        console.log(error);

        const errorResponse = errorsHandler(error);

        responseApi.status(errorResponse.http_code).json(errorResponse);
    }
}
