import * as grpc from '@grpc/grpc-js';
import {
    isNextPage,
    MongoDb,
    prepareFindFilter,
    prepareFindOptions,
} from '../../../../middleware/Mongodb/mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Vehicle } from '../../../../interface/vehicle-interface';
import { FindVehicleFilterValidator } from '../models/vehicle.joi-schema';
import {
    GetAllVehiclesRequest,
    GetAllVehiclesResponse,
    VehicleEngineSchema,
    VehicleSchema,
} from '../../../../grpc/Vehicle/Vehicle_pb';

type Call = grpc.ServerUnaryCall<GetAllVehiclesRequest, GetAllVehiclesResponse>;
type Callback = grpc.sendUnaryData<GetAllVehiclesResponse>;

export const getAllVehicles = (mongodb: MongoDb<Vehicle>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /**  PREPARE DATA FROM GRPC **/
            const where = request.hasWhere() ? JSON.parse(request.getWhere()) : {};
            const preparedWhere = await prepareFindFilter<Vehicle>(
                FindVehicleFilterValidator(),
                where
            );

            const preparedFindOptions = prepareFindOptions({
                per_page: +request.getPerPage(),
                page: +request.getPage(),
                sort: request.getSort(),
                orderby: request.getOrderby(),
            });


            /** GET ALL VEHICLES FROM DATABASE **/
            const countVehiclesQuery = mongodb.collection.countDocuments(preparedWhere);
            const getVehiclesQuery = mongodb.collection
                .find(preparedWhere, preparedFindOptions.findOptions)
                .toArray();

            const [countVehicles, vehiclesArray] = await Promise.all([
                countVehiclesQuery,
                getVehiclesQuery,
            ]);
            const _isNextPage = isNextPage(
                preparedFindOptions.findOptions.limit,
                preparedFindOptions.query.page,
                +countVehicles
            );

            /** SUCCESS RESPONSE GRPC [GET_ALL_VEHICLES]  */
            const responseGRPC = new GetAllVehiclesResponse();

            responseGRPC.setCount(+countVehicles);
            responseGRPC.setPage(+preparedFindOptions.query.page || 0);
            responseGRPC.setPerPage(+preparedFindOptions.query.per_page || 0);
            responseGRPC.setSort(preparedFindOptions.query.sort);
            responseGRPC.setIsNextPage(_isNextPage);

            vehiclesArray.forEach((vehicle): void => {
                if ('_id' in vehicle) {
                    vehicle.id = vehicle._id.toString();
                }

                const vehicleSchema = fromJsonToGrpc<VehicleSchema, Vehicle>(
                    new VehicleSchema(),
                    vehicle,
                    {
                        excludeKeys: ['engine'],
                    }
                );

                if (vehicle.engine) {
                    const vehicleEngine = fromJsonToGrpc<VehicleEngineSchema, Vehicle>(
                        new VehicleEngineSchema(),
                        vehicle.engine
                    );
                    vehicleSchema.setEngine(vehicleEngine);
                }

                responseGRPC.addVehicles(vehicleSchema);
            });

            callback(null, responseGRPC);
            //
        } catch (e) {
            console.log(e);
            /** SEND RESPONSE_ERROR [GET_ALL_VEHICLES] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
