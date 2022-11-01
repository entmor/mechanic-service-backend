import Joi from 'joi';

export type JoiSchemaList =
    | Joi.StringSchema
    | Joi.NumberSchema
    | Joi.BooleanSchema
    | Joi.AlternativesSchema
    | Joi.ObjectSchema
    | Joi.ArraySchema;

export type JoiSchema<Type> = {
    [Property in keyof Type]: JoiSchemaList;
};
