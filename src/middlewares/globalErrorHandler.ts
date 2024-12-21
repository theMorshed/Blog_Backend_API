/**
 * Importing necessary modules and utilities:
 * - `NextFunction`, `Request`, `Response` from Express: Used to define middleware function signature.
 * - `StatusCodes` from `http-status-codes`: Provides standard HTTP status codes.
 * - `ZodError`: Handles validation errors thrown by Zod schema validation.
 * - `config`: Configuration object for environment variables.
 * - Custom error handlers: Functions to handle different types of errors (Zod, Mongoose, etc.).
 * - `TErrorSources`: Type definition for structured error sources in the response.
 */
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

/**
 * Global error handler middleware that catches various types of errors and formats them in a consistent response structure.
 * Handles the following error types:
 * - Zod validation errors.
 * - Mongoose validation errors.
 * - Mongoose cast errors (e.g., invalid ObjectId).
 * - MongoDB duplicate key errors.
 * - Custom AppError (application-specific errors).
 * - Generic JavaScript errors (e.g., unhandled exceptions).
 * 
 * The error response includes:
 * - `statusCode`: HTTP status code.
 * - `message`: A brief message describing the error.
 * - `error`: An array of error sources, with paths and messages.
 * - `stack`: The stack trace (only included in development).
 * 
 * @param err - The error object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = StatusCodes.BAD_REQUEST;
    let message = 'Something went wrong';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ];

    if (err instanceof ZodError) {
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
                message: err?.message || 'An unexpected error occurred.'
            }
        ];
    }

    // Log unexpected errors in development or production
    if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR && config.NODE_ENV === "development") {
        console.error("Unhandled Error:", err);
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