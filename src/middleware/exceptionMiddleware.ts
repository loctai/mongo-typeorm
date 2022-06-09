import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { AppError } from '../errors/AppError';
const handleException = (
  error: TypeError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next();
  } else {
    // if (error instanceof AppError) {
        console.log(error);
    if (!(error instanceof AppError)) {
      error = new AppError(error.message, 500);
    }
    let { message, statusCode } = error as AppError;
    
    
    message = message.replace(/\r?\n|\r/g, '').replace(/\s+/g, ' ');
    logger.error(`Error:: ${message}`)
    res.status(statusCode).json({
      success: false,
      message
    });
  }
};

export default handleException;
