import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';
import { Client } from '../../../../interface/client.interface';
import { JoiSchema } from '../../../../interface/joi';

type ClientSchema = Omit<Client, 'id'>;

const CLIENT_SCHEMA: JoiSchema<ClientSchema> = {
    name: Joi.string().pattern(RegExpPatterns.name),
    type: Joi.string().pattern(RegExpPatterns.clientType),
    taxNumber: Joi.string().pattern(RegExpPatterns.name),
    phone: Joi.string().pattern(RegExpPatterns.phone),
    email: Joi.string().email({ minDomainSegments: 2 }),
    gender: Joi.string().pattern(RegExpPatterns.gender),
    street: Joi.string().pattern(RegExpPatterns.name),
    city: Joi.string().pattern(RegExpPatterns.name),
    zipCode: Joi.string().pattern(RegExpPatterns.zipCode),
};

const findClientsFilterSchema: JoiSchema<Client> = {
    ...CLIENT_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId),
};

const setClientSchema: JoiSchema<ClientSchema> = {
    ...CLIENT_SCHEMA,
    name: CLIENT_SCHEMA.name.required(),
    phone: CLIENT_SCHEMA.phone.required(),
};

const updateClientSchema: JoiSchema<Client> = {
    ...CLIENT_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId).required(),
};

/** EXPORTS VALIDATORS **/

export const FindClientsFilter = findClientsFilterSchema;

export const SetClientValidator = Joi.object(setClientSchema);

export const UpdateClientValidator = Joi.object(updateClientSchema);
