import mongoose from 'mongoose';

const SalesOrderInvoiceSchema = new mongoose.Schema(
  {
    sales_order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SalesOrder',
      required: true,
    },
    invoice_date: { type: Date, default: Date.now },
    customer_name: { type: String, required: true },
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
    tax_amount: { type: Number, required: true },
    final_amount: { type: Number, required: true },
    address: { type: String, required: true }, // Customer address
  },
  {
    timestamps: true,
  }
);

const SalesOrderInvoice = mongoose.model('SalesOrderInvoice', SalesOrderInvoiceSchema);
export default SalesOrderInvoice;
