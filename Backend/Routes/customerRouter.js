// customerRouter.js
import express from 'express';
import { addCustomer, getCustomers, updateCustomer, deletedCustomer } from '../Controllers/customerController.js';

const router = express.Router();

router.post('/add', addCustomer);
router.get('/', getCustomers);
router.put('/update/:customer_code', updateCustomer);
router.delete('/delete/:customer_code', deletedCustomer);

export default router;
