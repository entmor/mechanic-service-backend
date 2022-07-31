export interface GetAllResponse<T> {
    count: number;
    sort: string;
    page: number;
    per_page: number;
    isNextPage: boolean;
    data: T[];
}

export interface GetAllRequest {
    page: number;
    per_page: number;
    sort: 'ASC' | 'DESC';
}
