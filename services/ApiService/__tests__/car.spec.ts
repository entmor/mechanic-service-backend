import { MongoDb } from '../../../middleware/Mongodb/mongodb';
import { Car } from '../../../interface/car';
import { App } from '../src/app';
import request from 'supertest';
import { execSync } from 'child_process';

const URL = '/v1/car';

const date = new Date();

const car: Car = {
    plate: 'PCT05755',
    mark: 'Volkswagen',
    model: 'Golf III',
    year: 2015,
    vin: 'VFKLWERT421NJFJRZ',
    clientId: '525225255225252525525252',
};

const instertFieldsToCheck = [
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
    let car_db: MongoDb<Car>;

    let insertedId = 'testId';
    let invalidObject: Partial<Car> = {};

    jest.setTimeout(10000);
    beforeAll(async () => {
        /** CONNECT TO MONGODB **/
        const mongodb = new MongoDb<Car>('cars');
        car_db = await mongodb.connection();

        /** CLEAR COLLECTION **/
        await car_db.collection.deleteMany({});

        console.log(process.env.FULL_TEST);
        if (process.env.FULL_TEST) {
            execSync('docker start car-service');
            execSync('docker start mongo');
        }
    });

    describe('Insert', () => {
        describe.each(instertFieldsToCheck)(
            'Form: Invalid fields',
            (key: string, value: Array<any>, required = false) => {
                beforeEach(() => {
                    invalidObject = { ...car };
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
            const api_response = await app.post(URL).send(car);
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
                    invalidObject = { ...car, id: insertedId };
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
                console.log(api_response.body);
                expect(api_response.statusCode).toBe(500);
            });

            it('should be 500, because car-service is stopped', async () => {
                execSync('docker kill car-service');

                const api_response = await app.get(URL);
                console.log(api_response.body);
                expect(api_response.statusCode).toBe(503);
            });

            afterAll(() => {
                execSync('docker start mongo');
                execSync('docker start car-service');
            });
        });
    }
});
