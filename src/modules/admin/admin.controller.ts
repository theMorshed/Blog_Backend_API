/**
 * Import necessary modules and utilities.
 * - `StatusCodes` from `http-status-codes`: Provides constants for HTTP status codes (e.g., OK, NOT_FOUND).
 * - `catchAsync`: Utility to handle asynchronous errors in Express middleware.
 * - `sendResponse`: Helper function to send standardized JSON responses.
 * - `blockUserService`, `deleteBlogService`: Services to handle user blocking and blog deletion.
 */
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blockUserService, deleteBlogService } from "./admin.service";

/**
 * Middleware function to block a user by their user ID.
 * 
 * The user ID is extracted from the request parameters, and the `blockUserService` is called to block the user.
 * A response is sent back indicating whether the user was blocked successfully.
 * 
 * @param req - The Express request object containing the user ID in the parameters.
 * @param res - The Express response object used to send the response.
 * @returns A JSON response with the success status, status code, message, and no data.
 */
export const blockUser = catchAsync(async (req, res) => {
    const id = req.params.userId;

    // Pass the id for block
    await blockUserService(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User blocked successfully',
        data: null
    })
});

/**
 * Middleware function to delete a blog by its ID.
 * 
 * The blog ID is extracted from the request parameters, and the `deleteBlogService` is called to delete the blog.
 * A response is sent back indicating whether the blog was deleted successfully.
 * 
 * @param req - The Express request object containing the blog ID in the parameters.
 * @param res - The Express response object used to send the response.
 * @returns A JSON response with the success status, status code, message, and no data.
 */
export const deleteBlog = catchAsync(async (req, res) => {
    const id = req.params.id;

    // Pass the id for block
    await deleteBlogService(id);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully',
        data: null
    })
});