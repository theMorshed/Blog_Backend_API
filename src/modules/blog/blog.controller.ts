import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBlogService, deleteBlogService, getAllBlogsService, updateBlogService } from "./blog.service";
import User from "../user/user.model";
import Blog from "./blog.model";
import AppError from "../../errors/AppError";

export const createBlog = catchAsync(async (req, res) => {
    // Extract the authenticated user's ID as the author
    const author = req.user.id;
    const user = await User.findById(author);

    // Pass the blog data and author to the service
    const blog = await createBlogService({ ...req.body, author });

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


export const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await getAllBlogsService(req.query);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blogs fetched successfully',
        data: blogs
    })
});

export const updateBlog = catchAsync(async (req, res) => {
    const id = req.params.id;
    // Extract the authenticated user's ID as the author
    const author = req.user.id;
    const user = await User.findById(author);

    const blogExists = await Blog.findOne({_id: id, author: user});
    if (!blogExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'This blog does not exists or You are not the author of this blog!!');
    }

    // Pass the blog data and author to the service
    const blog = await updateBlogService(id, req.body);

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
    const author = req.user.id;
    const user = await User.findById(author);

    const blogExists = await Blog.findOne({_id: id, author: user});
    if (!blogExists) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Blog does not exists or You can not delete this blog as you are not the author of this blog!!');
    }

    // Pass the blog data and author to the service
    const blog = await deleteBlogService(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully',
        data: null
    })
});