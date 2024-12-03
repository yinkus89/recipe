"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.NotFoundError = exports.BadRequestError = exports.CustomError = void 0;
// Custom error class to handle different types of errors
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // Ensure the error instance has a stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
    }
}
exports.CustomError = CustomError;
// A more specific subclass for 400 errors
class BadRequestError extends CustomError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestError = BadRequestError;
// A more specific subclass for 404 errors
class NotFoundError extends CustomError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;
// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace to console
    // Check if the error is a CustomError
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // If the error is not a CustomError, handle it as a server error
    res.status(500).json({
        errorCode: 'SERVER_ERROR',
        message: 'Something went wrong. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map