import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);  // Log the error stack trace for debugging

  // Send a friendly error message
  res.status(500).json({
    message: 'Something went wrong. Please try again later.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,  // Send error details in development mode
  });
};

export default errorHandler;
