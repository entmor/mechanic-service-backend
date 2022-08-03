import { Collection, Db, MongoClient } from 'mongodb';
import { status } from '@grpc/grpc-js';
import { response } from 'express';

export class MongoDb<TCollection> {
    private client: MongoClient;
    private db: Db;
    collection: Collection<TCollection>;

    private dbName: string;
    private collectionName: string;
    private url_mongo = 'mongodb://root:example@localhost:27018';

    constructor(dbName?: string, collection?: string) {
        this.dbName = dbName || process.env.MONGO_DB;
        this.collectionName = collection || process.env.MONGO_COLLECTION;
    }

    async connection(): Promise<MongoDb<TCollection>> {
        this.client = new MongoClient(this.url_mongo);

        try {
            await this.client.connect();
        } catch (e) {
            console.log(e);
        }

        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection<TCollection>(this.collectionName);

        return this;
    }
}

export const isFound = async <T>(
    object: T | null,
    errorMessage?: string,
    errorCode?: status
): Promise<T> => {
    if (object !== null) {
        return object;
    }

    Promise.reject({
        code: errorCode || status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};

export const isDeleted = async (
    response: { ok: 0 | 1 },
    errorMessage?: string,
    errorCode?: status
): Promise<boolean> => {
    if (response.ok === 1) {
        return true;
    }

    Promise.reject({
        code: errorCode || status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};

export const isUpdated = async (
    response: {
        matchedCount: number;
    },
    errorMessage?: string,
    errorCode?: status
): Promise<boolean> => {
    if (response.matchedCount > 0) {
        return true;
    }

    Promise.reject({
        code: errorCode || status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};
