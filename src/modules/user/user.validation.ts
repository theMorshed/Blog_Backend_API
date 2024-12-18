import { z } from 'zod';

// Define the role enum
const UserRoleEnum = z.enum(['user', 'admin']);

// Create validation schema for user creation
export const registerUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: UserRoleEnum.optional(),
    isBlocked: z.boolean().optional()
});

// Validation schema for login
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});