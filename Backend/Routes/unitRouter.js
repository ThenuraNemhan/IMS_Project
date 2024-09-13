// unitRouter.js
import express from 'express';
import { addUnit, deletedUnit, getUnits, updateUnit } from '../Controllers/unitController.js';

const router = express.Router();

router.post('/add', addUnit);
router.get('/', getUnits);
router.put('/update/:unit_code', updateUnit); 
router.delete('/delete/:unit_code', deletedUnit); 

export default router;
forti