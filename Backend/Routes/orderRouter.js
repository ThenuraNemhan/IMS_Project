// orderRouter.js
import express from 'express';
import { createNewOrderCycle, getLatestOrderCycleNumber, getOrderCycles} from '../Controllers/orderCycleController.js';

const router = express.Router();

//order cycle routes
router.post('/order-cycle/createNewOrderCycle', createNewOrderCycle);
router.get('/order-cycle/latest-cycle-number', getLatestOrderCycleNumber);
router.get('/order-cycle/get-all-order-cycles', getOrderCycles)
//router.get('/order-cycle/lates-production-batch/:location', getLatestProductionBatchByLocation);

export default router;