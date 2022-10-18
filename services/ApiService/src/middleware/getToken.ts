export function getToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        if (token.startsWith('Bearer ')) {
            resolve(token.slice(7));
        } else {
            reject('err token');
        }
    });
}
