import mongoose from "mongoose";

const TransferOrderSchema = new mongoose.Schema(
  {
    from_location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    to_location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    transfer_order_date: { type: Date, default: Date.now },
    
    transferOrderItems: [
      {
        transfer_order_id: { type: mongoose.Schema.Types.ObjectId, ref: "TransferOrder" },
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, required: true },
      },
    ],
    delivery_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryOrder",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TransferOrder = mongoose.model("TransferOrder", TransferOrderSchema);
export default TransferOrder;
