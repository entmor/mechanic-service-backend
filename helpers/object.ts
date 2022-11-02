export const removeEmptyProperties = <T>(object: T): T | Partial<T> => {
    Object.entries(object).filter(([indexS, value], index) => {
        if (value === null || value === undefined || value === '') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete object[indexS];
        }
    });

    return object;
};
