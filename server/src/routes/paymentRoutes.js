import express from 'express';
import {
    createPayment,
    getPaymentStatus,
    handleWebhook,
    getAdminPayments,
} from '../controllers/paymentController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public Payment Routes
router.post('/create', createPayment);
router.get('/:paymentId/status', getPaymentStatus);
router.post('/webhook', handleWebhook);

// Protected Admin Payment Management Route
router.get('/admin/all', protectAdmin, getAdminPayments);

export default router;
