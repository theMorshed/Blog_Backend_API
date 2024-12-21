/**
 * Import necessary modules and utilities.
 * - `StatusCodes` from `http-status-codes`: Used to define standard HTTP status codes.
 * - `AppError`: Custom error class for handling application-specific errors.
 * - `Blog`: The Blog model used to interact with the blog collection in the database.
 * - `User`: The User model used to interact with the user collection in the database.
 */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Blog from "../blog/blog.model";
import User from "../user/user.model";

/**
 * Service function to block a user by their ID.
 * 
 * This function checks if the user is already blocked by looking up the user's `isBlocked` field. 
 * If the user is already blocked, it throws an error. If not, it updates the user record to set `isBlocked` to true.
 * 
 * @param id - The ID of the user to be blocked.
 * @returns The updated user object after blocking.
 * @throws AppError - If the user is already blocked, throws a BAD_REQUEST error.
 */
export const blockUserService = async (id: string) => {
    const blockedUser = await User.findById(id);
    const blocked = blockedUser?.isBlocked;
    if (blocked) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'User already blocked!');
    }

    const user = await User.findByIdAndUpdate(id, { isBlocked: true });
    return user;
}

/**
 * Service function to delete a blog by its ID.
 * 
 * This function first checks if the blog exists. If not, it throws an error indicating that the blog was not found.
 * If the blog exists, it deletes the blog and returns the deleted blog object.
 * 
 * @param id - The ID of the blog to be deleted.
 * @returns The deleted blog object.
 * @throws AppError - If the blog does not exist, throws a NOT_FOUND error.
 */
export const deleteBlogService = async (id: string) => {
    const blogExists = await Blog.findById(id);
    if (!blogExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog does not exist');
    }
    
    const blog = await Blog.findByIdAndDelete(id);
    return blog;
}