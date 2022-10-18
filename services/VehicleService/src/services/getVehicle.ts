import * as grpc from '@grpc/grpc-js';
import { isFound, MongoDb } from '../../../../middleware/Mongodb/mongodb';
import { fromJsonToGrpc } from '../../../../helpers/grpc';
import { Vehicle } from '../../../../interface/vehicle.interface';
import { ObjectId } from 'mongodb';
import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { GetVehicleRequest, GetVehicleResponse } from '../../../../grpc/Vehicle/Vehicle_pb';
import { VehicleEngineSchema } from '../../../../grpc/Schema/VehicleEngineSchema_pb';
import { VehicleSchema } from '../../../../grpc/Schema/VehicleSchema_pb';

type Call = grpc.ServerUnaryCall<GetVehicleRequest, GetVehicleResponse>;
type Callback = grpc.sendUnaryData<GetVehicleResponse>;

export const getVehicle = (mongodb: MongoDb<Vehicle>) => {
    return async ({ request }: Call, callback: Callback): Promise<void> => {
        try {
            /** CHECK PARAMS FROM REQUEST **/
            const param_id = Joi.string()
                .required()
                .pattern(RegExpPatterns.mongoId)
                .validate(request.getId());

            if (param_id.error) {
                /** SEND RESPONSE_ERROR [GET_VEHICLE] **/
                callback({
                    code: grpc.status.INVALID_ARGUMENT,
                    message: param_id.error.message,
                });
            } else {
                /** GET VEHICLE FROM DATABASE **/
                const vehicleId = new ObjectId(request.getId());
                const vehicleObject = await isFound(await mongodb.collection.findOne(vehicleId));

                /** SUCCESS RESPONSE GRPC [GET_VEHICLE]  */
                if ('_id' in vehicleObject) {
                    vehicleObject.id = vehicleObject._id.toString();
                }

                const vehicleSchema = fromJsonToGrpc<VehicleSchema, Vehicle>(
                    new VehicleSchema(),
                    vehicleObject,
                    {
                        excludeKeys: ['engine'],
                    }
                );

                if (vehicleObject.engine) {
                    const vehicleEngine = fromJsonToGrpc<VehicleEngineSchema, Vehicle>(
                        new VehicleEngineSchema(),
                        vehicleObject.engine
                    );
                    vehicleSchema.setEngine(vehicleEngine);
                }

                const responseGRPC = new GetVehicleResponse();
                responseGRPC.setVehicle(vehicleSchema);

                callback(null, responseGRPC);
            }
        } catch (e) {
            /** SEND RESPONSE_ERROR [GET_VEHICLE] **/
            callback({
                code: e.code || grpc.status.INTERNAL,
                message: e.message || 'SERVER ERROR',
            });
        }
    };
};
