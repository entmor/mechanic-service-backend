import { status } from '@grpc/grpc-js';
import { Collection, Db, MongoClient } from 'mongodb';
import { prepareFindFilter } from './lib/prepareFindFilter';
import { prepareFindOptions } from './lib/prepareFindOptions';
import { isDeleted, isUpdated, isFound } from './lib/checkResponse';

export class MongoDb<TCollection> {
    private client: MongoClient;
    private db: Db;
    collection: Collection<TCollection>;

    private dbName: string;
    private collectionName: string;
    private url_mongo = process.env.MONGO_URL;

    constructor(collection?: string) {
        this.dbName = process.env.MONGO_DB;
        this.collectionName = collection || process.env.MONGO_COLLECTION;
    }

    async connection(): Promise<MongoDb<TCollection>> {
        this.client = new MongoClient(this.url_mongo);

        try {
            await this.client.connect();
            console.log('mongo connecton');
        } catch (e) {
            console.log(e);
        }

        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection<TCollection>(this.collectionName);

        return this;
    }
}

export const isNextPage = (per_page: number, page: number, count: number): boolean => {
    return per_page * page < count ? true : false;
};

export { prepareFindFilter, prepareFindOptions, isDeleted, isUpdated, isFound };
