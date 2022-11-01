import { randomBytes, pbkdf2Sync } from 'crypto';
import * as grpc from '@grpc/grpc-js';

interface CreateReturn {
    hashedPassword: string;
    salt: string;
}

class Pbkdf2 {
    private SALT_BYTES = 32; // MIN 16
    private ITERATIONS = 500000;
    private KEYLEN = 64;
    private DIGEST = 'sha512';
    private key: Buffer;
    private randomBytes: Buffer;

    create = async (password: string): Promise<CreateReturn> => {
        try {
            this.randomBytes = randomBytes(this.SALT_BYTES);

            this.key = pbkdf2Sync(
                password,
                this.randomBytes.toString('hex'),
                this.ITERATIONS,
                this.KEYLEN,
                this.DIGEST
            );

            return {
                hashedPassword: this.key.toString('hex'),
                salt: this.randomBytes.toString('hex'),
            };
            //
        } catch (e) {
            console.log(e);
            await Promise.reject({
                code: grpc.status.INTERNAL,
                message: 'Pbkdf2 Create - error',
            });
        }
    };

    verify = async (password: string, hash: string, salt: string): Promise<boolean> => {
        try {
            this.key = pbkdf2Sync(password, salt, this.ITERATIONS, this.KEYLEN, this.DIGEST);

            return hash === this.key.toString('hex');
            //
        } catch (e) {
            console.log(e);
            await Promise.reject({
                code: grpc.status.INTERNAL,
                message: 'Pbkdf2 Verify - error',
            });
        }
    };
}

export const PasswordModule = new Pbkdf2();
