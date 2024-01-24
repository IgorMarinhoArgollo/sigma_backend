import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user: {
    firstname: {
      type: String,
      required: true,
      nullable: false
    },
    lastname: {
      type: String,
      required: true,
      nullable: false
    },
    email: {
      type: String,
      required: true,
      nullable: false
    },
    password: {
      type: String,
      required: true,
      nullable: false
    }
  },
  permissions: {
    type: [String],
    default: []
  }
});
const UserModel = mongoose.model('User', userSchema);

export default UserModel;