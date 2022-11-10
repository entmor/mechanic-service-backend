import { Router, Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { usersData, clientsData, vehiclesData, repairsData } from './data';

const URL_MONGO = process.env.MONGO_URL;

const routes = Router();

routes.get('/restart-db', async (req: Request, res: Response) => {
    const client = new MongoClient(URL_MONGO);

    try {
        const db = await client.connect();
        console.log('mongo connecton');

        const _db = await db.db(process.env.MONGO_DB);

        const users = await _db.collection('users');
        const clients = await _db.collection('clients');
        const vehicles = await _db.collection('vehicle');
        const repairs = await _db.collection('repair');

        /** CLEAR AND ADD USERS **/
        await users.deleteMany({});
        await users.insertMany(usersData);

        /** CLEAR AND ADD CLIENTS **/
        await clients.deleteMany({});
        await clients.insertMany(clientsData);

        /** CLEAR AND ADD VEHICLES **/
        await vehicles.deleteMany({});
        await vehicles.insertMany(vehiclesData);

        /** CLEAR AND ADD REPAIRS **/
        await repairs.deleteMany({});
        await repairs.insertMany(repairsData);

        await db.close();

        res.json({
            success: true,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'connection error',
        });
    }
});

export default routes;
