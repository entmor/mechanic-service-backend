import request from 'supertest';
import { App } from '../src/app';
import { User } from '../../../interface/user';
import { GenderClient } from '../../../interface/gender';
import { SequelizeInit } from '../../../middleware/Sequelize';
import { modelName as USER_MODEL_NAME, UserInstance } from '../../UserService/src/model/db.model';
import * as UserModel from '../../UserService/src/model/db.model';

const userOne: User<GenderClient> = {
    firstname: 'Andrea',
    lastname: 'Kowal',
    email: 'sstx.enter@gmail.com',
    password: 'jarek1212!',
    gender: 'GENDER_MALE',
    status: 'active',
    role: 'admin',
};

//
//pw+has: fefb74c50de09ce14f265c3668ad156475f2c04261d3a83572eaa29aea32825703967eca41b2370a97db8b9e2add97ed89b104871f14a3b5969c5ea7fe721afd
// salt: fd2e924a09c81f391579d84a33a046ced7d4b8ce494a417f836e5497eb4f0f3c

const fieldsToCheck = [
    ['email', ['incorrect-email-adress@entmor', ''], true],
    ['firstname', ['notAcceptSpecialChar!@$%@$%', ''], true],
    ['lastname', ['notAcceptSpecialChar!@$%@$%']],
    ['role', ['notAcceptNumber1234', 'notAcceptSpecialChar!@$%@$%', 'onlyLowerCase'], true],
    ['status', ['thisForSureNotExist', ''], true],
    ['password', ['toShort', ''], true],
];

beforeAll(async () => {
    // CLEAR DATABASE
    const sequelize = new SequelizeInit<UserInstance>([UserModel]);
    const database = sequelize.getModel(USER_MODEL_NAME);

    await database.create({
        ...userOne,
        password:
            'fefb74c50de09ce14f265c3668ad156475f2c04261d3a83572eaa29aea32825703967eca41b2370a97db8b9e2add97ed89b104871f14a3b5969c5ea7fe721afd',
        salt: 'fd2e924a09c81f391579d84a33a046ced7d4b8ce494a417f836e5497eb4f0f3c',
    });
});

describe.skip('User tests', () => {
    const app = request(App);
    let invalidUser: Partial<User<GenderClient>> = {};

    describe.skip('Create new user', () => {
        it.todo('onlyForADMIN');
        /***
         * Form: Invalid fields
         */
        describe.each(fieldsToCheck)(
            'Form: Invalid fields',
            (key: string, value: Array<any>, required = false) => {
                beforeEach(() => {
                    invalidUser = { ...userOne };
                });

                /***
                 * forEach values
                 */
                describe.each(value)(`${key}`, (_value) => {
                    it(`should be response 400, because ${
                        _value.length > 0 ? `value "${_value}" is invalid` : 'value is empty'
                    }`, async () => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        invalidUser[key] = _value;

                        const invalid_response = await app.post('/v1/user').send(invalidUser);
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
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            delete invalidUser[key];

                            const invalid_response = await app.post('/v1/user').send(invalidUser);
                            expect(invalid_response.statusCode).toEqual(400);
                            expect(invalid_response.body.details).toContain(`${key}`);
                        });
                    }
                });
            }
        );

        it('Create new User', () => {
            return request(App).post('/v1/user/').send(userOne).expect(200);
        });
    });

    describe('Auth Created User', () => {
        it.todo('wylaczenie serwisu redis');
        it('Get AuthToken', async () => {
            const response = await request(App)
                .post('/v1/user/auth')
                .send({ email: userOne.email, password: userOne.password });
            console.log(response.body);
            expect(response.statusCode).toBe(200);
            expect(response.body.token).toMatch(
                /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/
            );
        });
    });

    describe.skip('User delete process', () => {
        it.concurrent('should not delete user, when param ID is string', () => {
            return request(App).delete('/v1/user/string').expect(400);
        });

        it.concurrent('should be 400, when param ID will be >= 0', () => {
            return request(App).delete('/v1/user/0').expect(400);
        });

        it.concurrent('should be 404, when param ID will be empty', () => {
            return request(App).delete('/v1/user').expect(404);
        });

        it.concurrent('should be 404 for not existing User', () => {
            return request(App).delete('/v1/user/9999').expect(404);
        });
    });
});
