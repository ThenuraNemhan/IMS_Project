import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['Main Admin', 'Company Admin', 'User'], 
      default: 'User' 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);
export default User;
