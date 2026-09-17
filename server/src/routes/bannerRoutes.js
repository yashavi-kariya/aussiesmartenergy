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

// Ensure banner uploads directory exists
const baseUploadsDir = process.cwd().endsWith('server')
    ? path.join(process.cwd(), 'uploads')
    : path.join(process.cwd(), 'server', 'uploads');
const uploadDir = path.join(baseUploadsDir, 'banners');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        cb(null, `hero_${name}_${Date.now()}${ext}`);
    }
});

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
