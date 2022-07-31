import Joi from 'joi';
import { setUser } from './service/setUser';

// TODO password / street
const userSchema = {
    firstname: Joi.string().pattern(/^[a-z0-9 \-\p{L}\p{N}]*$/iu),
    lastname: Joi.string().pattern(/^[a-z0-9 \-\p{L}\p{N}]*$/iu),
    email: Joi.string().email({ minDomainSegments: 2 }),
    role: Joi.string().pattern(/^[a-z-]*$/u),
    password: Joi.string().min(8),
    status: Joi.string(),
    gender: Joi.string().valid(0, 1, 2, 3),
    phone: Joi.string().pattern(/^[0-9 ()+\-\p{N}]*$/iu),
    street: Joi.string().pattern(/^[0-9 ()+\-\p{N}]*$/iu),
    city: Joi.string().pattern(/^[0-9 ()+\-\p{N}]*$/iu),
    zipCode: Joi.string().pattern(/^[0-9-]*$/iu),
    country: Joi.string()
        .uppercase()
        .pattern(/^[A-Z]*$/u)
        .min(3)
        .max(3),
    birthday: Joi.date(),
};

const setUserSchema = {
    ...userSchema,
    firstname: userSchema.firstname.required(),
    email: userSchema.email.required(),
    role: userSchema.role.required(),
    password: userSchema.password.required(),
    status: userSchema.status.required(),
    gender: userSchema.gender.required(),
    sendEmail: Joi.boolean(),
};

const updateUserSchema = {
    ...userSchema,
    id: Joi.number().integer().required(),
};

export const SetUserValidator = Joi.object(setUserSchema);

export const UpdateUserValidator = Joi.object(updateUserSchema);
