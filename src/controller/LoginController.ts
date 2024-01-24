import { NextFunction, Request, Response } from 'express';
import LoginService from '../service/LoginService';

export default class LoginController {
  private loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;

    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await this.loginService.login(email, password);
      if (user == null) {
        return res.status(404).json({message: "user not found"})
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
