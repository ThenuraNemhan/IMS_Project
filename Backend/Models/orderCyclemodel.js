import mongoose from "mongoose";

const OrderCycleSchema = new mongoose.Schema({
  orderCycleCode: {
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
  location: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Location model
    ref: 'Location',
    required: true,
  },
  // Array of production batches associated with this order cycle
  productionBatches: [{
    batch: {
      type: mongoose.Schema.Types.ObjectId, // Reference to ProductionBatch model
      ref: 'ProductionBatch',
      required: true
    },
    // Captures the latest stock and price for this production batch at the time of order creation
    products: [{
      product: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
        ref: 'Product',
        required: true,
      },
      latestInStockQuantity: {
        type: Number,
        required: true,
        default: 0, // Default stock value
      },
      latestPrice: {
        type: Number,
        required: true,
        default: 0, // Default price value
      }
    }]
  }],
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Pending'], // Status options for the order cycle
    default: 'Active',
    required: true,
  },
});

const OrderCycle = mongoose.model("OrderCycle", OrderCycleSchema);
export default OrderCycle;
