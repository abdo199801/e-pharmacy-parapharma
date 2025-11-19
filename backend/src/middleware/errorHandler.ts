import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  console.error('❌ Error:', err);

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        error = new AppError('Duplicate field value entered', 400);
        break;
      case 'P2014':
        error = new AppError('Invalid ID', 400);
        break;
      case 'P2003':
        error = new AppError('Invalid foreign key', 400);
        break;
      case 'P2025':
        error = new AppError('Record not found', 404);
        break;
      default:
        error = new AppError('Database error', 500);
        break;
    }
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    error = new AppError('Invalid data provided', 400);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Token expired', 401);
  }

  // Cast errors (for invalid ObjectId)
  if (err.name === 'CastError') {
    error = new AppError('Invalid resource ID', 400);
  }

  // Mongoose duplicate key error
  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue)[0];
    error = new AppError(`${field} already exists`, 400);
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values((err as any).errors).map((val: any) => val.message);
    error = new AppError(messages.join(', '), 400);
  }

  const statusCode = (error as AppError).statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};