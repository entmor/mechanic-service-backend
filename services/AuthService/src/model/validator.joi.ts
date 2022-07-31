import Joi from 'joi';

const setLoginSchema = {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).required(),
    type: Joi.string().valid('user', 'client').required(),
};

const getLoginSchema = {
    token: Joi.string()
        .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/)
        .required(),
};

export const SetLoginValidator = Joi.object(setLoginSchema);
export const GetLoginValidator = Joi.object(getLoginSchema);
