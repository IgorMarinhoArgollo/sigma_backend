import { IUser } from '../interface/IUser';
import UserModel from '../model/UserModel';

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

  public async createUser(userData: unknown): Promise<unknown> {
    return this.userModel.create(userData);
  }

  public async updateUserByEmail(email: string, newData: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findOneAndUpdate({"email": email}, newData, { new: true });
  }

  public async deleteUserById(id: string): Promise<IUser | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
