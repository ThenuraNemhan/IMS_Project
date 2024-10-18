// productRouter.js
import express from 'express';
import authenticateUser from '../middleware/authMiddleware.js';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../Controllers/productController.js';
import { createProductionBatch, addProductsToBatch, updateProductDetailsInBatch, getLatestProductionBatchNumber, getProductionBatches, getProductionBatchByCode} from '../Controllers/productionBatchController.js';
//import { uploadFiles } from '../config/multerConfig.js';

const router = express.Router();

//Product Routes
router.post('/add', addProduct); // Handles multiple file uploads
router.get('/', getProducts);
router.put('/update/:product_code', updateProduct); // Update product by product_code
router.delete('/delete/:product_code', deleteProduct); // Delete product by product_code

// Production Batch Routes
router.post('/production-batch/add', authenticateUser, createProductionBatch);
router.post('/production-batch/add-products', addProductsToBatch);
router.put('/production-batch/update-products', updateProductDetailsInBatch);
router.get('/production-batch/latest-batch-number', getLatestProductionBatchNumber);
router.get('/production-batch', getProductionBatches);
router.get('/production-batch/:productionBatchCode', getProductionBatchByCode); // New Route
// router.put('/production-batch/update/:productionBatchCode', UpdateProductionBatch);
// router.delete('/production-batch/delete/:productionBatchCode', DeleteProductionBatch);


export default router;
