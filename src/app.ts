import express, { Express, Request, Response } from 'express';
import MongoDBConnection from './db/connection';

export class App {
  private app: Express;
  dbConnection: MongoDBConnection;

  constructor() {
    this.app = express();
    this.dbConnection = MongoDBConnection.getInstance();
    this.connectToDatabase();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.get('/', (_req: Request, res: Response) => {
      res.send('API running');
    });
  }

  private async connectToDatabase() {
    await this.dbConnection.connect();
  }

  public getApp(): Express {
    return this.app;
  }
}