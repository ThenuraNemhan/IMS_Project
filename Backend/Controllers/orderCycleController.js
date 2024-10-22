// controllers/orderCycleController.js
import OrderCycle from "../Models/orderCyclemodel.js";
import ProductionBatch from "../Models/ProductionBatchmodel.js";
//import Location from "../Models/Loactionmodel.js";

export const getLatestOrderCycleNumber = async (req, res) => {
    try {
      const latestCycle = await OrderCycle.findOne({}).sort({
        createdDate: -1,
      });
      let lastCycleNumber = 1;
  
      if (latestCycle && latestCycle.orderCycleCode) {
        const codeParts = latestCycle.orderCycleCode.split("-");
        lastOrderNumber = parseInt(codeParts[3], 10) || 1;
      }
  
      res.status(200).json({ nextCycleNumber: lastCycleNumber + 1 });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch latest cycle number", error });
    }
  };


//   export const getLatestProductionBatchByLocation = async (req, res) => {
//     try {
//       const { locationId } = req.params; // Location ID passed from frontend
  
//       // Find the latest production batch for the specified location
//       const latestBatch = await ProductionBatch.findOne({ location: locationId })
//         .sort({ createdDate: -1 })
//         .populate("location", "location_name")
//         .populate({
//           path: "selectedProducts.product",
//           select: "product_code product_name", // Fetch only necessary fields
//         })
//         .exec();
  
//       if (!latestBatch) {
//         return res.status(404).json({
//           message: "No production batch found for this location",
//         });
//       }
  
//       res.status(200).json({
//         message: "Latest production batch fetched successfully",
//         latestBatch,
//       });
//     } catch (error) {
//       console.error("Error fetching latest production batch:", error);
//       res.status(500).json({
//         message: "Failed to fetch latest production batch",
//         error: error.message,
//       });
//     }
//   };