import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { AppError } from '../errors/AppError';
import { isCelebrateError } from 'celebrate';
const handleException = (
  error: TypeError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next();
  } else {
    let type, msg;
    if (isCelebrateError(error)) {
        if (error.details.get('body')) {
            type = 'body';
        } else {
            type = 'params';
        }
        msg = error.details.get(type).details[0].message
        error = new AppError(msg, 400);
    }
    
    if (!(error instanceof AppError)) {
      error = new AppError(error.message, 500);
    }
    let { message, statusCode } = error as AppError;

    message = message.replace(/\r?\n|\r/g, '').replace(/\\/g, ' ').replace(/"/g, '');
    
    logger.error(`Error:: ${message}`)
    res.status(statusCode).json({
      success: false,
      message: message.replace(/\\/g, ' ')
    });
  }
};

export default handleException;
