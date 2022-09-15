import Joi from 'joi';
import { Vehicle } from '../../../../interface/vehicle-interface';
import { JoiSchema } from '../../../../interface/joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { engineType, vehicleType } from '../config/vehicle.config';

type VehicleSchema = Omit<Vehicle, 'id'>;

const VEHICLE_SCHEMA: JoiSchema<VehicleSchema> = {
    type: Joi.number().valid(...vehicleType),
    plate: Joi.string().pattern(RegExpPatterns.plate),
    mark: Joi.string().pattern(RegExpPatterns.name),
    model: Joi.string().pattern(RegExpPatterns.name),
    vin: Joi.string().pattern(RegExpPatterns.vin),
    year: Joi.number().integer().min(1886),
    clientId: Joi.string().pattern(RegExpPatterns.mongoId),
    engine: Joi.object({
        engineSize: Joi.number(),
        enginePower: Joi.number().integer(),
        engineType: Joi.number().valid(...engineType),
    }),
};

const findVehicleFilterSchema: JoiSchema<Vehicle> = {
    ...VEHICLE_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId),
    createdAt: Joi.string().pattern(RegExpPatterns.number),
    updatedAt: Joi.string().pattern(RegExpPatterns.number),
};

const setVehicleSchema: JoiSchema<VehicleSchema> = {
    ...VEHICLE_SCHEMA,
    type: VEHICLE_SCHEMA.type.required(),
    plate: VEHICLE_SCHEMA.plate.when('type', { not: 'OTHER', then: Joi.required() }),
    mark: VEHICLE_SCHEMA.mark.when('type', { not: 'OTHER', then: Joi.required() }),
    model: VEHICLE_SCHEMA.model.when('type', { not: 'OTHER', then: Joi.required() }),
    vin: VEHICLE_SCHEMA.vin.when('type', { not: 'OTHER', then: Joi.required() }),
    year: VEHICLE_SCHEMA.year.when('type', { not: 'OTHER', then: Joi.required() }),
    clientId: VEHICLE_SCHEMA.clientId.required(),
    engine: VEHICLE_SCHEMA.engine.when('type', { not: 'OTHER', then: Joi.required() }),
};

const updatedVehicleSchema: JoiSchema<Vehicle> = {
    ...VEHICLE_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId).required(),
};

/** EXPORTS VALIDATORS **/

export const FindVehicleFilterValidator = (): JoiSchema<Vehicle> => {
    const dateYear = new Date().getFullYear();
    if ('max' in findVehicleFilterSchema.year) {
        findVehicleFilterSchema.year = findVehicleFilterSchema.year.max(dateYear);
    }

    return findVehicleFilterSchema;
};

export const SetVehicleValidator = (): Joi.ObjectSchema<VehicleSchema> => {
    const dateYear = new Date().getFullYear();
    if ('max' in setVehicleSchema.year) {
        setVehicleSchema.year = setVehicleSchema.year.max(dateYear);
    }

    return Joi.object(setVehicleSchema);
};

export const UpdateVehicleValidator = (): Joi.ObjectSchema<Vehicle> => {
    const dateYear = new Date().getFullYear();
    if ('max' in updatedVehicleSchema.year) {
        updatedVehicleSchema.year = updatedVehicleSchema.year.max(dateYear);
    }

    return Joi.object(updatedVehicleSchema);
};
