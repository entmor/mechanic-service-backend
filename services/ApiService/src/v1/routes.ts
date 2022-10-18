import express, { NextFunction, Request, Response } from 'express';

import getUser from './user/getUser';
import setUser from './user/setUser';
import getAllUsers from './user/getAllUsers';
import deleteUser from './user/deleteUser';

import setAuth from './auth/setAuth';
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
import getRepair from './repair/getRepair';
import setRepair from './repair/setRepair';
import updateRepair from './repair/updateRepair';
import deleteRepair from './repair/deleteRepair';
import getAllRepairs from './repair/getAllRepairs';
import getAuth from './auth/getAuth';
import updateUser from './user/updateUser';
import { isActive } from '../middleware/isActive';
import { isAdministrator } from '../middleware/isAdministrator';

const authUserType = (req: Request, res: Response, next: NextFunction) => {
    res.locals.type = 'user';
    next();
};

const routes = express.Router();

routes.post('/user', authUserType, authenticator, isActive, isAdministrator, setUser); //authUserType, authenticator,
routes.delete('/user/:id', authUserType, authenticator, isActive, isAdministrator, deleteUser);
routes.put('/user', authUserType, authenticator, isActive, isAdministrator, updateUser); //authUserType, authenticator,
routes.get('/user/all', authUserType, authenticator, isActive, isAdministrator, getAllUsers);
routes.get('/user/:id', authUserType, authenticator, isActive, isAdministrator, getUser);

routes.post('/user/auth', authUserType, setAuth);

routes.get('/vehicle/all', authUserType, authenticator, isActive, getAllVehicles);
routes.get('/vehicle', authUserType, authenticator, isActive, getAllVehicles);
routes.get('/vehicle/:id', authUserType, authenticator, isActive, getVehicle);
routes.post('/vehicle', authUserType, authenticator, isActive, setVehicle);
routes.put('/vehicle', authUserType, authenticator, isActive, updateVehicle);
routes.delete('/vehicle/:id', authUserType, authenticator, isActive, deleteVehicle);

routes.get('/client/all', authUserType, authenticator, isActive, getAllClients);
routes.get('/client', authUserType, authenticator, isActive, getAllClients);
routes.get('/client/:id', authUserType, authenticator, isActive, getClient);
routes.post('/client', authUserType, authenticator, isActive, setClient);
routes.put('/client', authUserType, authenticator, isActive, updateClient);
routes.delete('/client/:id', authUserType, authenticator, isActive, deleteClient);

routes.get('/repair/all', authUserType, authenticator, isActive, getAllRepairs);
routes.get('/repair', authUserType, authenticator, isActive, getAllRepairs);
routes.get('/repair/:id', authUserType, authenticator, isActive, getRepair);
routes.post('/repair', authUserType, authenticator, isActive, setRepair);
routes.put('/repair', authUserType, authenticator, isActive, updateRepair);
routes.delete('/repair/:id', authUserType, authenticator, isActive, deleteRepair);

routes.post('/auth', setAuth);
routes.get('/auth', getAuth);

export default routes;
