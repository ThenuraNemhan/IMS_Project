// productRouter.js
import express from 'express';
import { addProduct, getProducts, updateProduct, deleteProduct } from '../Controllers/productController.js';
import { uploadFiles } from '../config/multerConfig.js';

const router = express.Router();

router.post('/add', uploadFiles.array('images'), addProduct); // Handles multiple file uploads
router.get('/', getProducts);
router.put('/update/:id', updateProduct); // Update product by id
router.delete('/delete/:id', deleteProduct); // Delete product by id

export default router;
