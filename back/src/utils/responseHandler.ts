import { Response } from "express";

export const sendSuccess = (res: Response, data: any, message = "Success", statusCode = 200): Response => {
    return res.status(statusCode).json({
        status: "success",
        message,
        data,
    });
};

export const sendError = (
    res: Response,
    error: Error | string,
    statusCode = 500,
    customMessage?: string
): Response => {
    const message = customMessage || (error instanceof Error ? error.message : error);
    return res.status(statusCode).json({
        status: "error",
        message,
    });
};
