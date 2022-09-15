import express, { NextFunction, Request, Response } from 'express';

import getUser from './user/getUser';
import setUser from './user/setUser';
import getAllUsers from './user/getAllUsers';
import deleteUser from './user/deleteUser';

import getAuth from './auth/setAuth';
import { authenticator } from '../middleware/authenticator';

import getVehicle from './vehicle/getVehicle';
import deleteVehicle from './vehicle/deleteVehicle';
import setVehicle from './vehicle/setVehicle';
import updateVehicle from './vehicle/updateVehicle';
import getAllVehicles from './vehicle/getAllVehicles';

import getAllClients from './clients/getAllClients';
import getClient from './clients/getClient';
import setClient from './clients/setClient';
import updateClient from './clients/updateClient';
import deleteClient from './clients/deleteClient';

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

routes.get('/vehicle/all', getAllVehicles);
routes.get('/vehicle', getAllVehicles);
routes.get('/vehicle/:id', getVehicle);
routes.post('/vehicle', setVehicle);
routes.put('/vehicle', updateVehicle);
routes.delete('/vehicle/:id', deleteVehicle);

routes.get('/client/all', getAllClients);
routes.get('/client', getAllClients);
routes.get('/client/:id', getClient);
routes.post('/client', setClient);
routes.put('/client', updateClient);
routes.delete('/client/:id', deleteClient);

routes.post('/auth', getAuth);

export default routes;
