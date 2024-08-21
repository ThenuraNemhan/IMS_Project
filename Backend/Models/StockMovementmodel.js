import mongoose from "mongoose";

const StockMovementSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  movement_type:{type: String, required:true },
  movement_qty:{type: Number, required:true},
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location", // Reference to the Location model
    required: true,
  },
  updateStockQty:{type:Number, required:true},
});

const StockMovement = mongoose.model("StockMovement", StockMovementSchema);
export default StockMovement;
