/**
 * Import necessary modules and utilities.
 * - `NextFunction`, `Request`, `Response` from Express: Types for Express middleware and HTTP request/response objects.
 * - `statusCodes` from `http-status-codes`: Provides constants for standard HTTP status codes (e.g., 404 for Not Found).
 */
import { NextFunction, Request, Response } from "express";
import statusCodes from 'http-status-codes';

/**
 * Middleware function to handle 404 errors for routes that do not exist.
 * 
 * When a request is made to a route that does not match any of the defined routes, this middleware is triggered.
 * It responds with a 404 status code and a message indicating that the API was not found.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @returns A JSON response with the status code 404, a success flag, and a message.
 */
const notFound = (req: Request, res: Response, next: NextFunction): any => {
    return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: 'API not Found',
        error: ''
    })
}

export default notFound;
