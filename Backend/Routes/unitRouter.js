// unitRouter.js
import express from 'express';
import { addUnit, getUnits } from '../Controllers/unitController.js';

const router = express.Router();

router.post('/add', addUnit);
router.get('/', getUnits);

export default router;
