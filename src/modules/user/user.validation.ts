// Import Statements
// -----------------
// Importing Zod library for schema validation.
import { z } from 'zod';

// Define the role enum
/**
 * Enum for User Roles
 * 
 * Represents the allowed user roles:
 * - `'user'`: A standard user.
 * - `'admin'`: An administrator with elevated permissions.
 */
const UserRoleEnum = z.enum(['user', 'admin']);

// Create validation schema for user creation
/**
 * Schema for User Registration
 * 
 * Validates the payload for registering a new user, including:
 * - `name`: Required; must be a non-empty string.
 * - `email`: Required; must be a valid email address.
 * - `password`: Required; must be at least 6 characters long.
 * - `role`: Optional; must be one of the values in `UserRoleEnum`.
 * - `isBlocked`: Optional; must be a boolean.
 */
export const registerUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: UserRoleEnum.optional(),
    isBlocked: z.boolean().optional()
});

// Validation schema for login
/**
 * Schema for User Login
 * 
 * Validates the payload for logging in a user, including:
 * - `email`: Required; must be a valid email address.
 * - `password`: Required; must be at least 6 characters long.
 */
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});