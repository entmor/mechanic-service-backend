import { NextFunction, Request, Response } from 'express';
import { User } from '../../../../interface/user.interface';

type ResponseApi = Response<
    unknown,
    { user: User; token: string; type: string; authMetadata: any }
>;

export function isAdministrator(request: Request, response: ResponseApi, next: NextFunction) {
    if (response.locals.user.role !== 'admin') {
        response.status(403).json({
            code: 403,
            message: 'User inactive',
        });
    } else {
        next();
    }
}