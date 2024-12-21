import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";

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
    })
}

export default auth;