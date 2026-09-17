import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
    getPublicReviews,
    getAllReviewsAdmin,
    createReview,
    updateReview,
    deleteReview,
} from '../controllers/reviewController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Ensure upload directory exists
const baseUploadsDir = process.cwd().endsWith('server')
    ? path.join(process.cwd(), 'uploads')
    : path.join(process.cwd(), 'server', 'uploads');
const uploadDir = path.join(baseUploadsDir, 'reviews');
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
        cb(null, `avatar-${name}-${Date.now()}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Public route for website
router.get('/', getPublicReviews);

// Admin routes
router.get('/admin/all', protectAdmin, getAllReviewsAdmin);
router.post('/', protectAdmin, upload.single('authorImageFile'), createReview);
router.put('/:id', protectAdmin, upload.single('authorImageFile'), updateReview);
router.delete('/:id', protectAdmin, deleteReview);

export default router;
