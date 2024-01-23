import express, { Express, Request, Response } from 'express';
import MongoDBConnection from './db/connection';
import errorMiddleware from './middleware/ErrorHandler';
import AccessControlMiddleware from './middleware/AccessControllMiddleware';

export class App {
  private app: Express;
  dbConnection: MongoDBConnection;

  constructor() {
    this.app = express();
    this.dbConnection = MongoDBConnection.getInstance();
    this.connectToDatabase();
    this.config();
    this.setupRoutes();
    this.errorMiddleware();
  }

  private async connectToDatabase() {
    await this.dbConnection.connect();
  }
  
  private config():void {
    this.app.use(express.json());
    this.app.use(AccessControlMiddleware.handleAccessControl);

  }
    
  private setupRoutes() {
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('API running');
    });
  }

  private errorMiddleware(): void {
    this.app.use(errorMiddleware.handle);
  }

  public getApp(): Express {
    return this.app;
  }
}