import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";
import { TErrorSources } from "../interface/error";

// Custom error class for Authentication Error
class AuthError extends AppError {
    constructor(message: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

// Custom error class for Authorization Error
class AuthzError extends AppError {
    constructor(message: string) {
        super(StatusCodes.FORBIDDEN, message);
    }
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = StatusCodes.BAD_REQUEST;
    let message = 'Something went wrong';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ];

    // Handle Authentication error (Unauthorized)
    if (err instanceof AuthError) {
        statusCode = StatusCodes.UNAUTHORIZED;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: 'Authentication failed. Please provide valid credentials.'
            }
        ];
    }
    // Handle Authorization error (Forbidden)
    else if (err instanceof AuthzError) {
        statusCode = StatusCodes.FORBIDDEN;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: 'You are not authorized to perform this action.'
            }
        ];
    }
    // Handle Zod validation error
    else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Handle Mongoose validation error
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Handle Mongoose cast error
    else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Handle duplicate key error (e.g., unique field violation)
    else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Handle AppError (custom error)
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: '',
                message: err?.message
            }
        ];
    }
    // Handle generic Error (internal server error)
    else if (err instanceof Error) {
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        message = 'Internal Server Error';
        errorSources = [
            {
                path: '',
                message: err?.message
            }
        ];
    }

    // Return the error response
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        error: errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
    });
};

export default globalErrorHandler;
