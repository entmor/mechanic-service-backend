import { ServiceError } from '@grpc/grpc-js';

import { Logger } from '../../../middleware/Logger/logger';

const logger = new Logger();

export interface ApiResponse extends Partial<ServiceError> {
    http_code: number;
    payload?: object | string;
}

export const errorsHandler = (error: ServiceError) => {
    let apiResponse: ApiResponse;

    switch (error.code) {
        case 1:
        case 3:
            apiResponse = {
                ...error,
                http_code: 400,
            };
            break;
        case 4:
            apiResponse = {
                ...error,
                http_code: 504,
            };
            break;
        case 5:
            apiResponse = {
                ...error,
                http_code: 404,
            };
            break;
        case 6:
            apiResponse = {
                ...error,
                http_code: 409,
            };
            break;
        case 7:
            apiResponse = {
                ...error,
                http_code: 403,
            };
            break;
        case 14:
            apiResponse = {
                message: 'Server Error',
                //...error,
                http_code: 503,
            };
            break;
        case 16:
            apiResponse = {
                ...error,
                http_code: 401,
            };
            break;
        default:
            apiResponse = {
                message: 'Server Error',
                //...error,
                http_code: 500,
            };
    }

    const loggerLvl = apiResponse.http_code >= 500 ? 'error' : 'info';

    logger.log(loggerLvl, apiResponse.message);
    logger.log('debug', { error, apiResponse });

    return apiResponse;
};
