import express, { Router } from 'express';
import LoginController from '../controller/LoginController';

export default class LoginRouter {
  private router: Router;
  private loginController;

  constructor(loginController: LoginController) {
    this.router = express.Router();
    this.loginController = loginController;
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post('/', this.loginController.login);
  }

  public getRouter(): Router {
    return this.router;
  }
}
