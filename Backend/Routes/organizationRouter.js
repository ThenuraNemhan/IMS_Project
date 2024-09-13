// organizationRouter.js
import express from 'express';
import { addOrganization, deletedOrganization, getOrganizations, updateOrganization } from '../Controllers/organizationController.js';

const router = express.Router();

router.post('/add', addOrganization); // Handles multiple file uploads
router.get('/', getOrganizations);
router.put('/update/:organization_code', updateOrganization);
router.delete('/delete/:organization_code', deletedOrganization);

export default router;
