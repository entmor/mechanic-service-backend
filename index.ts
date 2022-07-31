import { MongoDb } from './middleware/Mongodb';

const db = new MongoDb('testowe', 'test');

async function main() {
    await db.connection();

    const instert = await db.collection.insertOne({
        dupa: 'di',
        created_date: Date.now(),
        updated_date: Date.now(),
    });

    setTimeout(async () => {
        await db.collection.updateOne(
            {
                _id: instert.insertedId,
            },
            {
                $set: { dupa: 'jasiu' },
                $currentDate: { updated_date: { $type: 'timestamp' } },
            }
        );
        const adasd = await db.collection.findOne({
            _id: instert.insertedId,
        });
        // @ts-ignore
        console.log(adasd.updated_date);
    }, 5000);
}

main();
