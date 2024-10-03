// productRouter.js
import express from 'express';
// import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../Controllers/productController.js';
import { createProductionBatch, addProductsToBatch, updateProductDetailsInBatch, getLatestProductionBatchNumber } from '../Controllers/productionBatchController.js';
//import { uploadFiles } from '../config/multerConfig.js';

const router = express.Router();

router.post('/add', addProduct); // Handles multiple file uploads
router.get('/', getProducts);
router.put('/update/:product_code', updateProduct); // Update product by product_code
router.delete('/delete/:product_code', deleteProduct); // Delete product by product_code


router.post('/add-production-batch', createProductionBatch);
router.post('/add-production-batch-products', addProductsToBatch);
router.post('/update-production-batch-products', updateProductDetailsInBatch);
router.get('/latest-batch-number', getLatestProductionBatchNumber);

export default router;
