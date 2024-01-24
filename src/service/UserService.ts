import { IUser } from '../interface/IUser';
import UserModel from '../model/UserModel';
import BCrypt from '../helper/BCrypt';

export default class UserService {
  private userModel;

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async getAllUsers(): Promise<IUser[]> {
    const users = await this.userModel.find({}, { _id: 0, __v: 0, 'user.password': 0 }).lean();

    const mappedUsers: IUser[] = [];

    users.forEach((user) => {
      const allowView: string[] = [];

      user.permissions.forEach((permission) => {
        const parts = permission.split(':');
        if (parts[parts.length - 1] === 'view') {
          allowView.push(parts[parts.length - 2]);
        }
      });

      const mappedUser: IUser = {
        user: {
          firstname: allowView.includes('firstname') ? user.user?.firstname : undefined,
          lastname: allowView.includes('lastname') ? user.user?.lastname : undefined,
          email: allowView.includes('email') ? user.user?.email : undefined,
        },
        permissions: user.permissions,
      };

      mappedUsers.push(mappedUser);
    });

    return mappedUsers;
  }

  public async getUserById(id: string): Promise<IUser | null> {
    const user = await this.userModel.findById(id, { _id: 0, __v: 0, 'user.password': 0 }).lean();

    if (!user) {
      return null;
    }
    
    const allowView: string[] = [];

    user.permissions.forEach((permission) => {
      const parts = permission.split(':');
      if (parts[parts.length - 1] === 'view') {
        allowView.push(parts[parts.length - 2]);
      }
    });

    const mappedUser: IUser = {
      user: {
        firstname: allowView.includes('firstname') ? user.user?.firstname : undefined,
        lastname: allowView.includes('lastname') ? user.user?.lastname : undefined,
        email: allowView.includes('email') ? user.user?.email : undefined,
      },
      permissions: user.permissions,
    };

    return mappedUser;
  }

  
  public async updateUserByEmail(email: string, newData: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findOneAndUpdate({"email": email}, newData, { new: true });
  }
  
  public async deleteUserById(id: string): Promise<IUser | null> {
    return this.userModel.findByIdAndDelete(id);
  }


  public async createUser(firstname: string, lastname: string, email: string, password: string, permissions: string[]): Promise<IUser> {
    try {
      const userData: IUser = {
        user: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: await BCrypt.encrypt(password),
        },
        permissions: permissions,
      };

      const createdUser = await this.userModel.create(userData);

      return createdUser.toObject();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw new Error('Erro ao criar usuário.');
    }
  }

}
