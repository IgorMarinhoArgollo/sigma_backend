import express, { Express } from 'express';
import cors from 'cors';
import MongoDBConnection from './db/connection';
import errorMiddleware from './middleware/ErrorHandler';
import AccessControlMiddleware from './middleware/AccessControllMiddleware';
import UserRouter from './router/UserRouter';
import UserController from './controller/UserController';
import UserService from './service/UserService';
import UserModel from './model/UserModel';

export class App {
  private app: Express;
  dbConnection: MongoDBConnection;
  userController: UserController;
  userRouter: UserRouter;
  userService: UserService;
  

  constructor() {
    this.app = express();
    this.dbConnection = MongoDBConnection.getInstance();
    this.connectToDatabase();
    this.config();

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
  }

  private errorMiddleware(): void {
    this.app.use(errorMiddleware.handle);
  }

  public getApp(): Express {
    return this.app;
  }
}