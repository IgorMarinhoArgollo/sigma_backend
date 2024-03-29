import { Request, Response, NextFunction } from 'express';
import ICustomError from '../interface/ICustomError';

class ErrorHandler {
  static handle(err: ICustomError, req: Request, res: Response, _next: NextFunction): void {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ message });
  }
}

export default ErrorHandler;
