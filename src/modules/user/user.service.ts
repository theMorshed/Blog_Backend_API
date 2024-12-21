import User from "./user.model";
import { TUser } from "./user.types";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerService = async(payload: TUser) => {
    const { email } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const result = await User.create(payload);
    return result;
}

// Service for user login
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