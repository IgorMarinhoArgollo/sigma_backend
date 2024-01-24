import { IUser } from '../interface/IUser';
import UserModel from '../model/UserModel';
import BCrypt from '../helper/BCrypt';


export default class UserService {
  private userModel;

  constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }


  public async getUser(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({"user.email": email}).lean();

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

  // no filter
  public async getUserByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.findOne({ "user.email": email }).lean();
  }

  public async updateUser(original: IUser, newData: Partial<IUser>): Promise<IUser | null> {
    const allowEdit: string[] = [];

    original.permissions.forEach((permission) => {
      const parts = permission.split(':');
      if (parts[parts.length - 1] === 'edit') {
        allowEdit.push(parts[parts.length - 2]);
      }
    });


    try {
      console.log('Allow Edit:', allowEdit);
      console.log('Original User:', original);
      console.log('New Data:', newData);

      if (allowEdit.includes("firstname") && newData.user?.firstname && newData.user.firstname.trim() !== '') {
        const updatedUser = await this.userModel.findOneAndUpdate(
          { "user.email": original.user.email },
          { $set: { "user.firstname": newData.user.firstname } },
          { new: true }
        );

        if (updatedUser) {
          console.log('User updated successfully:', updatedUser);
        } else {
          console.log('User not found or update failed.');
        }
      }
      
      if (allowEdit.includes("lastname") && newData.user?.lastname && newData.user.lastname.trim() !== '') {
        await this.userModel.findOneAndUpdate({ "user.email": original.user.email }, { "user.lastname": newData.user?.lastname })
      }

        if (!await this.userModel.findOne({ "user.email": newData.user?.email })) {
          if (allowEdit.includes("email") && newData.user?.email && newData.user.email.trim() !== '') {
            await this.userModel.findOneAndUpdate({ "user.email": original.user.email }, { "user.email": newData.user?.email })
          }
        }

      if (newData.user?.email) {
        return await this.userModel.findOne({ "user.email": newData.user.email })
      }
      return await this.userModel.findOne({ "user.email": original.user.email })
    } catch (error) {
      console.error("Error: it was not possible to update user");
      return null;
    }
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
