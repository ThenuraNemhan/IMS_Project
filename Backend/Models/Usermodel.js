import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    user_code:{type: String, required: true, unique: true},
    username: { type: String, required: true },
    user_email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['Main Admin', 'Company Admin', 'User'], 
      default: 'User' 
    },
    status: {type:String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);
export default User;
