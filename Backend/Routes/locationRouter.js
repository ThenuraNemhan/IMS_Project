// locationRouter.js
import express from 'express';
import { addLocation, deletedLocation, getLocations, updateLocation } from '../Controllers/locationController.js';

const router = express.Router();

router.post('/add', addLocation);
router.get('/', getLocations);
router.put('/update/:location_code', updateLocation);
router.delete('/delete/:location_code', deletedLocation);

export default router;
