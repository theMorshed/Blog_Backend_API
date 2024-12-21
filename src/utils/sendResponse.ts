/**
 * Utility function to send a structured JSON response.
 *
 * This function standardizes the API response format, ensuring consistency across the application.
 * It accepts a generic type `T` to accommodate various types of response data.
 *
 * @template T - The type of the response data.
 * 
 * @param {Response} res - The Express Response object.
 * @param {TResponse<T>} data - An object containing the response details:
 *  - `statusCode` (number): The HTTP status code of the response.
 *  - `success` (boolean): Indicates whether the request was successful.
 *  - `message` (string): A message describing the result of the operation.
 *  - `data` (T): The response payload, typically the requested resource or operation result.
 *
 * @returns {void} Sends a JSON response with the specified structure.
 */

import { Response } from "express";

type TResponse<T> = {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data?.statusCode).json({
        success: data.success,
        message: data.message,
        statusCodes: data?.statusCode,
        data: data.data,
    });
};

export default sendResponse;
