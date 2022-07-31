import Joi from 'joi';
import { removeEmptyProperties } from './object';

interface Option {
    removeId?: boolean;
    removeEmptyProperties?: boolean;
}

const defaultOption: Option = {
    removeId: false,
    removeEmptyProperties: false,
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
            code: 3,
            message: error.message,
        });
    }

    // RESOLVE PROMISE
    return value;
};
