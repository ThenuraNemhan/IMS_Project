import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productionBatch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionBatch",
    required: false,
  },
  orderCycle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderCycle",
    required: false,
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: false,
  },
  movement_type: {
    type: String,
    enum: ['Add', 'Remove', 'Transfer', 'Sale', 'Return', 'Adjustment'],
    required: true,
  },
  movement_qty: {
    type: Number,
    required: true,
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  updated_stock_qty: {
    type: Number,
    required: true,
  },
  updated_price: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  user_role: {
    type: String,
    enum: ['MainAdmin', 'OrgAdmin', 'DefaultUser'],
    required: true,
  },
  performed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Ensure no duplicate entries for the same product in the same location and context (e.g., production batch, order cycle)
StockMovementSchema.index(
  { product_id: 1, location_id: 1, productionBatch_id: 1, orderCycle_id: 1, order_id: 1 },
  { unique: true }
);

const StockMovement = mongoose.model("StockMovement", StockMovementSchema);
export default StockMovement;
