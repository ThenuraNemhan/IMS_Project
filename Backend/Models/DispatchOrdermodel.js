import mongoose from "mongoose";

const DispatchOrderSchema = new mongoose.Schema(
  {
    sales_order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SalesOrder", // Reference to the SalesOrder model
      required: true,
    },
    dispatch_date: { type: Date, required: true }, // The date when the order is dispatched
    dispatch_notes: { type: String }, // Optional notes about the dispatch
    dispatch_location_details: {
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
    },
    delivery_order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryOrder", // Reference to the DeliveryOrder model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DispatchOrder = mongoose.model("DispatchOrder", DispatchOrderSchema);
export default DispatchOrder;
