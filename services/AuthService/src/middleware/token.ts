import jwt, { SignOptions } from 'jsonwebtoken';
import { status } from '@grpc/grpc-js';

const EXP: number = +process.env.JWT_EXP;
const JWT_SECRET = process.env.JWT_SECRET;

const optionsToken: SignOptions = {
    expiresIn: 60 * EXP,
};

export const createToken = async (
    data: any,
    options: SignOptions = optionsToken
): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            jwt.sign(data, JWT_SECRET, options, (err, token) => {
                if (err) {
                    reject({
                        code: status.UNAUTHENTICATED,
                        message: err.message,
                    });
                }

                resolve(token);
            });
        } catch (e) {
            reject({
                code: status.INTERNAL,
                message: 'Create Token - Error',
            });
        }
    });
};
export async function verifyToken(token: string): Promise<any>;
export async function verifyToken<T>(token: string): Promise<T> {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, JWT_SECRET, optionsToken, (err, decoded: T) => {
                if (err) {
                    reject({
                        code: status.UNAUTHENTICATED,
                        message: err.message,
                    });
                }

                resolve(decoded);
            });
        } catch (e) {
            reject({
                code: status.INTERNAL,
                message: 'Verify Token - error',
            });
        }
    });
}
