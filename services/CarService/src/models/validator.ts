import Joi from 'joi';
import { Car } from '../../../../interface/car';
import { JoiSchema } from '../../../../interface/joi';

type CarSchema = Omit<Car, 'id'>;

const CAR_SCHEMA: JoiSchema<CarSchema> = {
    plate: Joi.string(),
    mark: Joi.string(),
    model: Joi.string(),
    vin: Joi.string(),
    year: Joi.number().min(1860).max(2022),
    client_id: Joi.string(),
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
