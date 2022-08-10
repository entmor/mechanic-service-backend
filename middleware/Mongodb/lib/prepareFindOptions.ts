import { FindOptions } from 'mongodb';

/**
 *
 * prepareFindOptions
 *
 **/

interface GetAllOptions {
    page?: number;
    per_page?: number;
    sort?: string;
    orderby?: string;
}

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

