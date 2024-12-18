import { model, Model, Schema } from "mongoose";
import { TUser } from "./user.types";
import config from "../../config";
import bcrypt from 'bcryptjs';

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

UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    next();
})

UserSchema.post('save', function(doc, next) {
    doc.password = '';
    next();
})

// Custom toJSON method to exclude __v and timestamps in the response
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        // Delete the fields you don't want in the response
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

// Create and export the Mongoose model
const User: Model<TUser> = model<TUser>('User', UserSchema);

export default User;