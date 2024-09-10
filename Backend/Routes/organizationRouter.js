// organizationRouter.js
import express from 'express';
import { addOrganization, getOrganizations } from '../Controllers/organizationController.js';

const router = express.Router();

router.post('/add', addOrganization); // Handles multiple file uploads
router.get('/', getOrganizations);

export default router;
