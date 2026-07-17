import express from 'express';
import { loginAdmin, getAdminProfile } from '../controllers/adminController.js';
import { validateAdminLogin } from '../validation/adminValidation.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', validateAdminLogin, loginAdmin);
router.get('/profile', protectAdmin, getAdminProfile);

export default router;
