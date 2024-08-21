import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema(
  {
    unit_code: { type: String, required: true, unique: true }, // Unique identifier for the unit
    unit_name: { type: String, required: true }, // Descriptive name for the unit
  },
  {
    timestamps: true,
  }
);

const Unit = mongoose.model('Unit', UnitSchema);
export default Unit;
