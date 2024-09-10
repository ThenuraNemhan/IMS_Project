// models/Counter.js
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name to identify the type of counter (e.g., 'productCode', 'customerCode')
  sequence_value: { type: Number, default: 0 }, // The current sequence number
});

const Counter = mongoose.model("Counter", CounterSchema);
export default Counter;
