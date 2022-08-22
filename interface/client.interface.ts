export interface Client {
    id?: string;
    name: string;
    type: 'personal' | 'business';
    taxNumber?: string;
    phone: string;
    email: string;
    gender: 'male' | 'female' | 'divers';
    street: string;
    city: string;
    zipCode: string;
    createdAt?: number;
    updatedAt?: number;
}
