export type TUserRole = 'user' | 'admin';

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    isBlocked: boolean;
};