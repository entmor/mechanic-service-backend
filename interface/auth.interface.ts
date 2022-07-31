export type SetAuth = {
    email: string;
    password: string;
    type: 'user' | 'client';
};

export type GetAuth = {
    token: string;
};
