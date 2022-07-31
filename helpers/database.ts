import { Model, ModelCtor } from 'sequelize';
import * as grpc from '@grpc/grpc-js';

/**
 *
 * @param database: ModelInstance
 * @param id : number
 */

export const getByID = async <TDatabaseInstance extends Model<any, any>, TResponse>(
    database: ModelCtor<TDatabaseInstance>,
    id: number
): Promise<TResponse | any> => {
    const getObject = await database.findByPk(id, { raw: true });

    if (getObject) {
        return getObject;
    }

    await Promise.reject({
        code: grpc.status.NOT_FOUND,
        message: "Object isn't exist.",
    });
};

export const insert = async <TDatabaseInstance extends Model<any, TObject>, TObject, TResponse>(
    database: ModelCtor<TDatabaseInstance>,
    object: TObject
): Promise<TResponse | any> => {
    return new Promise((resolve, reject) => {
        database
            .create(object, { raw: true })
            .then((object) => resolve(object))
            .catch((response) => {
                reject({
                    code: 3,
                    message: response.errors[0].message,
                });
            });
    });
};

/**
 *  Update fileds in database using ID
 *
 * @param database : ModelInstance
 * @param id : number
 * @param object : TObject
 */
export const updateByID = async <TDatabaseInstance extends Model<any, any>, TObject, TResponse>(
    database: ModelCtor<TDatabaseInstance>,
    id: number,
    object: TObject
): Promise<TResponse | any> => {
    const updateResponse = await database.update(object, {
        where: {
            id,
        },
    });

    if (updateResponse) {
        return await database.findByPk(id, { raw: true });
    }

    await Promise.reject({
        code: 3,
        message: "Error: Object isn't updated",
    });
};

/**
 * Find object in Database using ID
 *
 * @param database: ModelInstance
 * @param id : Number
 */

export const isExistByID = async <TDatabaseInstance extends Model<any, any>, TResponse>(
    database: ModelCtor<TDatabaseInstance>,
    id: number
): Promise<TResponse | any> => {
    const isObjectExist = await database.findByPk(id, { raw: true });

    if (isObjectExist === null) {
        await Promise.reject({
            code: grpc.status.NOT_FOUND,
            message: 'Object is not exist.',
        });
    }

    // resolve
    return isObjectExist;
};

/**
 * Delete object from Database using ID
 *
 * @param database: ModelInstance
 * @param id : Number
 */
export const deleteByID = async <TDatabaseInstance extends Model<any, any>>(
    database: ModelCtor<TDatabaseInstance>,
    id: number
): Promise<any> => {
    const deleteResponse = await database.destroy({
        where: {
            id,
        },
    });

    if (deleteResponse) {
        return true;
    }

    await Promise.reject({
        code: 5,
        message: 'Object not exist',
    });
};

const DEFAULT_PER_PAGE = 10;
const DEFAULT_SORT = ['DESC', 'ASC'];

interface GetAllOptions {
    page: number;
    per_page: number;
    sort: string;
}

export const getAllWithLimit = async <TDatabaseInstance extends Model<any, any>, TResponse>(
    database: ModelCtor<TDatabaseInstance>,
    options: Partial<GetAllOptions>
): Promise<TResponse | any> => {
    // SET SORT FOR SELECT
    const SORT =
        typeof options.sort === 'string' &&
        DEFAULT_SORT.indexOf(options.sort.trim().toUpperCase()) >= 0
            ? options.sort.trim().toUpperCase()
            : 'ASC';

    // SET PAGE FOR SELECT
    const PAGE = typeof options.page === 'number' && options.page > 0 ? options.page : 1;

    // SET PER_PAGE FOR SELECT
    const PER_PAGE =
        typeof options.per_page === 'number' && options.per_page > 0
            ? options.per_page
            : DEFAULT_PER_PAGE;

    const offset = PAGE === 1 || PAGE === 0 ? 0 : PER_PAGE * (PAGE - 1);

    /*
     * ##############  DATABASE  #############
     */

    const count: Promise<number> = database.count();
    const getObjects = database.findAll({
        raw: true,
        limit: PER_PAGE,
        offset,
        order: [['id', SORT]],
    });

    const allResponse = await Promise.all([count, getObjects]);

    if (allResponse) {
        const COUNT = allResponse[0];
        const isNextPage = PER_PAGE * PAGE < COUNT ? true : false;

        return {
            count: COUNT,
            sort: SORT,
            page: PAGE,
            per_page: PER_PAGE,
            isNextPage,
            data: allResponse[1],
        };
    }

    await Promise.reject({
        code: grpc.status.NOT_FOUND,
        message: "Objects isn't exist.",
    });
};
