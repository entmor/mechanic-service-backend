import { backendStatus } from '../../../../config/admin';

export const isStatusExist = async (role: string): Promise<string> => {
    if (backendStatus.indexOf(role) == -1) {
        await Promise.reject({
            code: 3,
            message: "status isn't exist",
        });
    }
    return role;
    //
};
