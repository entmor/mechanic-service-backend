import Joi from 'joi';
import { Car } from '../../../../interface/car';
import { JoiSchema } from '../../../../interface/joi';
import { RegExpPatterns } from '../../../../helpers/validate';

type CarSchema = Omit<Car, 'id'>;

const dateYear = new Date().getFullYear();

const CAR_SCHEMA: JoiSchema<CarSchema> = {
    plate: Joi.string().pattern(RegExpPatterns.plate),
    mark: Joi.string().pattern(RegExpPatterns.name),
    model: Joi.string().pattern(RegExpPatterns.name),
    vin: Joi.string().pattern(RegExpPatterns.vin),
    year: Joi.number().min(1886).max(dateYear),
    client_id: Joi.string().pattern(RegExpPatterns.mongoId),
};

const setCarSchema: JoiSchema<CarSchema> = {
    ...CAR_SCHEMA,
    plate: CAR_SCHEMA.plate.required(),
    mark: CAR_SCHEMA.mark.required(),
    model: CAR_SCHEMA.model.required(),
    vin: CAR_SCHEMA.vin.required(),
    year: CAR_SCHEMA.year.required(),
    client_id: CAR_SCHEMA.client_id.required(),
};

const updatedCarSchema: JoiSchema<Car> = {
    ...CAR_SCHEMA,
    id: Joi.string().required(),
};

export const SetCarValidator = Joi.object(setCarSchema);

export const UpdateCarValidator = Joi.object(updatedCarSchema);
