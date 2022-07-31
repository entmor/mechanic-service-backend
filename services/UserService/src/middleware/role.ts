import { backendRole } from '../../../../config/admin';

export const isRoleExist = async (role: string): Promise<string> => {
    if (backendRole.indexOf(role) == -1) {
        await Promise.reject({
            code: 3,
            message: "Role isn't exist",
        });
    }
    return role;
    //
};
