interface Option {
    getTimeChange?: boolean;
    excludeKeys?: Array<string>;
}

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const defaultOption: Option = {
    getTimeChange: false,
    excludeKeys: [],
};

const changeDateToTime = (date: Date): number => {
    const time = new Date(date);

    return time.getTime();
};

// TODO CHECK TYPESCRIPT ANY
export const fromJsonToGrpc = <S, T>(schema: S | any, body: T | any, options?: Option): S => {
    // SET OPTIONS
    options = {
        ...defaultOption,
        ...options,
    };

    if (options.getTimeChange) {
        body.createdAt = changeDateToTime(body.createdAt);
        body.updatedAt = changeDateToTime(body.updatedAt);
    }

    Object.entries(body).filter(([key, value]) => {
        const schemaKey = `set${capitalizeFirstLetter(key)}`;

        if (typeof schema[schemaKey] !== 'undefined' && options.excludeKeys.indexOf(key) == -1) {
            schema[schemaKey](value);
        }
    });

    return schema;
};
