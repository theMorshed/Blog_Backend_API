import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blockUserService, deleteBlogService } from "./admin.service";

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