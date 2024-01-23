import { IUser } from '../interface/IUser';
import UserModel from '../model/UserModel';

export default class UserService {
  private userModel;

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async getAllUsers(): Promise<IUser[]> {
    return this.userModel.find();
  }

  public async getUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({"email": email});
  }

  public async createUser(userData: IUser): Promise<IUser> {
    return this.userModel.create(userData);
  }

  public async updateUserById(id: string, newData: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, newData, { new: true });
  }

  public async deleteUserById(id: string): Promise<IUser | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
