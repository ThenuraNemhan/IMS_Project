// controllers/productionBatchController.js
import mongoose from "mongoose";
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

    // Validate and convert selectedProducts (should include price and quantity)
    const productData = [];
    for (const product of selectedProducts) {
      const { product_name, in_stock_quantity, price } = product;

      // Find the product document by name
      const productDoc = await Product.findOne({ product_name });
      if (!productDoc) {
        return res
          .status(400)
          .json({ message: `Invalid product name: ${product_name}` });
      }

      // Validate price
      if (price === undefined || price === null || isNaN(price)) {
        return res
          .status(400)
          .json({ message: `Invalid price for product: ${product_name}` });
      }

      // Add product info to the array
      productData.push({
        product: productDoc._id,
        in_stock_quantity:
          typeof in_stock_quantity === "undefined" ? 0 : in_stock_quantity,
        price: mongoose.Types.Decimal128.fromString(price.toString()), // Convert to Decimal128
      });
    }

    // Create a new production batch document
    const newProductionBatch = new ProductionBatch({
      productionBatchCode,
      description,
      location: locationDoc._id,
      selectedProducts: productData, // Save product data with quantities and prices
      createdBy: req.user.username, // Use the logged-in user's username
      createdDate: new Date(),
    });

    // Save the new production batch to the database
    const savedProductionBatch = await newProductionBatch.save();

    const populatedProductionBatch = await ProductionBatch.findById(
      savedProductionBatch._id
    )
      .populate("location", "location_name")
      .populate({
        path: "selectedProducts.product",
        select: "product_code product_name", // Ensure you select product_code and product_name
      })
      .exec();

    res.status(201).json({
      message: "Production Batch added successfully",
      productionBatchCode: savedProductionBatch.productionBatchCode, // Change this to return the batch code
      product: {
        ...populatedProductionBatch._doc,
        selectedProducts: populatedProductionBatch.selectedProducts.map(
          (product) => ({
            ...product._doc,
            price: product.price ? product.price.toString() : "0",
          })
        ),
      },
    });
  } catch (error) {
    console.error("Error adding production batch:", error);
    res.status(500).json({ message: error.message });
  }
};

export const addProductsToBatch = async (req, res) => {
  try {
    const { productionBatchCode, selectedProducts } = req.body;

    // Find the production batch using productionBatchCode instead of _id
    const productionBatch = await ProductionBatch.findOne({
      productionBatchCode,
    });
    if (!productionBatch) {
      return res.status(404).json({ message: "Production batch not found" });
    }

    // Validate and add products to the batch
    const productData = [];
    for (const product of selectedProducts) {
      const { id: product_code, in_stock_quantity, price } = product;

      // Find the product by product_code
      const productDoc = await Product.findOne({ product_code });
      if (!productDoc) {
        return res
          .status(400)
          .json({ message: `Invalid product code: ${product_code}` });
      }

      // Add product ObjectId, quantity, and price to the selectedProducts array
      productData.push({
        product: productDoc._id,
        in_stock_quantity:
          typeof in_stock_quantity === "undefined" ? 0 : in_stock_quantity,
        price: mongoose.Types.Decimal128.fromString(
          price ? price.toString() : "0"
        ),
      });
    }

    // Push new products to the batch
    productionBatch.selectedProducts.push(...productData);
    await productionBatch.save();

    // Populate the batch for the response
    const updatedBatch = await ProductionBatch.findOne({ productionBatchCode }) // Updated here
      .populate("location", "location_name")
      .populate({
        path: "selectedProducts.product",
        select: "product_code product_name", // Ensure you select product_code and product_name
      })
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
    const { productionBatchCode, updatedProducts } = req.body;

    if (!updatedProducts || !Array.isArray(updatedProducts)) {
      return res.status(400).json({
        message: "updatedProducts is required and should be an array",
      });
    }

    const productionBatch = await ProductionBatch.findOne({
      productionBatchCode,
    });

    if (!productionBatch) {
      return res.status(404).json({ message: "Production batch not found" });
    }

    for (const product of updatedProducts) {
      const { product_code, price, in_stock_quantity } = product;

      // Ensure price and quantity are numbers, or set them to defaults
      const parsedPrice = parseFloat(price);
      const parsedQuantity = parseInt(in_stock_quantity);

      // Ensure price and quantity are numbers
      if (isNaN(price) || isNaN(in_stock_quantity)) {
        return res
          .status(400)
          .json({ message: "Invalid price or quantity values" });
      }

      // Validate price
      if (price === undefined || price === null) {
        return res
          .status(400)
          .json({ message: `Invalid price for product code: ${product_code}` });
      }

      // Find the product in the Product collection using the product_code
      const productDoc = await Product.findOne({ product_code });

      if (!productDoc) {
        return res
          .status(400)
          .json({ message: `Product with code ${product_code} not found` });
      }

      // Find the product in the batch using its ObjectId
      const productToUpdate = productionBatch.selectedProducts.find(
        (p) => p.product.toString() === productDoc._id.toString() // Compare ObjectId as strings
      );

      if (productToUpdate) {
        // Update the price and quantity
        productToUpdate.price = mongoose.Types.Decimal128.fromString(
          parsedPrice.toString() || "0"
        );
        productToUpdate.in_stock_quantity = parsedQuantity || 0;
      } else {
        console.log(`Product with code ${product_code} not found in the batch`);
      }
    }

    // Save the updated batch
    await productionBatch.save();

    //console.log("Updated Batch:", productionBatch);

    res.status(200).json({
      message: "Products updated successfully",
      updatedBatch: {
        ...productionBatch._doc,
        selectedProducts: productionBatch.selectedProducts.map((product) => ({
          ...product._doc,
          price: product.price ? product.price.toString() : "0",
        })),
      },
    });
  } catch (error) {
    console.error("Error updating product details:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProductionBatches = async (req, res) => {
  try {
    const productionBatches = await ProductionBatch.find()
      .populate("location", "location_name") // Correctly chained populate method
      .populate({
        path: "selectedProducts.product",
        select: "product_code product_name", // Ensure you select product_code and product_name
      })
      .exec();

    res.status(200).json({ productionBatches });
  } catch (error) {
    console.error("Error fetching Production Batches:", error);
    res.status(500).json({
      message: "Error fetching Production Batches. Please try again.",
    });
  }
};

export const getLatestProductionBatchNumber = async (req, res) => {
  try {
    // Fetch the latest production batch sorted by createdDate
    const latestBatch = await ProductionBatch.findOne({}).sort({
      createdDate: -1,
    });
    
    // Default the batch number to 1 for the first batch
    let lastBatchNumber = 0;

    if (latestBatch && latestBatch.productionBatchCode) {
      // Split the batch code into parts using "-"
      const codeParts = latestBatch.productionBatchCode.split("-");

      // Ensure codeParts[3] exists and is a valid number, otherwise fallback to 1
      lastBatchNumber = parseInt(codeParts[3], 10) || 0;
    }

    // Respond with the next batch number
    res.status(200).json({ nextBatchNumber: lastBatchNumber + 1 });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch latest batch number", error });
  }
};


export const getProductionBatchByCode = async (req, res) => {
  try {
    const { productionBatchCode } = req.params;

    // Find the production batch by the provided code
    const productionBatch = await ProductionBatch.findOne({
      productionBatchCode,
    }).populate("selectedProducts.product");

    if (!productionBatch) {
      return res.status(404).json({ message: "Production batch not found" });
    }

    res.status(200).json({
      message: "Production batch fetched successfully",
      productionBatch,
    });
  } catch (error) {
    console.error("Error fetching production batch:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getLatestProductionBatchByLocation = async (req, res) => {
  try {
    const { location } = req.params; // Use location, not location_code

    // Log the location ID for debugging purposes
    //console.log("Fetching latest batch for location:", location);

    // Ensure the locationId is valid before querying
    if (!location) {
      return res.status(400).json({ message: "Location ID is required" });
    }

    // Find the latest production batch for the specified location
    const latestBatch = await ProductionBatch.findOne({ location: location })
      .sort({ createdDate: -1 })
      .populate("location", "location_name")
      .populate({
        path: "selectedProducts.product",
        select: "product_code product_name", // Fetch only necessary fields
      })
      .exec();

    // Check if a production batch was found
    if (!latestBatch) {
      console.log("No production batch found for location:", location);
      return res.status(404).json({
        message: "No production batch found for this location",
      });
    }

    res.status(200).json({
      message: "Latest production batch fetched successfully",
      latestBatch,
    });
  } catch (error) {
    console.error("Error fetching latest production batch:", error);
    res.status(500).json({
      message: "Failed to fetch latest production batch",
      error: error.message,
    });
  }
};

// export const UpdateProductionBatch = async (req, res) => {
//   try {
//     const { productionBatchCode } = req.params;
//     const { description, location, status } = req.body;

//     // Convert location name to ObjectId by querying the location collection
//     const locationDoc = await Location.findOne({ location_name: location });
//     if (!locationDoc) {
//       return res.status(400).json({ message: "Invalid location name" });
//     }

//     // Update the production batch with the ObjectId of the location
//     const updatedProductionBatch = await ProductionBatch.findOneAndUpdate(
//       { productionBatchCode }, // Find by productionBatchCode
//       {
//         description,
//         location: locationDoc._id,  // Use ObjectId here
//         status,
//       },
//       { new: true }
//     )
//       .populate("location")  // Populate the location details
//       .exec();

//     if (!updatedProductionBatch) {
//       return res.status(404).json({ message: "Production Batch Not Found" });
//     }

//     res.status(200).json({
//       message: "Production Batch Updated Successfully",
//       productionBatch: updatedProductionBatch,
//     });
//   } catch (error) {
//     console.error("Error updating production batch:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const DeleteProductionBatch = async (req, res) => {
//   try {
//     const {productionBatchCode} = req.params;

//     const deletedProductionBatch = await ProductionBatch.findOneAndDelete({ productionBatchCode });

//     if (!deletedProductionBatch) {
//       return res.status(404).json({ message: "Production Batch not found" });
//     }

//     res.status(200).json({
//       message: "Production Batch deleted successfully",
//       productionBatch: deletedProductionBatch,
//     });
//   } catch (error) {
//     console.error("Error deleting production batch:", error);
//     res.status(500).json({ message: error.message });
//   }
// };
