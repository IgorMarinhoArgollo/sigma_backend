import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  viewPermission: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  editPermission: Array<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>;
}