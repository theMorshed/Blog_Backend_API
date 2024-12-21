/**
 * Utility function to handle asynchronous errors in Express middleware.
 *
 * This function wraps an asynchronous Express middleware or route handler, ensuring that any errors
 * thrown during its execution are properly caught and passed to the next error-handling middleware.
 *
 * @param {RequestHandler} fn - An asynchronous middleware or route handler function.
 * 
 * @returns {RequestHandler} A new middleware function that wraps the provided `fn` with error handling.
 *
 * @example
 * import catchAsync from './catchAsync';
 *
 * app.get('/route', catchAsync(async (req, res, next) => {
 *     const data = await someAsyncFunction();
 *     res.json(data);
 * }));
 */

import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    };
};

export default catchAsync;
