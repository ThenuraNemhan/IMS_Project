import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    product_code: {type: String, required: true, unique: true},
    product_name: { type: String, required: true },
    product_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    product_description: { type: String, required: true },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },
    //images: [String],  // Array to hold image URLs
    productDate: { type: Date },
    status: {type:String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
