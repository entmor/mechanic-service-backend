import { COMPARISON_OPERATORS, prepareFindFilter, FilterObject } from './lib/prepareFindFilter';
import { JoiSchema } from '../../interface/joi';
import Joi from 'joi';
import { response } from 'express';
import { isDeleted, isFound, isNextPage, isUpdated } from './mongodb';

interface TestObjectSchema {
    string: string;
    number: number;
    isTrue: boolean;
}

type PrepareFindFilterObject = TestObjectSchema;

describe('prepareFindFilter', () => {
    const validatorObject: JoiSchema<PrepareFindFilterObject> = {
        string: Joi.string().alphanum(),
        number: Joi.number().min(1000).max(2000),
        isTrue: Joi.boolean().required(),
    };

    const objectToTest: FilterObject<PrepareFindFilterObject> = {
        string: 'Margaret',
        number: 1001,
        isTrue: true,
    };

    it(`should be resolved`, async () => {
        expect.assertions(1);
        const testObject = { ...objectToTest };
        const response = await prepareFindFilter(validatorObject, testObject);
        expect(response).toMatchObject(objectToTest);
    });

    it(`should be reject, because is error`, () => {
        expect.assertions(1);

        objectToTest.number = 2001;

        return prepareFindFilter(validatorObject, objectToTest).catch((response) => {
            expect(response.code).toBe(5);
        });
    });

    it(`should be empty object, because filter is wrong`, async () => {
        expect.assertions(1);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const response = await prepareFindFilter(validatorObject, { noValue: 'pass' });
        expect(response).toMatchObject({});
    });

    it(`should be error, because validator is wrong`, async () => {
        expect.assertions(1);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return prepareFindFilter({ noValue: 'string' }, { noValue: 'pass' }).catch((error) => {
            expect(error.code).toBe(5);
        });
    });

    describe.each(COMPARISON_OPERATORS)('Comparison operators test', (operator) => {
        test(`${operator} should be resolved`, async () => {
            expect.assertions(1);

            objectToTest.number = {};
            objectToTest.number[operator] = 1500;
            const response = await prepareFindFilter(validatorObject, objectToTest);
            expect(response).toMatchObject(objectToTest);
        });

        test(`${operator} should be reject, because value is wrong`, async () => {
            expect.assertions(1);

            objectToTest.number = {};
            objectToTest.number[operator] = 999;

            return prepareFindFilter(validatorObject, objectToTest).catch((error) => {
                expect(error.code).toBe(5);
            });
        });
    });
});

describe('checkResponse', () => {
    test('[ isDeleled() ] if is deleted should be resolve true, otherwise reject ', async () => {
        expect.assertions(2);

        const deleted = await isDeleted({
            ok: 1,
        });
        expect(deleted).toBeTruthy();

        return isDeleted({
            ok: 0,
        }).catch((e) => {
            expect(e.code).toBe(5);
        });
    });

    test('[ isUpdated() ] if is updated should be resolve true, otherwise reject ', async () => {
        expect.assertions(2);

        const deleted = await isUpdated({
            matchedCount: 1,
        });
        expect(deleted).toBeTruthy();

        return isUpdated({
            matchedCount: 0,
        }).catch((e) => {
            expect(e.code).toBe(5);
        });
    });

    test('[ isFound() ] if is found should be resolve Object, otherwise reject ', async () => {
        expect.assertions(2);

        const testObject: TestObjectSchema = {
            string: 'test',
            number: 1500,
            isTrue: true,
        };

        const deleted = await isFound<TestObjectSchema>(testObject);
        expect(deleted).toMatchObject(testObject);

        return isFound(null).catch((e) => {
            expect(e.code).toBe(5);
        });
    });
});

describe('helpers', () => {
    const isNextPageData = [
        [10, 1, 20, true],
        [10, 1, 10, false],
        [10, 2, 30, true],
        [10, 2, 20, false],
    ];
    describe.each(isNextPageData)(
        'isNextPage()',
        (per_page: number, page: number, count: number, toBe: boolean) => {
            it(`should be ${toBe} | per_page: ${per_page}, page: ${page}, count: ${count}`, () => {
                expect(isNextPage(per_page, page, count)).toBe(toBe);
            });
        }
    );
});
