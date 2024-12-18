import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { loginService, registerService } from "./user.service";

export const register = catchAsync(async(req, res) => {
    
    const user = await registerService(req.body);
    const result = {
        _id: user._id,
        name: user.name,
        email: user.email
    }

    sendResponse(res, {
        success: true,
        message: 'User registered successfully',
        statusCode: StatusCodes.CREATED,
        data: result
    })
})

export const login = catchAsync(async(req, res) => {
    const { email, password } = req.body;
    const user = await loginService(email, password);

    res.status(200).json({
        success: true,
        message: 'Login successful',
        statusCode: StatusCodes.OK,
        data: {
            token: user.token
        }
    })
})