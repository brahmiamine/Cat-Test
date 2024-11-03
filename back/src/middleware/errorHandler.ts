import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import logger from "../utils/logger";
import { sendError } from "../utils/responseHandler";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || "Internal Server Error";

  logger.error(`Error: ${message}`, { statusCode, stack: err.stack });

  sendError(res, message, statusCode);
};

export { errorHandler };
