import Joi from 'joi';
import { RegExpPatterns } from '../../../../helpers/validate';

const setLoginSchema = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).required(),
    // type: Joi.string().valid('user', 'client').required(),
};

const getLoginSchema = {
    token: Joi.string().regex(RegExpPatterns.jwt).required(),
};

const deleteAuthByIdSchema = {
    id: Joi.string().regex(RegExpPatterns.mongoId).required(),
};

export const SetLoginValidator = Joi.object(setLoginSchema);

export const GetLoginValidator = Joi.object(getLoginSchema);

export const DeleteLoginValidator = Joi.object(getLoginSchema);

export const DeleteAuthByIdValidator = Joi.object(deleteAuthByIdSchema);
