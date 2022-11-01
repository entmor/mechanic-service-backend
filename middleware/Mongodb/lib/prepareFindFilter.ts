import { JoiSchemaList, JoiSchema } from '../../../interface/joi.interface';
import { status } from '@grpc/grpc-js';
import { ObjectId } from 'mongodb';

export const COMPARISON_OPERATORS = ['$gt', '$gte', '$lt', '$lte'] as const;

export type ComparisonOperators<Type> = {
    [K in typeof COMPARISON_OPERATORS[number]]?: Type;
};

export type FilterObject<Type> = {
    [Property in keyof Type]: Type[Property] | ComparisonOperators<Type[Property]>;
};

export const prepareFindFilter = async <T>(
    validators: JoiSchema<T> & { [key: string]: JoiSchemaList },
    filter: Partial<FilterObject<T>>
) => {
    const preparedFilter: { [key: string]: any } = {};

    try {
        for (const [key, _value] of Object.entries<any>(filter)) {
            if (Object.hasOwn(validators, key)) {
                /** CHECK VALUE **/
                if (_value && typeof _value !== 'object') {
                    const _key = key === 'id' ? '_id' : key;

                    const { error, value } = validators[key].validate(_value);

                    if (error) return Promise.reject(onErrorPreparedFindFilter(`${key}: ${error}`));

                    preparedFilter[_key] = key === 'id' ? new ObjectId(String(value)) : value;
                }

                /** COMPARISON_OPERATORS CHECK **/
                if (typeof _value === 'object') {
                    if (Object.hasOwn(_value, '$find') && _value['$find'] !== '') {
                        const validated = await objectHandler<T>(
                            validators[key],
                            _value['$find'],
                            '$find'
                        );

                        preparedFilter[key] = {
                            $regex: new RegExp(`${validated}`, 'i'),
                        };
                    }

                    for (const operator of COMPARISON_OPERATORS) {
                        if (Object.hasOwn(_value, operator) && _value[operator] !== '') {
                            preparedFilter[key][operator] = await objectHandler<T>(
                                validators[key],
                                _value[operator],
                                operator
                            );
                        }
                    }
                }
            }
        }
        return preparedFilter;
    } catch (e) {
        return Promise.reject(onErrorPreparedFindFilter(e.message || ''));
    }
};

const objectHandler = async <T>(validator: JoiSchemaList, object: T, key: string) => {
    const { error, value } = validator.validate(object);

    if (error) return Promise.reject(onErrorPreparedFindFilter(`${key}: ${error}`));

    return value;
};

const onErrorPreparedFindFilter = (message = 'ERROR') => {
    return {
        code: status.NOT_FOUND,
        message: message,
    };
};
