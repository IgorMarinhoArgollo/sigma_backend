import { Express } from 'express';
import { App } from './app';
import * as dotenv from 'dotenv';


class Server {
  private port: string | number;
  private appInstance: Express;

  constructor() {
    dotenv.config();
    this.port = process.env.PORT || 3000;
    const app = new App();
    this.appInstance = app.getApp();

    this.startServer();
  }

  private startServer() {
    this.appInstance.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
  }
}

new Server();