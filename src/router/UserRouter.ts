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
    this.router.get('/', this.userController.getAllUsers);

    // While login in I can send the Id
    this.router.get('/:id', authMiddleware.handle, this.userController.getUserById); 

    this.router.post('/', this.userController.createUser);

    this.router.put('/:email', authMiddleware.handle, this.userController.updateUserByEmail); //

    this.router.delete('/:id', this.userController.deleteUserById);
  }

  public getRouter(): Router {
    return this.router;
  }
}


