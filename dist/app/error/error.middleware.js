"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = require("mongoose");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = err;
    if (err instanceof mongoose_1.Error.ValidationError) {
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
exports.globalErrorHandler = globalErrorHandler;
