import { Collection, Db, MongoClient } from 'mongodb';

export class MongoDb {
    private client: MongoClient;
    private db: Db;
    collection: Collection;

    private dbName: string;
    private collectionName: string;
    private url_mongo = 'mongodb://root:example@localhost:27018';

    constructor(dbName: string, collection: string) {
        this.dbName = dbName;
        this.collectionName = collection;
    }

    async connection(): Promise<MongoDb> {
        this.client = new MongoClient(this.url_mongo);

        try {
            await this.client.connect();
        } catch (e) {
            console.log(e);
        }

        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection(this.collectionName);

        return this;
    }
}
