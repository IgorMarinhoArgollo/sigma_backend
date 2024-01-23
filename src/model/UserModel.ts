import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/IUser';


const viewPermissionSchema = new Schema({
  firstName: Boolean,
  lastName: Boolean,
  email: Boolean,
  password: Boolean,
}, { _id: false });

const editPermissionSchema = new Schema({
  firstName: Boolean,
  lastName: Boolean,
  email: Boolean,
  password: Boolean,
}, { _id: false });

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      immutable: true,
    },
    viewPermission: {
      type: viewPermissionSchema,
      required: true,
      immutable: true,
    },
    editPermission: {
      type: [editPermissionSchema],
      required: true,
      immutable: true,
    },
  },
  { timestamps: true, versionKey: false }
);


const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
