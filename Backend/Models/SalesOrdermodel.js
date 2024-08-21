import mongoose from "mongoose";

const SalesOrderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", // Reference to the Customer model
      required: true,
    },
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location", // Reference to the Location model
      required: true,
    },
    order_date: { type: Date, required: true },
    orderItems: [
      {
        orderItem_name: { type: String, required: true },
        orderqty: { type: Number, required: true },
        unit_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Unit", // Reference to the Unit model
          required: true,
        },
        orderItem_price: { type: Number, required: true },
        Product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
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

const SalesOrder = mongoose.model("SalesOrder", SalesOrderSchema);
export default SalesOrder;
