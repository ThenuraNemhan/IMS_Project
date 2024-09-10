import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    category_code:{type: String, required: true, unique: true},
    category_name: { type: String, required: true}, 
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;
