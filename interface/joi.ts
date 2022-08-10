import Joi from 'joi';

export type JoiSchemaList = Joi.StringSchema | Joi.NumberSchema;

export type JoiSchema<Type> = {
    [Property in keyof Type]: JoiSchemaList;
};
