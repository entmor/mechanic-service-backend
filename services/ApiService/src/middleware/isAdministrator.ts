import { NextFunction, Request, Response } from 'express';
import { User } from '../../../../interface/user.interface';
import { Logger } from '../../../../middleware/Logger/logger';

type ResponseApi = Response<
    unknown,
    { user: User; token: string; type: string; authMetadata: any }
>;

const logger = new Logger('api-service');

export function isAdministrator(request: Request, response: ResponseApi, next: NextFunction) {
    if (response.locals.user.role !== 'admin') {
        response.status(403).json({
            code: 403,
            message: 'User inactive',
        });

        /** LOGGER **/
        const logMessage = `User ${response.locals.user.id} has bad status [required active]`;
        logger.apiResponse(request, {
            code: response.statusCode,
            message: logMessage,
            rest: {
                user: response.locals.user,
                token: response.locals.token,
            },
        });
    } else {
        next();
    }
}
