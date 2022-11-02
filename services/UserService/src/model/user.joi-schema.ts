import Joi from 'joi';
import { JoiSchema } from '../../../../interface/joi.interface';
import { User } from '../../../../interface/user.interface';
import { RegExpPatterns } from '../../../../helpers/validate';

const USER_SCHEMA = {
    firstname: Joi.string().pattern(/^[a-z0-9 \-\p{L}\p{N}]*$/iu),
    lastname: Joi.string().pattern(/^[a-z0-9 \-\p{L}\p{N}]*$/iu),
    email: Joi.string().email({ minDomainSegments: 2 }),
    role: Joi.string().pattern(/^[a-z-]*$/u),
    password: Joi.string().min(8),
    status: Joi.string().pattern(/^[a-z-]*$/u),
};

const findUsersFilterSchema: JoiSchema<User> = {
    ...USER_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId),
    createdAt: Joi.string().pattern(RegExpPatterns.number),
    updatedAt: Joi.string().pattern(RegExpPatterns.number),
};

const setUserSchema = {
    ...USER_SCHEMA,
    firstname: USER_SCHEMA.firstname.required(),
    email: USER_SCHEMA.email.required(),
    role: USER_SCHEMA.role.required(),
    password: USER_SCHEMA.password.required(),
    status: USER_SCHEMA.status.required(),
    sendEmail: Joi.boolean(),
};

const updateUserSchema = {
    ...USER_SCHEMA,
    id: Joi.string().pattern(RegExpPatterns.mongoId),
};
/** EXPORTS VALIDATORS **/

export const FindUsersFilter = findUsersFilterSchema;

export const SetUserValidator = Joi.object(setUserSchema);

export const UpdateUserValidator = Joi.object(updateUserSchema);
