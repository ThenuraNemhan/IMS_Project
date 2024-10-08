// utils/generateLocationCode.js
import Counter from "../Models/Counter.js";

const generateLocationCode = async (prefix) => {
  const counter = await Counter.findOneAndUpdate(
    { name: "location_Code" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  
  const sequenceNumber = counter.sequence_value.toString().padStart(4, '0');
  return `${prefix}-${sequenceNumber}`;
};

export default generateLocationCode;
