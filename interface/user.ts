export interface User<T> {
    id?: number;
    firstname: string;
    lastname?: string;
    gender: T;
    password?: string;
    status: string;
    salt?: string;
    role: string;
    email: string;
    phone?: string;
    street?: string;
    city?: string;
    country?: string;
    birthday?: string;
    zipCode?: string;
}

export interface UserResponse<T> extends User<T> {
    createdAt?: number;
    updatedAt?: number;
}
