// controllers/productionBatchController.js
import Location from "../Models/Loactionmodel.js";
import ProductionBatch from "../Models/ProductionBatchmodel.js";
import Product from "../Models/Productmodel.js";

export const createProductionBatch = async (req, res) => {
  try {
    const { productionBatchCode, description, location, selectedProducts } =
      req.body;

    // Convert location name to ObjectId
    const locationDoc = await Location.findOne({ location_name: location });
    if (!locationDoc) {
      return res.status(400).json({ message: "Invalid location name" });
    }

     // Convert product names to ObjectIds
    const productDocs = await Product.find({ product_name: { $in: selectedProducts } });
    if (productDocs.length !== selectedProducts.length) {
      return res.status(400).json({ message: "Invalid product names" });
    }

    const locationCode = locationDoc._id;
    const productCodes = productDocs.map(product => product._id); // Array of ObjectIds for products

    // Create a new production batch document
    const newProductionBatch = new ProductionBatch({
      productionBatchCode,
      description,
      location: locationCode,
      selectedProducts:productCodes,
      createdBy: "Current User",
      createdDate: new Date(),
    });

    // Save the new production batch to the database
    const savedProductionBatch = await newProductionBatch.save();

    const populatedProductionBatch = await ProductionBatch.findById(savedProductionBatch._id)
    .populate('location')
    .populate('selectedProducts')
    .exec();

    res.status(201).json({
      message: "Production Batch added successfully",
      product: populatedProductionBatch,
      productionBatchCode: populatedProductionBatch.productionBatchCode // Include product code in response
    });
  } catch (error) {
    console.error("Error adding production Batch:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addProductsToBatch = async (req, res) => {
  try {
    const { productionBatchCode, selectedProducts } = req.body;

    // Log the request body to ensure that product_code is included
    console.log("Selected Products:", selectedProducts);

    // Find the production batch
    const productionBatch = await ProductionBatch.findById(productionBatchCode);
    if (!productionBatch) {
      return res.status(404).json({ message: "Production batch not found" });
    }

   // Validate and convert selectedProducts
   const productIds = [];
   for (const product of selectedProducts) {
     const { product:product_code } = product; // Make sure product_code is coming from the request

     if (!product_code) {
       return res.status(400).json({ message: "Product code is missing in the request" });
     }

     // Find the product by product_code and get its ObjectId
     const productDoc = await Product.findOne({ product_code});
     if (!productDoc) {
       return res.status(400).json({ message: `Invalid product code: ${product_code}` });
     }

     // Add the ObjectId to the selected products
     productIds.push({
       product: productDoc._id,
     });
   }

    // Update selectedProducts in the production batch (without price/quantity for now)
    productionBatch.selectedProducts.push(...productIds);
    await productionBatch.save();

    // Populate the batch for the response
    const updatedBatch = await ProductionBatch.findById(productionBatchCode)
      .populate("selectedProducts.product") // Populate product details
      .exec();

    res.status(200).json({
      message: "Products added successfully",
      updatedBatch,
    });
  } catch (error) {
    console.error("Error adding products to batch:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProductDetailsInBatch = async (req, res) => {
  try {
    const { productionBatchCode, updatedProducts } = req.body; // updatedProducts will contain productCode, price, and quantity

    // Find the production batch
    const productionBatch = await ProductionBatch.findById(productionBatchCode);
    if (!productionBatch) {
      return res.status(404).json({ message: "Production batch not found" });
    }

    // Loop through the updated products and update the price and quantity
    updatedProducts.forEach(async (product) => {
      const { product_code, price, in_stock_quantity } = product;

      // Find the product in the batch
      const productToUpdate = productionBatch.selectedProducts.find(
        (p) => p.product_code === product_code
      );

      if (productToUpdate) {
        // Update the price and quantity
        productToUpdate.price = price;
        productToUpdate.in_stock_quantity = in_stock_quantity;
      }
    });

    // Save the updated batch
    await productionBatch.save();

    res.status(200).json({
      message: "Products updated successfully",
      updatedBatch: productionBatch,
    });
  } catch (error) {
    console.error("Error updating product details:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getLatestProductionBatchNumber = async (req, res) => {
  try {
    const latestBatch = await ProductionBatch.findOne({}).sort({ createdDate: -1 });
    let lastBatchNumber = 1;

    if (latestBatch && latestBatch.productionBatchCode) {
      const codeParts = latestBatch.productionBatchCode.split('-');
      lastBatchNumber = parseInt(codeParts[3], 10) || 1;
    }

    res.status(200).json({ nextBatchNumber: lastBatchNumber + 1 });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch latest batch number', error });
  }
};