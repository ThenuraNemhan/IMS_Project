import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema(
  {
    Location_code: {type: Number, required:true},
    Location_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model('Location', LocationSchema);
export default Location;