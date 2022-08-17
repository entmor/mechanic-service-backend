import { status } from '@grpc/grpc-js';

export const isFound = async <T>(
    object: T | null,
    errorMessage?: string,
    errorCode?: number
): Promise<T> => {
    if (object !== null) {
        return object;
    }

    return Promise.reject({
        code: errorCode || status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};

export const isDeleted = async (
        response: { deletedCount:number },
    errorMessage?: string,
    errorCode?: number
): Promise<boolean> => {
    if (response.deletedCount === 1) {
        return true;
    }

    return Promise.reject({
        code: errorCode || status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};

export const isUpdated = async (
    response: {
        matchedCount: number;
    },
    errorMessage?: string,
    errorCode?: number
): Promise<boolean> => {
    if (response.matchedCount > 0) {
        return true;
    }

    return Promise.reject({
        code: errorCode || status.NOT_FOUND,
        message: errorMessage || "Object isn't exist.",
    });
};
