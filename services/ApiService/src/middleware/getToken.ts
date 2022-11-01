import { status } from '@grpc/grpc-js';

export function getToken(token = ''): Promise<string> {
    return new Promise((resolve, reject) => {
        if (token.startsWith('Bearer ')) {
            resolve(token.slice(7));
        } else {
            reject({
                code: status.UNAUTHENTICATED,
                message: 'WRONG TOKEN',
            });
        }
    });
}
