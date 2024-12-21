/**
 * Importing necessary modules and utilities:
 * - `NextFunction`, `Request`, `Response` from Express: Used to define middleware function signature.
 * - `catchAsync`: Utility to handle async errors in middleware.
 * - `StatusCodes` from `http-status-codes`: Provides standard HTTP status codes.
 * - `jwt`, `JwtPayload`: JSON Web Token library for verifying and decoding JWT tokens.
 * - `config`: Configuration object for environment variables.
 * - `AppError`: Custom error class for handling application-specific errors.
 */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";

/**
 * Middleware function to authenticate and authorize a user based on their JWT token and roles.
 * - Verifies the JWT token from the Authorization header.
 * - Checks if the user's role matches any of the required roles provided as arguments.
 * - If authorization fails, it throws an `AppError` with an appropriate message and status code.
 * - Attaches the decoded user information to the `req.user` object.
 * 
 * @param requiredRoles - Array of roles that are allowed to access the resource.
 * @returns A middleware function that handles authentication and authorization.
 */

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        // Check if the Authorization header exists and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized user');
        }

        // Extract the token by removing the "Bearer " prefix
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Authentication failed. Invalid credentials.");
        }

        // Verify the token
        const decoded = jwt.verify(token, config.jwt_access_secret!) as JwtPayload;

        // Check the user's role
        const role = decoded.role;
        if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
            throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized to access this resource.');
        }

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    });
};

export default auth;
