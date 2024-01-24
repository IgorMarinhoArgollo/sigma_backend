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

    // While login in I can send the Id
    this.router.get('/:id', this.userController.getUserById); 

    this.router.post('/', this.userController.createUser);

    this.router.put('/:email', this.userController.updateUserByEmail); //

    this.router.delete('/:id', this.userController.deleteUserById);
  }

  public getRouter(): Router {
    return this.router;
  }
}


// admin    65b07b034c30af5a718d6605
//  user1   65b0c20cd389945ced2b084d
// user 2   65b0c218d389945ced2b084f
// user3    65b0c22fd389945ced2b0851