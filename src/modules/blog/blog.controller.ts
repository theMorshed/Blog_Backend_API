/**
 * Import necessary modules and utilities.
 * - `StatusCodes` from `http-status-codes`: Provides predefined HTTP status codes.
 * - `catchAsync`: Utility to handle async errors in Express middleware.
 * - `sendResponse`: Utility function to standardize API responses.
 * - Blog service functions: `createBlogService`, `deleteBlogService`, `getAllBlogsService`, `updateBlogService` for handling blog-related operations.
 * - `User`: The User model used to interact with the user collection in the database.
 * - `Blog`: The Blog model used to interact with the blog collection in the database.
 * - `AppError`: Custom error class to handle application-specific errors.
 */
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBlogService, deleteBlogService, getAllBlogsService, updateBlogService } from "./blog.service";
import User from "../user/user.model";
import Blog from "./blog.model";
import AppError from "../../errors/AppError";

/**
 * Controller function to create a new blog.
 * 
 * This function extracts the authenticated user's ID as the author, checks the user, 
 * and then calls the `createBlogService` to create the blog. The response includes 
 * the created blog along with author information.
 * 
 * @param req - The Express request object, which contains the blog data in `req.body`.
 * @param res - The Express response object, used to send the response.
 * @returns A JSON response with the status code 201, success flag, message, and created blog data.
 */
export const createBlog = catchAsync(async (req, res) => {
    const author = req.user.id;
    const user = await User.findById(author);

    const blog = await createBlogService({ ...req.body, author });

    const result = {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        author: {
            id: user?.id,
            name: user?.name,
            email: user?.email
        },
        isPublished: blog.isPublished,
    };

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Blog created successfully',
        data: result
    })
});

/**
 * Controller function to fetch all blogs.
 * 
 * This function retrieves a list of all blogs based on the query parameters in `req.query`
 * and sends the list of blogs in the response.
 * 
 * @param req - The Express request object, which may contain query parameters for filtering.
 * @param res - The Express response object, used to send the response.
 * @returns A JSON response with the status code 200, success flag, message, and the list of blogs.
 */
export const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await getAllBlogsService(req.query);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blogs fetched successfully',
        data: blogs
    })
});

/**
 * Controller function to update an existing blog.
 * 
 * This function checks if the user is the author of the blog, then updates the blog 
 * using the `updateBlogService`. The updated blog data is returned in the response.
 * 
 * @param req - The Express request object, which contains the blog data to update in `req.body`.
 * @param res - The Express response object, used to send the response.
 * @returns A JSON response with the status code 200, success flag, message, and updated blog data.
 * @throws AppError - If the blog does not exist or the user is not the author of the blog.
 */
export const updateBlog = catchAsync(async (req, res) => {
    const id = req.params.id;
    const author = req.user.id;
    const user = await User.findById(author);

    const blogExists = await Blog.findOne({_id: id, author: user});
    if (!blogExists) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not the author of this blog!!');
    }

    const blog = await updateBlogService(id, req.body);

    const result = {
        _id: blog?._id,
        title: blog?.title,
        content: blog?.content,
        author: {
            id: user?.id,
            name: user?.name,
            email: user?.email
        }
    };

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog updated successfully',
        data: result
    })
});

/**
 * Controller function to delete an existing blog.
 * 
 * This function checks if the user is the author of the blog, then deletes the blog 
 * using the `deleteBlogService`. A success message is returned in the response.
 * 
 * @param req - The Express request object, which contains the ID of the blog to delete in `req.params.id`.
 * @param res - The Express response object, used to send the response.
 * @returns A JSON response with the status code 200, success flag, message, and no data.
 * @throws AppError - If the blog does not exist or the user is not the author of the blog.
 */
export const deleteBlog = catchAsync(async (req, res) => {
    const id = req.params.id;
    const author = req.user.id;
    const user = await User.findById(author);

    const blogExists = await Blog.findOne({_id: id, author: user});
    if (!blogExists) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You cannot delete this blog as you are not the author of this blog!!');
    }

    await deleteBlogService(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully',
        data: null
    })
});