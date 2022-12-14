import { status } from '@grpc/grpc-js';
import Joi from 'joi';
import { removeEmptyProperties } from './object';

interface Option {
    removeId?: boolean;
    removeEmptyProperties?: boolean;
    excludeKeys?: Array<string>;
    removeZeroValueProperties?: Array<string>;
}

const defaultOption: Option = {
    removeId: false,
    removeEmptyProperties: false,
    excludeKeys: [],
    removeZeroValueProperties: [],
};

export const JoiValidator = async <T, TReturn>(
    validator: Joi.ObjectSchema,
    object: T | any,
    options?: Option
): Promise<TReturn> => {
    // SET OPTIONS
    options = {
        ...defaultOption,
        ...options,
    };

    let new_object: Partial<TReturn>;

    Object.entries(object).filter(([key, value]) => {
        if (
            options.excludeKeys.indexOf(key) >= 0 ||
            (options.removeZeroValueProperties.indexOf(key) >= 0 && value === 0)
        ) {
            delete object[key];
        }
    });

    // REMOVE PROPERTY ID FROM OBJECT
    if (options.removeId && typeof object.id !== undefined) {
        delete object.id;
    }

    // REMOVE EMPTY PROPERTIES
    if (options.removeEmptyProperties) {
        new_object = removeEmptyProperties(object);
    }

    // Joi VALIDATE
    const { error, value } = validator.validate(
        options.removeEmptyProperties ? new_object : object
    );

    if (error) {
        await Promise.reject({
            code: status.INVALID_ARGUMENT,
            message: error.message,
        });
    }

    // RESOLVE PROMISE
    return value;
};

interface Patterns {
    [key: string]: RegExp;
}

export const RegExpPatterns: Patterns = {
    mongoId: new RegExp(/^[a-fA-F0-9]{24}$/),
    plate: new RegExp(/^[- \p{L}\p{N}]*$/iu),
    number: new RegExp(/^[0-9]*$/iu),
    name: new RegExp(/^[-.,:=/\\() \p{L}\p{N}]*$/iu),
    vin: new RegExp(/^[0-9wertyupasdfghjklzxxcvbnmWERTYUPASDFGHJKLZXCVBNM]{17}$/iu),
    phone: new RegExp(/^[0-9 ()+\-\p{N}]*$/iu),
    gender: new RegExp(/^(male|female|divers)$/i),
    address: new RegExp(/^[-., /\\() \p{L}\p{N}]*$/iu),
    zipCode: new RegExp(/^[0-9- a-zA-Z]*$/iu),
    clientType: new RegExp(/^(personal|business)$/i),
    birthday: new RegExp(/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/i),
    yearPattern: new RegExp(/^\d{4}$/i),
    jwt: new RegExp(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/),
};
