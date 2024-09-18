// productRouter.js
import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../Controllers/productController.js';
import { uploadFiles } from '../config/multerConfig.js';

const router = express.Router();

router.post('/add', uploadFiles.array('images', 3), addProduct); // Handles multiple file uploads
router.get('/', getProducts);
router.put('/update/:product_code', updateProduct); // Update product by product_code
router.delete('/delete/:product_code', deleteProduct); // Delete product by product_code

export default router;
