/**
 * Import Statements
 * 
 * This section imports necessary modules and models:
 * - `User` from `user.model`: The Mongoose model for user operations.
 * - `TUser` from `user.types`: Type definition for the user entity.
 * - `bcryptjs`: For hashing and comparing passwords.
 * - `jsonwebtoken`: For generating and verifying JWT tokens.
 */
import User from "./user.model";
import { TUser } from "./user.types";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Service for User Registration
 * 
 * This function handles user registration by:
 * - Checking if a user with the provided email already exists.
 * - Creating a new user if no conflict is found.
 * 
 * @param payload - The user data containing `name`, `email`, `password`, etc.
 * @returns The newly created user object.
 * @throws Error if the user already exists.
 */
export const registerService = async (payload: TUser) => {
    const { email } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const result = await User.create(payload);
    return result;
};

/**
 * Service for User Login
 * 
 * This function handles user login by:
 * - Validating the provided email and password.
 * - Generating a JWT token upon successful authentication.
 * 
 * @param email - The email address of the user attempting to log in.
 * @param password - The password provided for authentication.
 * @returns An object containing the authenticated user and the generated JWT token.
 * @throws Error if the email is not found or the password is incorrect.
 */
export const loginService = async (email: string, password: string) => {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Wrong password input');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user?._id, role: user?.role }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '1d' });

    return { user, token };
};