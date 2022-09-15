import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { App } from '../src/app';
import request from 'supertest';
import { execSync } from 'child_process';
import { Client } from '../../../interface/client.interface';

const URL = '/v1/client';

const client: Client = {
    name: 'Janusz Borysewicz-Kałużny',
    type: 'personal',
    phone: '732-323-232',
    email: 'januszek@boryseiwczek-kaluzny.com',
    gender: 'male',
    street: 'Ul kaluzna 5',
    city: 'Wieleń',
    zipCode: '64-730',
};

const instertInvalidFieldsToCheck = [
    ['name', ['notAcceptSpecialChar!@$%@$%', ''], true],
    ['type', ['onlypersonal', 'onlybussiness', ''], true],
    ['phone', ['notAcceptSpecialChar!@$%@$%', ''], true],
    ['email', ['sdad@', 'asdad'], false],
    ['gender', ['onlyMale', 'onlyFemale', ''], true],
    ['street', ['notAcceptSpecialChar!@$%@$%'], false],
    ['zipCode', ['notAcceptSpecialChar!@$%@$%'], false],
    ['city', ['notAcceptSpecialChar!@$%@$%'], false],
];

const updateInvalidFieldsToCheck = [
    ['name', ['notAcceptSpecialChar!@$%@$%'], false],
    ['type', ['onlypersonal', 'onlybussiness'], false],
    ['phone', ['notAcceptSpecialChar!@$%@$%'], false],
    ['email', ['sdad@', 'asdad'], false],
    ['gender', ['onlyMale', 'onlyFemale'], false],
    ['street', ['notAcceptSpecialChar!@$%@$%'], false],
    ['zipCode', ['notAcceptSpecialChar!@$%@$%'], false],
    ['city', ['notAcceptSpecialChar!@$%@$%'], false],
];

describe(`[API ROUTER][${URL}]`, () => {
    const app = request(App);
    let db: MongoDb<Client>;

    let insertedId = 'testId';
    let invalidObject: Partial<Client> = {};

    jest.setTimeout(10000);
    beforeAll(async () => {
        /** CONNECT TO MONGODB **/
        const mongodb = new MongoDb<Client>('client');
        db = await mongodb.connection();

        /** CLEAR COLLECTION **/
        await db.collection.deleteMany({});

        if (process.env.FULL_TEST) {
            execSync('docker start client-service');
            execSync('docker start mongo');
        }
    });

    describe('Insert', () => {
        describe.each(instertInvalidFieldsToCheck)(
            'Form: Invalid fields',
            (key: string, value: Array<any>, required = false) => {
                beforeEach(() => {
                    invalidObject = { ...client };
                });

                /***
                 * forEach values
                 */
                describe.each(value)(`${key}`, (_value) => {
                    it(`should be response 400, because ${
                        _value.length > 0 ? `value "${_value}" is invalid` : 'value is empty'
                    }`, async () => {
                        expect.assertions(2);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        invalidObject[key] = _value;

                        const invalid_response = await app.post(URL).send(invalidObject);

                        expect(invalid_response.statusCode).toEqual(400);
                        expect(invalid_response.body.details).toContain(`${key}`);
                    });
                });

                /***
                 * required
                 */
                describe(`${key}`, () => {
                    if (required) {
                        it(`should be response 400, because key ${key} not exist`, async () => {
                            expect.assertions(2);
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            delete invalidObject[key];

                            const invalid_response = await app.post(URL).send(invalidObject);

                            expect(invalid_response.statusCode).toEqual(400);
                            expect(invalid_response.body.details).toContain(`${key}`);
                        });
                    }
                });
            }
        );

        it('should be insert personal client', async () => {
            const api_response = await app.post(URL).send(client);
            insertedId = api_response.body.id;
            expect(api_response.statusCode).toBe(200);
        });

        it('should be not insert, because if type is business, taxNumber is required', async () => {
            expect.assertions(2);
            invalidObject = { ...client, type: 'business' };

            const api_response = await app.post(URL).send(invalidObject);
            expect(api_response.statusCode).toEqual(400);
            expect(api_response.body.details).toContain('taxNumber');
        });

        it('should be insert business client', async () => {
            const validClient = { ...client, type: 'business', taxNumber: 123456789 };

            const api_response = await app.post(URL).send(validClient);
            expect(api_response.statusCode).toBe(200);
        });
    });

    describe('Get', () => {
        it('should be get a client', () => {
            return app.get(`${URL}/${insertedId}`).expect(200);
        });
    });

    describe('Update', () => {
        describe.each(updateInvalidFieldsToCheck)(
            'Form: Invalid fields',
            (key: string, value: Array<any>, required = false) => {
                beforeEach(() => {
                    invalidObject = { ...client, id: insertedId };
                });

                /***
                 * forEach values
                 */
                describe.each(value)(`${key}`, (_value) => {
                    it(`should be response 400, because ${
                        _value.length > 0 ? `value "${_value}" is invalid` : 'value is empty'
                    }`, async () => {
                        expect.assertions(2);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        invalidObject[key] = _value;

                        const invalid_response = await app.put(URL).send(invalidObject);

                        expect(invalid_response.statusCode).toEqual(400);
                        expect(invalid_response.body.details).toContain(`${key}`);
                    });
                });

                /***
                 * required
                 */
                describe(`${key}`, () => {
                    if (required) {
                        it(`should be response 400, because key ${key} not exist`, async () => {
                            expect.assertions(2);
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            delete invalidObject[key];

                            const invalid_response = await app.put(URL).send(invalidObject);

                            expect(invalid_response.statusCode).toEqual(400);
                            expect(invalid_response.body.details).toContain(`${key}`);
                        });
                    }
                });
            }
        );
    });

    describe('Delete', () => {
        describe('error. because', () => {
            it.concurrent('should not delete Client, when param ID is too short', () => {
                return app.delete(`${URL}/62fcd31122d6ad5730d180`).expect(400);
            });

            it.concurrent('should be 404, when param ID will be empty', () => {
                return app.delete(`${URL}`).expect(404);
            });

            it.concurrent('should be 404 for not existing Client', async () => {
                return app.delete(`${URL}/a2fcd31122d6ad5730d180a5`).expect(404);
            });
        });

        it('should be remove client', async () => {
            return await app.delete(`${URL}/${insertedId}`).expect(200);
        });
    });

    if (process.env.FULL_TEST) {
        describe('If service is off', () => {
            jest.setTimeout(60000);
            it('should be 500, because mongo is stopped', async () => {
                execSync('docker kill mongo');

                const api_response = await app.get(URL);
                expect(api_response.statusCode).toBe(500);
            });

            it('should be 500, because client-service is stopped', async () => {
                execSync('docker kill client-service');

                const api_response = await app.get(URL);
                expect(api_response.statusCode).toBe(503);
            });

            afterAll(() => {
                execSync('docker start mongo');
                execSync('docker start client-service');
            });
        });
    }
});
