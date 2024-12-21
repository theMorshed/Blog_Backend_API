/**
 * Type Definitions for User Module
 * 
 * This file defines the types used in the user module, including:
 * - `TUserRole`: A union type that specifies possible user roles.
 * - `TUser`: The structure representing a user entity in the application.
 */

/**
 * Type for User Roles
 * 
 * Defines the possible roles a user can have:
 * - `'user'`: A standard user with limited access.
 * - `'admin'`: An administrator with elevated permissions.
 */
export type TUserRole = 'user' | 'admin';

/**
 * Type for User Entity
 * 
 * Represents the structure of a user object in the application, including:
 * - `name`: The user's full name.
 * - `email`: The user's email address.
 * - `password`: The user's hashed password.
 * - `role`: The user's role in the system (`TUserRole`).
 * - `isBlocked`: A flag indicating whether the user is blocked.
 */
export type TUser = {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    isBlocked: boolean;
};