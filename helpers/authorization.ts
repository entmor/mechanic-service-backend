import * as grpc from '@grpc/grpc-js';

type AuthorizationRoleOptions = {
    exclude?: string | string[];
};

type AuthorizationRole = {
    all?: true | AuthorizationRoleOptions;
    self?: true | AuthorizationRoleOptions;
    [key: string]: true | AuthorizationRoleOptions;
};

export type AuthorizationType = {
    all?: true | AuthorizationRoleOptions;
    user?: AuthorizationRole;
    client?: AuthorizationRole;
};

export type Authorization = {
    [key: string]: AuthorizationType;
};

// export function checkAuthorization(
//     auth: AuthorizationType,
//     type: 'user' | 'client',
//     role: string
// ): Promise<true | AuthorizationRoleOptions>;
// export function checkAuthorization(
//     auth: AuthorizationType,
//     type: 'user' | 'client',
//     role: string,
//     user_id: number,
//     request_id: number
// ): Promise<true | AuthorizationRoleOptions>;
// export async function checkAuthorization(
//     auth: AuthorizationType,
//     type: 'user' | 'client',
//     role: string,
//     user_id?: number,
//     request_id?: number
// ) {
//     if (typeof auth['all'] != 'undefined') {
//         return auth['all'];
//     }
//
//     if (typeof auth[type] != 'undefined') {
//         if (typeof auth[type]['all'] != 'undefined') {
//             return auth[type]['all'];
//         }
//
//         if (
//             (typeof auth[type]['self'] === 'boolean' || typeof auth[type]['self'] === 'object') &&
//             typeof user_id === 'number' &&
//             typeof request_id === 'number' &&
//             user_id === request_id
//         ) {
//             return auth[type]['self'];
//         }
//
//         if (typeof auth[type][role] === 'boolean' || typeof auth[type][role] === 'object') {
//             return auth[type][role];
//         }
//     }
//
//     return Promise.reject({
//         code: grpc.status.PERMISSION_DENIED,
//         message: 'PERMISSION_DENIED',
//     });
// }

type Auth = {
    type: string;
    role: string;
    id: number;
};

export function checkAuthorization(
    auth: AuthorizationType,
    user: Auth
): Promise<true | AuthorizationRoleOptions>;
export function checkAuthorization(
    auth: AuthorizationType,
    user: Auth,
    request_id: number
): Promise<true | AuthorizationRoleOptions>;
export async function checkAuthorization(auth: AuthorizationType, user: Auth, request_id?: number) {
    const type = user.type === 'user' ? 'user' : 'client';
    const role = user.role;
    const user_id = user.id;

    if (typeof auth['all'] != 'undefined') {
        return auth['all'];
    }

    if (typeof auth[type] != 'undefined') {
        if (typeof auth[type]['all'] != 'undefined') {
            return auth[type]['all'];
        }

        if (
            (typeof auth[type]['self'] === 'boolean' || typeof auth[type]['self'] === 'object') &&
            typeof user_id === 'number' &&
            typeof request_id === 'number' &&
            user_id === request_id
        ) {
            return auth[type]['self'];
        }

        if (typeof auth[type][role] === 'boolean' || typeof auth[type][role] === 'object') {
            return auth[type][role];
        }
    }

    return Promise.reject({
        code: grpc.status.PERMISSION_DENIED,
        message: 'PERMISSION_DENIED',
    });
}

export const checkToken = (token: string): Promise<string> => {
    const verifyToken = new RegExp(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/);

    return new Promise((resolve, reject) => {
        if (verifyToken.test(token)) {
            resolve(token);
        } else {
            reject({
                code: grpc.status.UNAUTHENTICATED,
                message: 'Token is required and must be correct',
            });
        }
    });
};
