import express from 'express';
import { createEnquiry, getAllEnquiries, getEnquiryById, deleteEnquiry } from '../controllers/enquiryController.js';
import { validateEnquiry } from '../validation/enquiryValidation.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', validateEnquiry, createEnquiry);
router.get('/', protectAdmin, getAllEnquiries);
router.get('/:id', protectAdmin, getEnquiryById);
router.delete('/:id', protectAdmin, deleteEnquiry);

export default router;
