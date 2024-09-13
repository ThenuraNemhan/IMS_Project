import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
  {
    organization_code: {type: String, required: true, unique: true},
    organization_name: { type: String, required: true },
    organization_BRN: { type: String, required: true },
    owner_name: { type: String, required: true },
    status: {type:String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model('Organization', OrganizationSchema);
export default Organization;