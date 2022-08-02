import Joi from 'joi';

export type JoiSchema<Type> = {
    [Property in keyof Type]: Joi.StringSchema | Joi.NumberSchema;
};
