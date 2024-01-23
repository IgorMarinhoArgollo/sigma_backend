import express, { Router } from 'express';
import UserController from '../controller/UserController';

export default class UserRouter {
  private router: Router;
  private userController;

  constructor(userController: UserController) {
    this.router = express.Router();
    this.userController = userController;
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/', this.userController.getAllUsers);

    this.router.get('/:email', this.userController.getUserByEmail);

    this.router.post('/', this.userController.createUser);

    this.router.put('/:id', this.userController.updateUserById);

    this.router.delete('/:id', this.userController.deleteUserById);
  }

  public getRouter(): Router {
    return this.router;
  }
}
