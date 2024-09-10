// productCategoryRouter.js
import express from 'express';
import { addProductCategory, getProductCategory } from '../Controllers/productCategoryController.js';

const router = express.Router();

router.post('/add', addProductCategory);
router.get('/', getProductCategory);

export default router;
