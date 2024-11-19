// controllers/orderCycleController.js
import Location from "../Models/Loactionmodel.js";
import OrderCycle from "../Models/OrderCyclemodel.js";
import ProductionBatch from "../Models/ProductionBatchmodel.js";
import Product from "../Models/Productmodel.js";

export const createNewOrderCycle = async (req, res) => {
  try {
    const {
      orderCycleCode,
      description,
      location,
      selectedProductionBatches,
      createdBy,
    } = req.body;
    const userId = req.user?._id || createdBy; // Use createdBy from request if req.user._id is undefined

    if (!userId) {
      return res.status(400).json({
        message: "User authentication required to create an order cycle",
      });
    }

    // Verify location exists
    const locationDoc = await Location.findById(location);
    if (!locationDoc) {
      return res.status(400).json({ message: "Invalid location ID" });
    }

    // Map production batches and products
    const batchData = await Promise.all(
      selectedProductionBatches.map(async (batch) => {
        const { batchCode, products } = batch;

        const productionBatch = await ProductionBatch.findOne({
          productionBatchCode: batchCode,
        });
        if (!productionBatch)
          throw new Error(`Invalid batch code: ${batchCode}`);

        const productData = await Promise.all(
          products.map(async (product) => {
            const { product_code, latestInStockQuantity, latestPrice } =
              product;

            const productDoc = await Product.findOne({ product_code });
            if (!productDoc)
              throw new Error(`Invalid product code: ${product_code}`);

            return {
              product: productDoc._id,
              latestInStockQuantity: latestInStockQuantity || 0,
              latestPrice: latestPrice || 0,
            };
          })
        );

        return {
          batch: productionBatch._id,
          products: productData,
        };
      })
    );

    // Create and save new order cycle
    const newOrderCycle = new OrderCycle({
      orderCycleCode,
      description,
      location: locationDoc._id,
      selectedProductionBatches: batchData,
      createdBy: userId,
      createdDate: new Date(),
    });

    const savedOrderCycle = await newOrderCycle.save();

    // Populate response data
    const populatedOrderCycle = await OrderCycle.findById(savedOrderCycle._id)
      .populate("location", "location_name")
      .populate({
        path: "selectedProductionBatches.batch",
        select: "productionBatchCode",
      })
      .populate({
        path: "selectedProductionBatches.products.product",
        select: "product_code product_name",
      });

    res.status(201).json({
      message: "Order Cycle created successfully",
      orderCycle: populatedOrderCycle,
    });
  } catch (error) {
    console.error("Error creating order cycle:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrderCycles = async (req, res) => {
  try {
    // Fetch all order cycles, populating location and nested production batch details
    const orderCycles = await OrderCycle.find()
      .populate("location", "location_name") // Populate location with only location_name
      .populate({
        path: "selectedProductionBatches.batch", // Correct path to batch reference
        select: "productionBatchCode", // Select specific fields in batch
      })
      .populate({
        path: "selectedProductionBatches.products.product", // Access nested product within batch
        select: "product_code product_name", // Select specific fields in product
      })
      .exec();

    res.status(200).json({ orderCycles });
  } catch (error) {
    console.error("Error fetching Order Cycles:", error);
    res.status(500).json({
      message: "Error fetching Order Cycles. Please try again.",
    });
  }
};

export const getLatestOrderCycleNumber = async (req, res) => {
  try {
    const latestCycle = await OrderCycle.findOne().sort({ createdDate: -1 });
    const lastCycleNumber = latestCycle
      ? parseInt(latestCycle.orderCycleCode.split("-")[3], 10)
      : 0;

    res.status(200).json({ nextCycleNumber: lastCycleNumber + 1 });
  } catch (error) {
    console.error("Error fetching latest order cycle number:", error);
    res.status(500).json({ message: "Failed to fetch latest cycle number" });
  }
};

export const getLatestProductionBatchByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    const latestBatch = await ProductionBatch.findOne({ location: locationId })
      .sort({ createdDate: -1 })
      .populate({
        path: "selectedProducts.product",
        select: "product_code product_name",
      });

    if (!latestBatch) {
      return res
        .status(404)
        .json({ message: "No production batch found for this location" });
    }

    res.status(200).json({
      message: "Latest production batch fetched successfully",
      latestBatch,
    });
  } catch (error) {
    console.error("Error fetching latest production batch:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch latest production batch" });
  }
};
