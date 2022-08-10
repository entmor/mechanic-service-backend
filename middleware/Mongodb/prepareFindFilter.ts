import { JoiSchemaList, JoiSchema } from '../../interface/joi';
import { status } from '@grpc/grpc-js';

const COMPARISON_OPERATORS = ['$gt', '$gte', '$lt', '$lte'] as const;

type ComparisonOperators<Type> = {
    [K in typeof COMPARISON_OPERATORS[number]]?: Type;
};

type FilterObject<Type> = {
    [Property in keyof Type]: Type[Property] | ComparisonOperators<Type[Property]>;
};

export const prepareFindFilter = async <T>(
    validators: JoiSchema<T> & { [key: string]: JoiSchemaList },
    filter: Partial<FilterObject<T>>
) => {
    const preparedFilter: { [key: string]: any } = {};

    for (const [key, _value] of Object.entries<any>(filter)) {
        if (Object.hasOwn(validators, key)) {
            /** CHECK VALUE **/
            if (_value && typeof _value !== 'object') {
                const { error, value } = validators[key].validate(_value);

                if (error) return Promise.reject(onErrorPreparedFindFilter(`${key}: ${error}`));
                preparedFilter[key] = value;
            }

            /** IF COMPARISON_OPERATORS CHECK **/
            if (typeof _value === 'object') {
                preparedFilter[key] = {};

                for (const operator of COMPARISON_OPERATORS) {
                    if (Object.hasOwn(_value, operator)) {
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
