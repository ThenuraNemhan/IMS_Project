import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    comapny_code: { type: Number, required: true },
    company_name: { type: String, required: true },
    company_BRN: { type: String, required: true },
    owner_name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model('Company', CompanySchema);
export default Company;