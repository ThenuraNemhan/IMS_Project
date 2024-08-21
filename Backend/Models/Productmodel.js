import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    product_name: { type: String, required: true, unique: true },
    product_category: { type: String, required: true },
    product_description: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_countInStock: { type: Number, required: true },
    unit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit", // Reference to the Location model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;