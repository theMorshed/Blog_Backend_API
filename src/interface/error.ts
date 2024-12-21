/**
 * Type definitions for structured error handling.
 * 
 * `TErrorSources` represents an array of error details, where each error includes:
 * - `path`: The field or property where the error occurred (can be a string or number).
 * - `message`: A descriptive error message for the issue.
 * 
 * `TGenericErrorResponse` defines the structure of a standardized error response:
 * - `statusCode`: The HTTP status code representing the error.
 * - `message`: A summary of the error or issue.
 * - `errorSources`: An array of detailed error information, adhering to `TErrorSources`.
 */

export type TErrorSources = {
    path: string | number;
    message: string;
}[];

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
};
