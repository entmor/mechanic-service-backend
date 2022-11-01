export interface User {
    id?: string;
    firstname: string;
    lastname?: string;
    password?: string;
    status: string;
    salt?: string;
    role: string;
    email: string;
    createdAt?: number;
    updatedAt?: number;
}
