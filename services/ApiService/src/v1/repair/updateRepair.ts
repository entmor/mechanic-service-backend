import { Request, Response } from 'express';
import { ApiResponse, errorsHandler } from '../../errors';
import { Repair } from '../../../../../interface/repair.interface';
import { fromJsonToGrpc } from '../../../../../helpers/grpc';
import {
    RepairPartSchema,
    RepairSchema,
    UpdateRepairRequest,
} from '../../../../../grpc/Repair/Repair_pb';
import { grpcRepairClient } from '../../../../grpcClients';

type OmittedRepair = Omit<Repair, 'createdAt' | 'updatedAt'>;

type RequestApi = Request<any, any, OmittedRepair>;
type ResponseApi = Response<{ updated: boolean } | ApiResponse>;

export default function ({ body }: RequestApi, responseApi: ResponseApi) {
    try {
        /** PREPARE DATE FOR GRPC_REQUEST [UPDATE_REPAIR] **/
        const repairSchema = fromJsonToGrpc<RepairSchema, Repair>(new RepairSchema(), body, {
            excludeKeys: ['createdAt', 'updatedAt', 'partsList'],
        });

        if (body.partsList) {
            body.partsList.forEach((value) => {
                const part = fromJsonToGrpc<RepairPartSchema, Repair>(
                    new RepairPartSchema(),
                    value
                );

                repairSchema.addParts(part);
            });
        }

        const requestGRPC = new UpdateRepairRequest();
        requestGRPC.setRepair(repairSchema);

        grpcRepairClient.updateRepair(requestGRPC, (error, grpcResponse): void => {
            if (error) {
                console.log(error);
                /** ERROR GRPC_REQUEST HANDLER [UPDATE_REPAIR] **/
                const errorResponse = errorsHandler(error);

                responseApi.status(errorResponse.http_code).json(errorResponse);
            } else {
                /** SUCCESS GRPC_REQUEST HANDLER [UPDATE_REPAIR] **/
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
