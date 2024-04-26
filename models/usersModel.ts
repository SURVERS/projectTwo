import { Schema, model, Document } from 'mongoose';

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserDocument extends User, Document {}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = model<UserDocument>('User', userSchema);

export default UserModel;
