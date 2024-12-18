import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBlogService, deleteBlogService, updateBlogService } from "./blog.service";
import User from "../user/user.model";

export const createBlog = catchAsync(async (req, res) => {
    // Extract the authenticated user's ID as the author
    const author = req.user.id;

    // Pass the blog data and author to the service
    const blog = await createBlogService({ ...req.body, author });
    const user = await User.findById(author);

    const result = {
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        author: {
            id: user?.id,
            name: user?.name,
            email: user?.email
        }, // Include user info in the response
        isPublished: blog.isPublished,
    };

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Blog created successfully',
        data: result
    })
});

export const updateBlog = catchAsync(async (req, res) => {
    const id = req.params.id;
    // Extract the authenticated user's ID as the author
    const author = req.user.id;

    // Pass the blog data and author to the service
    const blog = await updateBlogService(id, req.body);
    const user = await User.findById(author);

    const result = {
        _id: blog?._id,
        title: blog?.title,
        content: blog?.content,
        author: {
            id: user?.id,
            name: user?.name,
            email: user?.email
        } // Include user info in the response
    };

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog updated successfully',
        data: result
    })
});

export const deleteBlog = catchAsync(async (req, res) => {
    const id = req.params.id;

    // Pass the blog data and author to the service
    const blog = await deleteBlogService(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully',
        data: null
    })
});