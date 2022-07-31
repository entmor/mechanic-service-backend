import { ServiceError } from '@grpc/grpc-js';

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
                ...error,
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
                ...error,
                http_code: 500,
            };
    }

    return apiResponse;
};
