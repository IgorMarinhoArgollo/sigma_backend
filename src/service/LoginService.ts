import { TokenGenerator } from '../helper/TokenGenerator';
import BCrypt from '../helper/BCrypt';
import UserModel from '../model/UserModel';
import { ILogin } from '../interface/ILogin';

export default class LoginService {
  private userModel;

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async login(email: string, password: string): Promise<ILogin | null> {
    const user = await this.userModel.findOne({ "user.email": email });

    if (!user) {
      return null;
    }

    try {
      const validation = await BCrypt.compare(password, user.user?.password as string);

      if (validation) {
        const result = {
          token: TokenGenerator.generateToken(user.user?.email as string).token,
          id: user._id?.toString(),
        };
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao comparar senhas:', error);
      throw new Error('Erro ao comparar senhas.');
    }
  }
}
