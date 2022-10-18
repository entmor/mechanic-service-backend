import * as grpc from '@grpc/grpc-js';
import {
    isNextPage,
    MongoDb,
    prepareFindFilter,
    prepareFindOptions,
} from '../../../../middleware/Mongodb/mongodb';
import {
    GetAllRepairsRequest,
    GetAllRepairsResponse,
    RepairCostsSchema,
    RepairPartSchema,
    RepairSchema,
} from '../../../../grpc/Repair/Repair_pb';
import { FindRepairFilterValidator } from '../models/repair.joi-schema';
import { Repair } from '../../../../interface/repair.interface';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { grpcVehicleClient } from '../../../grpcClients';
import { GetAllVehiclesRequest, GetVehicleRequest } from '../../../../grpc/Vehicle/Vehicle_pb';
import { VehicleSchema } from '../../../../grpc/Schema/VehicleSchema_pb';
import {getVehicle} from "../middleware/getVehicle";

type Call = grpc.ServerUnaryCall<GetAllRepairsRequest, GetAllRepairsResponse>;
type Callback = grpc.sendUnaryData<GetAllRepairsResponse>;

export const getAllRepairs = (mongodb: MongoDb<Repair>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**  PREPARE DATA FROM GRPC **/
            const where = request.hasWhere() ? JSON.parse(request.getWhere()) : {};
            const preparedWhere = await prepareFindFilter<Repair>(FindRepairFilterValidator, where);

            const preparedFindOptions = prepareFindOptions({
                per_page: +request.getPerPage(),
                page: +request.getPage(),
                sort: request.getSort(),
                orderby: request.getOrderby(),
            });

            if (preparedWhere.clientId) {
                const vehiclesIds = await getAllVehicleIdsByClientId(preparedWhere.clientId);
                if (vehiclesIds.length > 0) {
                    preparedWhere['vehicleId'] = { $in: vehiclesIds };
                } else {
                    preparedWhere['vehicleId'] = 'noFound';
                }
                delete preparedWhere.clientId;
            }

            /** GET ALL REPAIRS FROM DATABASE **/
            const countRepairsQuery = mongodb.collection.countDocuments(preparedWhere);
            const getRepairsQuery = mongodb.collection
                .find(preparedWhere, preparedFindOptions.findOptions)
                .toArray();

            const [countRepairs, repairsArray] = await Promise.all([
                countRepairsQuery,
                getRepairsQuery,
            ]);

            console.log(repairsArray);

            const _isNextPage = isNextPage(
                preparedFindOptions.findOptions.limit,
                preparedFindOptions.query.page,
                +countRepairs
            );

            /** SUCCESS RESPONSE GRPC [GET_ALL_REPAIRS]  */
            const responseGRPC = new GetAllRepairsResponse();

            responseGRPC.setCount(+countRepairs);
            responseGRPC.setPage(+preparedFindOptions.query.page || 0);
            responseGRPC.setPerPage(+preparedFindOptions.query.per_page || 0);
            responseGRPC.setSort(preparedFindOptions.query.sort);
            responseGRPC.setIsNextPage(_isNextPage);

            await Promise.all(
                repairsArray.map(async (repair): Promise<Repair> => {
                    if ('_id' in repair) {
                        repair.id = repair._id.toString();
                    }

                    const repairSchema = fromJsonToGrpc<RepairSchema, Repair>(
                        new RepairSchema(),
                        repair,
                        { excludeKeys: ['partsList', 'costs'] }
                    );

                    if (repair.costs) {
                        const repairCosts = fromJsonToGrpc<RepairCostsSchema, Repair>(
                            new RepairCostsSchema(),
                            repair.costs
                        );

                        repairSchema.setCosts(repairCosts);
                    }

                    if (repair.partsList.length > 0) {
                        repair.partsList.forEach((part) => {
                            const _part = fromJsonToGrpc<RepairPartSchema, Repair>(
                                new RepairPartSchema(),
                                part
                            );

                            repairSchema.addParts(_part);
                        });
                    }

                    /** GET VEHICLE DATA **/
                    const vehicleData = (await getVehicle(repair.vehicleId)) as VehicleSchema;

                    repairSchema.setVehicle(vehicleData);
                    responseGRPC.addRepairs(repairSchema);

                    return repair;
                })
            );

            //
            callback(null, responseGRPC);
        } catch (e) {
            console.log(e);
            /** SEND RESPONSE_ERROR [GET_ALL_REPAIRS] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};

function getAllVehicleIdsByClientId(
    id: string,
    message = 'getAllVehicleByClientIdError'
): Promise<string[]> {
    return new Promise((resolve, reject) => {
        try {
            const where = JSON.stringify({ clientId: id });
            const requestGRPCVehicle = new GetAllVehiclesRequest();
            requestGRPCVehicle.setWhere(where);

            grpcVehicleClient.getAllVehicles(requestGRPCVehicle, (error, vehicles) => {
                if (error) reject(error);
                if (vehicles) {
                    const vehiclesList = vehicles.toObject().vehiclesList;
                    if (vehiclesList.length > 0) {
                        const arrayIds = vehiclesList.map((value) => value.id);
                        resolve(arrayIds);
                    } else {
                        resolve([]);
                    }
                }
            });
        } catch (e) {
            reject({
                code: grpc.status.INTERNAL,
                message: message,
            });
        }
    });
}
