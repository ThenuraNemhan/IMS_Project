import mongoose from 'mongoose';

const TransferOrderReceiptSchema = new mongoose.Schema(
  {
    transfer_order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TransferOrder',
      required: true,
    },
    receipt_date: { type: Date, default: Date.now },
    from_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    to_location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        qty: { type: Number, required: true },
        unit_price: { type: Number, required: true },
        total_price: { type: Number, required: true },
      },
    ],
    total_amount: { type: Number, required: true },
    address_from: { type: String, required: true }, // Location address
    address_to: { type: String, required: true }, // Location address
  },
  {
    timestamps: true,
  }
);

const TransferOrderReceipt = mongoose.model('TransferOrderReceipt', TransferOrderReceiptSchema);
export default TransferOrderReceipt;
