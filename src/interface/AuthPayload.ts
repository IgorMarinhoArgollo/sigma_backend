import { JwtPayload } from 'jsonwebtoken';

interface AuthPayload extends JwtPayload {
  email: string;
}

export default AuthPayload;