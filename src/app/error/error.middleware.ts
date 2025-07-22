import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails = err;

 
  if (err instanceof Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errorDetails = err.errors;
  }

  
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message || message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
};
