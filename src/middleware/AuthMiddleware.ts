import { NextFunction, Request, Response } from "express";
import UserModel from "../model/UserModel";
import * as jwt from 'jsonwebtoken';
import AuthPayload from "../interface/AuthPayload";


export default class AuthMiddleware {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
      }
      
      try {
        const token = authorization.split(' ');
        const decoded = jwt.verify(token[1], process.env.JWT_SECRET || 'secret') as AuthPayload;
        
        if (await UserModel.findOne({ "user.email": decoded.email })) {
          next();
        } else {
          return res.status(401).json({ message: 'User not authorized' });
        }
      } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
      }
    } catch (error) {
      next(error);
    }
  }
}
