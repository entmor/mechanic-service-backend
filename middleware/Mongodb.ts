import { Collection, Db, FindOptions, MongoClient } from 'mongodb';
import * as grpc from '@grpc/grpc-js';
import { JoiSchema } from '../interface/joi';

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
    errorCode?: number
): Promise<T> => {
    if (object !== null) {
        return object;
    }

    Promise.reject({
        code: errorCode || grpc.status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};

export const isDeleted = async (
    response: { ok: 0 | 1 },
    errorMessage?: string,
    errorCode?: number
): Promise<boolean> => {
    if (response.ok === 1) {
        return true;
    }

    Promise.reject({
        code: errorCode || grpc.status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};

export const isUpdated = async (
    response: {
        matchedCount: number;
    },
    errorMessage?: string,
    errorCode?: number
): Promise<boolean> => {
    if (response.matchedCount > 0) {
        return true;
    }

    Promise.reject({
        code: errorCode || grpc.status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};

interface GetAllOptions {
    page?: number;
    per_page?: number;
    sort?: string;
    orderby?: string;
}

export const isNextPage = (per_page: number, page: number, count: number): boolean => {
    return per_page * page < count ? true : false;
};

/**
 *
 * prepareFindOptions
 *
 **/

const DEFAULT_PER_PAGE = 10;
const DEFAULT_SORT_DIRECTION = ['ASC', 'DESC'];

type PrepareFindOptions = {
    query: GetAllOptions;
    findOptions: FindOptions;
};

export const prepareFindOptions = (options: GetAllOptions): PrepareFindOptions => {
    /** SET SORT FOR QUERY **/
    const SORT_DIRECTION =
        typeof options.sort === 'string' &&
        DEFAULT_SORT_DIRECTION.indexOf(options.sort.trim().toUpperCase()) >= 0
            ? options.sort.trim().toUpperCase()
            : DEFAULT_SORT_DIRECTION[0];

    const ORDERBY =
        typeof options.orderby === 'string' && options.orderby !== undefined
            ? options.orderby
            : 'createdAt';

    /** SET PAGE FOR QUERY **/
    const PAGE = typeof options.page === 'number' && options.page > 0 ? options.page : 1;

    /** SET PER_PAGE FOR QUERY **/
    const PER_PAGE =
        typeof options.per_page === 'number' && options.per_page > 0
            ? options.per_page
            : DEFAULT_PER_PAGE;

    /** SET OFFSET FOR QUERY **/
    const OFFSET = PAGE === 1 || PAGE === 0 ? 0 : PER_PAGE * (PAGE - 1);

    return {
        query: {
            sort: SORT_DIRECTION,
            page: PAGE,
            orderby: ORDERBY,
            per_page: PER_PAGE,
        },
        findOptions: {
            limit: PER_PAGE,
            skip: OFFSET,
            sort: [ORDERBY, SORT_DIRECTION],
        },
    };
};

export const prepareFindFilter = async <T>(validators: JoiSchema<T> | any, filter: Partial<T>) => {
    const preparedFilter: {
        [key: string]: any;
    } = {};

    try {
        // if( typeof filter === null && typeof filter )
        for (const [key, value] of Object.entries(filter)) {
            if (Object.hasOwn(validators, key)) {
                if (
                    typeof value !== null &&
                    typeof value !== undefined &&
                    typeof value !== 'object'
                ) {
                    const { error, valid } = validators[key].validate(value);

                    if (error) return await Promise.reject(onErrorPreparedFindFilter());

                    preparedFilter[key] = valid;
                }

                if (typeof value === 'object') {
                    if (Object.hasOwn(value, '$gt')) {
                        preparedFilter[key]['$gt'] = await objectHandler(
                            validators[key],
                            value,
                            '$gt'
                        );
                    }
                }
            }
        }

        return preparedFilter;
    } catch (e) {
        return await Promise.reject(onErrorPreparedFindFilter());
    }
};

const objectHandler = async (validator: any, object: any, key: string) => {
    const { error, valid } = validator.validate(object[key]);

    if (error) return await Promise.reject(onErrorPreparedFindFilter());

    return valid;
};

const onErrorPreparedFindFilter = () => {
    return Promise.reject({
        code: 3,
        message: 'fdf',
    });
};
