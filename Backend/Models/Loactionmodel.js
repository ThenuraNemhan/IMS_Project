import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    location_code: {type: String, required:true, unique: true},
    location_name: { type: String, required: true },
    status: {type:String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model('Location', LocationSchema);
export default Location;