import { createToken, verifyToken } from '../src/middleware/token';

const payload = {
    something: 'yes',
    else: 'no',
};

describe('Token Unit', () => {
    it('Should create and decode token', async () => {
        const token = await createToken(payload);
        expect(token).toMatch(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/);

        const decoded = await verifyToken(token);
        expect(decoded).toMatchObject(payload);
    });

    it('should be error, because jwt expired', async () => {
        return expect(
            createToken(payload, { expiresIn: 1 }).then((token) =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(token);
                    }, 1200);
                }).then(verifyToken)
            )
        ).rejects.toMatchObject({ message: 'jwt expired' });
    });
});
