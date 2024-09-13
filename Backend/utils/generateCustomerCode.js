// utils/generateCustomerCode.js
import Counter from "../Models/Counter.js";

const generateCustomerCode = async (prefix) => {
  const counter = await Counter.findOneAndUpdate(
    { name: "customer_code" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  
  const sequenceNumber = counter.sequence_value.toString().padStart(4, '0');
  return `${prefix}-${sequenceNumber}`;
};

export default generateCustomerCode;
