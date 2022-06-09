import { Request, Response } from 'express';

const urlNotFoundHandler = (req: Request, res: Response) => {
  res.status(404);
  res.json({
    success: false,
    message: 'URL not found'
  });
};

export default urlNotFoundHandler;
