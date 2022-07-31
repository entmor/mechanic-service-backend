import express, { NextFunction, Request, Response } from 'express';

import getUser from './user/getUser';
import setUser from './user/setUser';
import getAllUsers from './user/getAllUsers';
import deleteUser from './user/deleteUser';

import getAuth from './auth/setAuth';
import { authenticator } from '../middleware/authenticator';

const authUserType = (req: Request, res: Response, next: NextFunction) => {
    res.locals.type = 'user';
    next();
};

const routes = express.Router();

routes.post('/user', [setUser]); //authUserType, authenticator,
routes.delete('/user/:id', deleteUser);
routes.get('/user/all', getAllUsers);
routes.get('/user/:id', [authUserType, authenticator, getUser]);

routes.post('/user/auth', [authUserType, getAuth]);

routes.post('/auth', getAuth);

export default routes;
