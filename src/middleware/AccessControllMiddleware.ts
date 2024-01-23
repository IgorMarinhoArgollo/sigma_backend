import  { Request, Response, NextFunction } from 'express';

class AccessControlMiddleware {
  public static handleAccessControl(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  }
}

export default AccessControlMiddleware;
