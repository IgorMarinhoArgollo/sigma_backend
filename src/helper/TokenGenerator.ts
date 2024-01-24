import * as jwt from 'jsonwebtoken';

export class TokenGenerator {
  private static readonly jwtSecret = process.env.JWT_SECRET || 'secret';
  private static readonly expiresIn = '60d';

  static generateToken(email: string): { token: string } {
    const token = `Bearer ${jwt.sign({ email }, this.jwtSecret, { expiresIn: this.expiresIn })}`;
    return { token };
  }
}
