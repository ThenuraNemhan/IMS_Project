//import cloudinary from '../config/cloudinaryConfig.js';
import Category from '../Models/ProductCategorymodel.js';
import Product from '../Models/Productmodel.js';
import Unit from '../Models/Unitsmodel.js'; // Ensure you import the Unit model
import generateProductCode from '../utils/generateProductCode.js';

export const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_category,
      product_description,
      unit, // This should be a unit name like 'Kg'
      productDate,
    } = req.body;

    const productCode = await generateProductCode('PROD'); // Use a prefix if needed

    // Convert unit name to ObjectId
    const unitDoc = await Unit.findOne({ unit_name: unit });
    if (!unitDoc) {
      return res.status(400).json({ message: "Invalid unit name" });
    }

     // Convert category name to ObjectId
     const categoryDoc = await Category.findOne({ category_name: product_category});
     if (!categoryDoc) {
       return res.status(400).json({ message: "Invalid category name" });
     }

    const unitCode = unitDoc._id;
    const categoryId = categoryDoc._id;

    // Upload images to Cloudinary
    // const imageUrls = [];
    // for (const file of req.files) {
    //   const result = await cloudinary.uploader.upload(file.path);
    //   imageUrls.push(result.secure_url); // Get URL of the uploaded image
    // }

    const newProduct = new Product({
      product_name,
      product_category: categoryId,
      product_description,
      unit: unitCode,  // Store the ObjectId
      productDate,
      //images: imageUrls,
      status: 'Active', // Default status to "Active"
      product_code: productCode, // Save product code
    });

    const savedProduct = await newProduct.save();

    const populatedProduct = await Product.findById(savedProduct._id)
      .populate('unit')
      .populate('product_category')
      .exec();

    res.status(201).json({
      message: "Product added successfully",
      product: populatedProduct,
      productCode: populatedProduct.product_code // Include product code in response
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('unit', 'unit_name')    // Populate the unit field
      .populate('product_category', 'category_name')  // Populate the category field
      .exec();

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products. Please try again." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { product_code } = req.params;
    const {
      product_name,
      product_category,
      product_description,
      unit, // Unit name
      productDate,
      status,
    } = req.body;

    // Convert unit name to ObjectId
    const unitDoc = await Unit.findOne({ unit_name: unit });
    if (!unitDoc) {
      return res.status(400).json({ message: "Invalid unit name" });
    }

    // Convert category name to ObjectId
    const categoryDoc = await Category.findOne({
      category_name: product_category,
    });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Invalid category name" });
    }

    // Check if images are uploaded, if yes, update them
    // let imageUrls = [];
    // if (req.files && req.files.length > 0) {
    //   for (const file of req.files) {
    //     const result = await cloudinary.uploader.upload(file.path);
    //     imageUrls.push(result.secure_url); // Get URL of the uploaded image
    //   }
    // }

    const updatedProduct = await Product.findOneAndUpdate(
      { product_code }, // Find by product_code instead of _id
      {
        product_name,
        product_category: categoryDoc._id,
        product_description,
        unit: unitDoc._id,
        productDate,
        status,
        //...(imageUrls.length > 0 && { images: imageUrls }), // Update images only if new ones are uploaded
      },
      { new: true }
    ).populate("unit").populate("product_category");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { product_code } = req.params;

    const deletedProduct = await Product.findOneAndDelete({ product_code });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};





