/**
 * Import Statements
 * 
 * - `model`, `Model`, `Schema`: Imported from Mongoose to define the User schema and model.
 * - `TUser`: TypeScript type for the User entity, ensuring type safety.
 * - `config`: Configuration file for accessing environment variables like bcrypt salt rounds.
 * - `bcrypt`: Library used for hashing passwords to enhance security.
 */
import { model, Model, Schema } from "mongoose";
import { TUser } from "./user.types";
import config from "../../config";
import bcrypt from 'bcryptjs';

/**
 * User Schema and Model
 * 
 * This file defines the Mongoose schema and model for the User entity. It includes the structure,
 * validation rules, and middleware functions to manage user data securely and efficiently.
 * 
 * Schema Fields:
 * - `name`: The full name of the user. Required and trimmed.
 * - `email`: The email address of the user. Required, unique, and validated with a regex pattern.
 * - `password`: The hashed password for the user. Required and validated for a minimum length.
 * - `role`: The role of the user, which can be 'user' or 'admin'. Defaults to 'user'.
 * - `isBlocked`: Indicates whether the user is blocked. Defaults to `false`.
 * - Timestamps: Automatically includes `createdAt` and `updatedAt` fields.
 * 
 * Middleware:
 * - Pre-save: Hashes the password using bcrypt before saving the user document.
 * - Post-save: Clears the password field in the saved document to enhance security.
 * 
 * Custom Behavior:
 * - `toJSON` transformation: Removes `__v`, `createdAt`, and `updatedAt` fields from the response.
 * 
 * Export:
 * - The `User` model is exported for use in the application to interact with the User collection.
 */

// Create the User Schema
const UserSchema: Schema<TUser> = new Schema(
{
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

/**
 * Pre-save middleware for hashing passwords.
 * This middleware hashes the user's password before saving it to the database.
 */
UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
});

/**
 * Post-save middleware for clearing the password field.
 * This middleware removes the password from the saved document for security purposes.
 */
UserSchema.post('save', function(doc, next) {
    doc.password = '';
    next();
});

/**
 * Custom toJSON method to modify the output of user documents.
 * This method removes `__v`, `createdAt`, and `updatedAt` fields from the response.
 */
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

/**
 * User Model
 * 
 * The `User` model provides an interface to interact with the User collection in the MongoDB database.
 */
const User: Model<TUser> = model<TUser>('User', UserSchema);

export default User;