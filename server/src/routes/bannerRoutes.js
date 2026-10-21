import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    getBanners,
    getAllAdminBanners,
    uploadBanners,
    deleteBanner,
    reorderBanners
} from '../controllers/bannerController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Use memory storage for direct cloud upload
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPEG, PNG, WEBP, etc.) are allowed!'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit per image
});

// Public route for hero section
router.get('/', getBanners);

// Protected admin routes
router.get('/admin/all', protectAdmin, getAllAdminBanners);
router.post('/', protectAdmin, upload.array('images', 10), uploadBanners);
router.delete('/:id', protectAdmin, deleteBanner);
router.put('/order', protectAdmin, reorderBanners);

export default router;
