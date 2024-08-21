import mongoose from 'mongoose';

const DeliveryOrderSchema = new mongoose.Schema(
  {
    sales_order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalesOrder', // Reference to the SalesOrder model
        required: true,
      },
    dispatch_order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'DispatchOrder', // refernece to the DispatchOrder
        required:true,
    },
    delivery_date: { type: Date, required: true },
    delivery_status: { type: Boolean, default: false },
    delivery_details: {
      from_location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
      },
      to_location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const DeliveryOrder = mongoose.model('DeliveryOrder', DeliveryOrderSchema);
export default DeliveryOrder;
