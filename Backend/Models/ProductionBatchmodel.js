// models/ProductionBatch.js
import mongoose from "mongoose";

const ProductionBatchSchema = new mongoose.Schema({
  productionBatchCode: {
    type: String,
    required: true,
    unique: true
  },
  createdDate: {
    type: Date, // Using Date type for better date handling
    required: true,
    default: Date.now // Automatically sets the date to now if not provided
  },
  createdBy: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Location model
    ref: 'Location',
    required: true,
  },
  selectedProducts: [{
    product: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
      ref: 'Product',
      required: true,
    },
    in_stock_quantity: {
      type: Number,
      //default: 0,
      required: true,
    },
    price: {
      type: Number,
      //default: 0,
      required: true,
    }
  }],
});
const ProductionBatch = mongoose.model("ProductionBatch", ProductionBatchSchema);
export default ProductionBatch;

