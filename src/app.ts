import express, { Express } from 'express';
import cors from 'cors';
import MongoDBConnection from './db/connection';
import errorMiddleware from './middleware/ErrorHandler';
import AccessControlMiddleware from './middleware/AccessControllMiddleware';
import UserRouter from './router/UserRouter';
import UserController from './controller/UserController';
import UserService from './service/UserService';
import UserModel from './model/UserModel';
import LoginRouter from './router/LoginRouter';
import LoginController from './controller/LoginController';
import LoginService from './service/LoginService';
import limiter from './helper/RateLimiter';
import helmet from 'helmet';


export class App {
  private app: Express;
  dbConnection: MongoDBConnection;

  loginController: LoginController;
  loginRouter: LoginRouter;
  loginService: LoginService;

  userController: UserController;
  userRouter: UserRouter;
  userService: UserService;
  

  constructor() {
    this.app = express();
    this.app.use(helmet())
    this.app.use(limiter);

    this.dbConnection = MongoDBConnection.getInstance();
    this.connectToDatabase();
    this.config();

    this.loginService = new LoginService(UserModel);
    this.loginController = new LoginController(this.loginService);
    this.loginRouter = new LoginRouter(this.loginController);

    this.userService = new UserService(UserModel);
    this.userController = new UserController(this.userService);
    this.userRouter = new UserRouter(this.userController);

    this.setupRoutes();

    this.errorMiddleware();

  }

  private async connectToDatabase() {
    await this.dbConnection.connect();
  }
  
  private config():void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(AccessControlMiddleware.handleAccessControl);
  }
    
  private setupRoutes() {
    this.app.use('/user', this.userRouter.getRouter());
    this.app.use('/', this.loginRouter.getRouter())
  }

  private errorMiddleware(): void {
    this.app.use(errorMiddleware.handle);
  }

  public getApp(): Express {
    return this.app;
  }
}