import express, { NextFunction, Request, Response } from 'express';

import getUser from './user/getUser';
import setUser from './user/setUser';
import getAllUsers from './user/getAllUsers';
import deleteUser from './user/deleteUser';

import getAuth from './auth/setAuth';
import { authenticator } from '../middleware/authenticator';

import getCar from './cars/getCar';
import deleteCar from './cars/deleteCar';
import setCar from './cars/setCar';
import updateCar from './cars/updateCar';
import getAllCars from './cars/getAllCars';

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

routes.get('/car/all', getAllCars);
routes.get('/car', getAllCars);
routes.get('/car/:id', [getCar]);
routes.post('/car', [setCar]);
routes.put('/car', [updateCar]);
routes.delete('/car/:id', [deleteCar]);

routes.get('/client/all', getAllClients);
routes.get('/client', getAllClients);
routes.get('/client/:id', getClient);
routes.post('/client', setClient);
routes.put('/client', updateClient);
routes.delete('/client/:id', deleteClient);

routes.post('/auth', getAuth);

export default routes;
