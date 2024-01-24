import express, { Router } from 'express';
import UserController from '../controller/UserController';
import authMiddleware from '../middleware/AuthMiddleware';

export default class UserRouter {
  private router: Router;
  private userController;

  constructor(userController: UserController) {
    this.router = express.Router();
    this.userController = userController;
    this.setupRoutes();
  }

  private setupRoutes() {

    this.router.get('/', authMiddleware.handle, this.userController.getUser); 

    this.router.post('/', this.userController.createUser);

    this.router.put('/', authMiddleware.handle, this.userController.updateUser); //

    this.router.delete('/:id', this.userController.deleteUserById);
  }

  public getRouter(): Router {
    return this.router;
  }
}


