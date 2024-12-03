import { Request, Response, NextFunction } from 'express';

// Custom error class to handle different types of errors
class CustomError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // Ensure the error instance has a stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

// A more specific subclass for 400 errors
class BadRequestError extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}

// A more specific subclass for 404 errors
class NotFoundError extends CustomError {
  constructor(message: string) {
    super(404, message);
  }
}

// Centralized error handler middleware
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
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

export { CustomError, BadRequestError, NotFoundError, errorHandler };
