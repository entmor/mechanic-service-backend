import { Router, Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const URL_MONGO = process.env.MONGO_URL;

const routes = Router();

routes.get('/restart-db', async (req: Request, res: Response) => {
    const client = new MongoClient(URL_MONGO);

    try {
        const db = await client.connect();
        console.log('mongo connecton');

        const users = await db.db().collection('users');

        /** CLEAR AND ADD USERS **/
        await users.deleteMany({});
        await users.insertOne({
            email: 'sstx.enter@gmail.com',
            password:
                '49d97aac3600d3682ea9dadf774f6a508c2bb02eca4d28bd651cb198afe60482503cf3463b5da34efaf556089aff5a65a12c464da9e92d6399f65075335ecbc9',
            salt: 'e9f91ba61d85949ecc4788a3914d8e6390694af49410ea3a6b798f81952c33a5',
            role: 'admin',
            status: 'active',
        });

    } catch (e) {
        res.status(500).json({
            message: 'connection error',
        });
    }
});

export default routes;
