import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { Vehicle } from '../../../interface/vehicle-interface';
import { App } from '../src/app';
import request from 'supertest';
import { execSync } from 'child_process';

const URL = '/v1/vehicle';

const date = new Date();

const vehicle: any = {
    type: 'CAR',
    plate: 'PCT05755',
    mark: 'Volkswagen',
    model: 'Golf III',
    year: 2015,
    vin: 'VFKLWERT421NJFJRZ',
    clientId: '525225255225252525525252',
    engine: {
        enginePower: 55,
        engineSize: 1.5,
        engineType: 'DIESEL',
    },
};

const instertFieldsToCheck = [
    ['type', [4, 'fsdfsdf', ''], true],
    ['plate', ['notAcceptSpecialChar!@$%@$%', ''], true],
    ['mark', ['notAcceptSpecialChar!@$%@$%', ''], true],
    ['model', ['notAcceptSpecialChar!@$%@$%', ''], true],
    ['year', ['1800', date.getFullYear() + 1, ''], true],
    [
        'vin',
        ['notAcceptSpecialChar!@$%@$%', 'FALSHFALSHFALSHII', 'FALSHFALSHFALSHQQ', 'toShort'],
        true,
    ],
    ['clientId', ['notAcceptChar789', 'notAcceptSpecialChar!@$%@$%', 'notAcceptCharGHJ'], true],
];

const updatedFieldsToCheck = [
    ['plate', ['notAcceptSpecialChar!@$%@$%'], false],
    ['mark', ['notAcceptSpecialChar!@$%@$%'], false],
    ['model', ['notAcceptSpecialChar!@$%$%'], false],
    ['year', ['1800', `${date.getFullYear() + 1}`], false],
    [
        'vin',
        ['notAcceptSpecialChar!@$%@$%', 'FALSHFALSHFALSHII', 'FALSHFALSHFALSHQQ', 'toShort'],
        false,
    ],
    ['clientId', ['notAcceptChar789', 'notAcceptSpecialChar!@$%@$%', 'notAcceptCharGHJ'], false],
];

describe(`[API ROUTER][${URL}]`, () => {
    const app = request(App);
    let vehicle_db: MongoDb<Vehicle>;

    let insertedId = 'testId';
    let invalidObject: Partial<Vehicle> = {};

    jest.setTimeout(10000);
    beforeAll(async () => {
        /** CONNECT TO MONGODB **/
        const mongodb = new MongoDb<Vehicle>('vehicle');
        vehicle_db = await mongodb.connection();

        /** CLEAR COLLECTION **/
        await vehicle_db.collection.deleteMany({});

        if (process.env.FULL_TEST) {
            execSync('docker start vehicle-service');
            execSync('docker start mongo');
        }
    });

    describe('Insert', () => {
        describe.each(instertFieldsToCheck)(
            'Form: Invalid fields',
            (key: string, value: Array<any>, required = false) => {
                beforeEach(() => {
                    invalidObject = { ...vehicle };
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

        it('should be insert car', async () => {
            const api_response = await app.post(URL).send(vehicle);
            insertedId = api_response.body.id;
            expect(api_response.statusCode).toBe(200);
        });
    });

    describe('Get', () => {
        it('should be get a car', () => {
            return app.get(`${URL}/${insertedId}`).expect(200);
        });
    });

    describe('Update', () => {
        describe.each(updatedFieldsToCheck)(
            'Form: Invalid fields',
            (key: string, value: Array<any>, required = false) => {
                beforeEach(() => {
                    invalidObject = { ...vehicle, id: insertedId };
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
            it.concurrent('should not delete car, when param ID is too short', () => {
                return app.delete(`${URL}/62fcd31122d6ad5730d180`).expect(400);
            });

            it.concurrent('should be 404, when param ID will be empty', () => {
                return app.delete(`${URL}`).expect(404);
            });

            it.concurrent('should be 404 for not existing Car', async () => {
                return app.delete(`${URL}/a2fcd31122d6ad5730d180a5`).expect(404);
            });
        });

        it('should be remove car', async () => {
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

            it('should be 500, because vehicle-service is stopped', async () => {
                execSync('docker kill vehicle-service');

                const api_response = await app.get(URL);
                expect(api_response.statusCode).toBe(503);
            });

            afterAll(() => {
                execSync('docker start mongo');
                execSync('docker start vehicle-service');
            });
        });
    }
});
