import mongoose from "mongoose";

// Define customer types as an enumeration
const customerTypes = ['Distributor', 'Retailer', 'Dealer'];

const CustomerSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true },
    cus_address: { type: String, required: true },
    cus_mobileno: { type: String, required: true },
    cus_email: { type: String },
    customer_type: {
      type: String,
      enum: customerTypes, // Use the enum to limit the values
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
