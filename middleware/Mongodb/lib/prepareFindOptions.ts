import { FindOptions } from 'mongodb';

export interface GetAllOptions {
    page?: number;
    per_page?: number;
    sort?: 'ASC' | 'DESC' | string;
    orderby?: string;
}

export type PrepareFindOptions = {
    query: GetAllOptions;
    findOptions: FindOptions;
};

export const DEFAULT_PER_PAGE = 10;
export const DEFAULT_SORT_DIRECTION = ['ASC', 'DESC'];
export const DEFAULT_ORDERBY = 'createdAt';

export const prepareFindOptions = (options: GetAllOptions): PrepareFindOptions => {
    const findOptions: FindOptions = {};

    /** SET SORT FOR QUERY **/
    const SORT_DIRECTION =
        typeof options.sort === 'string' &&
        DEFAULT_SORT_DIRECTION.indexOf(options.sort.trim().toUpperCase()) >= 0
            ? options.sort.trim().toUpperCase()
            : DEFAULT_SORT_DIRECTION[0];

    const ORDERBY =
        typeof options.orderby === 'string' &&
        options.orderby !== undefined &&
        new RegExp(/^[a-zA-Z]{1}[a-zA-Z0-9\-_]*$/).test(options.orderby)
            ? options.orderby
            : DEFAULT_ORDERBY;

    /** SET PAGE FOR QUERY **/
    const PAGE = typeof options.page === 'number' && options.page > 0 ? options.page : 1;

    /** SET PER_PAGE FOR QUERY **/
    const PER_PAGE =
        typeof options.per_page === 'number' && options.per_page >= 0
            ? options.per_page
            : DEFAULT_PER_PAGE;

    /** SET OFFSET FOR QUERY **/
    const OFFSET = PAGE === 1 || PAGE === 0 ? 0 : PER_PAGE * (PAGE - 1);

    findOptions.sort = [ORDERBY, SORT_DIRECTION];

    if (PER_PAGE > 0) {
        findOptions.limit = PER_PAGE;
        findOptions.skip = OFFSET;
    }

    return {
        query: {
            sort: SORT_DIRECTION,
            page: PAGE,
            orderby: ORDERBY,
            per_page: PER_PAGE,
        },
        findOptions,
    };
};
