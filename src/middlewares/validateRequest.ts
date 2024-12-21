/**
 * Importing necessary modules
 * - `NextFunction`, `Request`, `Response` from Express: Used to define the middleware function signature.
 * - `AnyZodObject` from Zod: Represents the Zod schema used for request validation.
 * - `catchAsync`: Utility to handle asynchronous errors in Express middleware.
 */
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

/**
 * Middleware to validate incoming request data using a Zod schema.
 * 
 * This middleware validates the request body using the provided Zod schema. If the validation fails, an error will be thrown.
 * If the validation passes, the middleware allows the request to proceed to the next handler.
 * 
 * @param schema - The Zod schema used to validate the request body.
 * @returns A function that processes the request and calls the next middleware if validation is successful.
 */
const validateRequest = (schema: any) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync(req.body);
        next();
    })
}

export default validateRequest;
