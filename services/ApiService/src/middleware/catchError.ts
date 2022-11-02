import { Response } from 'express';
import { errorsHandler } from '../errors';
import { status } from '@grpc/grpc-js';
import { Logger } from '../../../../middleware/Logger/logger';

const logger = new Logger('api-service');

export function catchErrorAndResponse(error: any, responseApi: Response, message = '') {
    /** ERROR GRPC_REQUEST HANDLER [GET_AUTH] **/
    if (error !== null) {
        const errorResponse = errorsHandler(error);
        responseApi.status(errorResponse.http_code).json(errorResponse);
    } else {
        logger.log('error', `empty error catchErrorAndResponse ${message}`);

        responseApi.status(500).json({
            code: status.INTERNAL,
            http_code: 500,
            message: 'Server ERROR',
        });
    }
}
