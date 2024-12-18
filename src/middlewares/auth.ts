import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import AppError from "../errors/AppError";
import User from "../modules/user/user.model";

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized user');
        }

        const decoded = jwt.verify(token, config.jwt_access_secret!) as JwtPayload;
        
        const role = decoded.role;

        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not allowed to doing such kind of task..');
        }       
        
        req.user = decoded;

        next();
    })
}

export default auth;