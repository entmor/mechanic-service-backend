import { Router, Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { usersData, clientsData } from './data';

const URL_MONGO = process.env.MONGO_URL;

const routes = Router();

routes.get('/restart-db', async (req: Request, res: Response) => {
    const client = new MongoClient(URL_MONGO);

    try {
        const db = await client.connect();
        const _db = await db.db(process.env.MONGO_DB);
        console.log('mongo connecton');

        const users = await _db.collection('users');
        const clients = await _db.collection('clients');

        /** CLEAR AND ADD USERS **/
        await users.deleteMany({});
        await users.insertOne(usersData);

        await clients.deleteMany({});
        await clients.insertMany(clientsData);

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
