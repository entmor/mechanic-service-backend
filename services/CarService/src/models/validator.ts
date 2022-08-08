import Joi from 'joi';
import { Car } from '../../../../interface/car';
import { JoiSchema } from '../../../../interface/joi';
import { RegExpPatterns } from '../../../../helpers/validate';

type CarSchema = Omit<Car, 'id'>;

const CAR_SCHEMA: JoiSchema<CarSchema> = {
    plate: Joi.string().pattern(RegExpPatterns.plate),
    mark: Joi.string().pattern(RegExpPatterns.name),
    model: Joi.string().pattern(RegExpPatterns.name),
    vin: Joi.string().pattern(RegExpPatterns.vin),
    year: Joi.number().min(1886),
    clientId: Joi.string().pattern(RegExpPatterns.mongoId),
};

const findFilterSchema: JoiSchema<Car> = {
    ...CAR_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId),
};

const setCarSchema: JoiSchema<CarSchema> = {
    ...CAR_SCHEMA,
    plate: CAR_SCHEMA.plate.required(),
    mark: CAR_SCHEMA.mark.required(),
    model: CAR_SCHEMA.model.required(),
    vin: CAR_SCHEMA.vin.required(),
    year: CAR_SCHEMA.year.required(),
    clientId: CAR_SCHEMA.clientId.required(),
};

const updatedCarSchema: JoiSchema<Car> = {
    ...CAR_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId).required(),
};

/** EXPORTS VALIDATORS **/

export const FindFilterValidator = (): JoiSchema<Car> => {
    const dateYear = new Date().getFullYear();
    findFilterSchema.year.max(dateYear);

    return findFilterSchema;
};

export const SetCarValidator = (): Joi.ObjectSchema<CarSchema> => {
    const dateYear = new Date().getFullYear();
    setCarSchema.year.max(dateYear);

    return Joi.object(setCarSchema);
};

export const UpdateCarValidator = (): Joi.ObjectSchema<Car> => {
    const dateYear = new Date().getFullYear();
    updatedCarSchema.year.max(dateYear);

    return Joi.object(updatedCarSchema);
};
