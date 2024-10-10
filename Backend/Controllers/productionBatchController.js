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

      // Add product info to the array
      productData.push({
        product: productDoc._id,
        in_stock_quantity:
          typeof in_stock_quantity === "undefined" ? 0 : in_stock_quantity,
        price: typeof price === "undefined" ? 0 : price,
      });
    }

    // Create a new production batch document
    const newProductionBatch = new ProductionBatch({
      productionBatchCode,
      description,
      location: locationDoc._id,
      selectedProducts: productData, // Save product data with quantities and prices
      createdBy: "Current User",
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
      product: populatedProductionBatch,
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
        price: typeof price === "undefined" ? 0 : price,
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

    // Ensure updatedProducts is an array
    if (!updatedProducts || !Array.isArray(updatedProducts)) {
      return res.status(400).json({ message: "updatedProducts is required and should be an array" });
    }

    // Find the production batch using productionBatchCode
    const productionBatch = await ProductionBatch.findOne({ productionBatchCode });
    if (!productionBatch) {
      return res.status(404).json({ message: "Production batch not found" });
    }

    // Loop through the updated products and update the price and quantity
    updatedProducts.forEach((product) => {
      const { product_code, price, in_stock_quantity } = product;

      // Log to verify the incoming data
      console.log(`Product Code: ${product_code}, Qty: ${in_stock_quantity}, Price: ${price}`);

      // Ensure price and quantity are numbers
      if (isNaN(price) || isNaN(in_stock_quantity)) {
        return res.status(400).json({ message: "Invalid price or quantity values" });
      }

      // Find the product in the batch using product's ObjectId
      const productToUpdate = productionBatch.selectedProducts.find(
        (p) => p.product.toString() === product_code
      );

      if (productToUpdate) {
        // Update the price and quantity as numbers
        productToUpdate.price = Number(price);
        productToUpdate.in_stock_quantity = Number(in_stock_quantity);
      }
    });

    // Save the updated batch
    await productionBatch.save();

    console.log("Updated Batch:", productionBatch);

    res.status(200).json({
      message: "Products updated successfully",
      updatedBatch: productionBatch,
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
    const latestBatch = await ProductionBatch.findOne({}).sort({
      createdDate: -1,
    });
    let lastBatchNumber = 1;

    if (latestBatch && latestBatch.productionBatchCode) {
      const codeParts = latestBatch.productionBatchCode.split("-");
      lastBatchNumber = parseInt(codeParts[3], 10) || 1;
    }

    res.status(200).json({ nextBatchNumber: lastBatchNumber + 1 });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch latest batch number", error });
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
