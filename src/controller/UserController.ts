import { NextFunction, Request, Response } from 'express';
import UserService from '../service/UserService';

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUserByEmail = this.updateUserByEmail.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
  }

  public async getAllUsers(_req: Request, res: Response, _next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getUserById(req: Request, res: Response, _next: NextFunction) {
    try {
      const user = await this.userService.getUserById(req.params.id);
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

  public async updateUserByEmail(req: Request, res: Response, _next: NextFunction) {
    try {
      const updatedUser = await this.userService.updateUserByEmail(
        req.params.email,
        req.body
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
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
