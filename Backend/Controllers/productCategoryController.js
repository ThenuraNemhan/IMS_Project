import  Category from '../Models/ProductCategorymodel.js';
import generateProductCategoryCode from '../utils/generateProductCategoryCode.js';

export const addProductCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const categoryCode = await generateProductCategoryCode("PCAT"); // Use a prefix if needed

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const newCategory = new Category({ category_name, category_code: categoryCode });
    await newCategory.save();

    res.status(201).json({ message: "Product Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding Category:", error);
    res.status(500).json({ message: "Error adding Category", error: error.message });
  }
};

export const getProductCategory = async (req, res) => {
    try {
      const categories = await Category.find(); // Fetch all categories
      res.status(200).json({ categories });
    } catch (error) {
      console.error("Error fetching Categories:", error);
      res.status(500).json({ message: "Error fetching categories. Please try again." });
    }
  };


