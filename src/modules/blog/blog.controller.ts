import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { createBlogService } from "./blog.service";
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