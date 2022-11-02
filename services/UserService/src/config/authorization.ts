import { Authorization } from '../../../../helpers/authorization';

export const authorizationConfig: Authorization = {
    getUser: {
        user: {
            self: {
                exclude: ['password', 'salt'],
            },
            admin: {
                exclude: ['password', 'salt'],
            },
            superadmin: {
                exclude: ['password', 'salt'],
            },
        },
    },
};
