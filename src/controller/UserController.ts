import { NextFunction, Request, Response } from 'express';
import UserService from '../service/UserService';
import AuthPayload from '../interface/AuthPayload';
import * as jwt from 'jsonwebtoken';


export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
  }


  public async getUser(req: Request, res: Response, _next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(404).json({ message: 'User nor found' });
      }
      const token = authorization.split(' ');
      const email = (jwt.verify(token[1], process.env.JWT_SECRET || 'secret') as AuthPayload).email;
      
      const user = await this.userService.getUser(email);
      console.log(user);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async createUser(req: Request, res: Response, _next: NextFunction) {
    try {
      const { user, permissions } = req.body
      const { firstname, lastname, email, password } = user;
      const newUser = await this.userService.createUser(firstname, lastname, email, password, permissions);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async updateUser(req: Request, res: Response, _next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(404).json({ message: 'User nor found' });
      }
      const token = authorization.split(' ');
      const email = (jwt.verify(token[1], process.env.JWT_SECRET || 'secret') as AuthPayload).email;
      

      const original = await this.userService.getUserByEmail(email);
      if (!original) {
        return res.status(404).json({ error: 'User not found' });
      }

       
      const updatedUser = await this.userService.updateUser(original, req.body)
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async deleteUserById(req: Request, res: Response, _next: NextFunction) {
    try {
      const deletedUser = await this.userService.deleteUserById(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
