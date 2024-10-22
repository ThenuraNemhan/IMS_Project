// orderRouter.js
import express from 'express';
import { getLatestOrderCycleNumber} from '../Controllers/orderCycleController.js';

const router = express.Router();

//order cycle routes
router.get('/order-cycle/latest-cycle-number', getLatestOrderCycleNumber);
//router.get('/order-cycle/lates-production-batch/:location', getLatestProductionBatchByLocation);

export default router;