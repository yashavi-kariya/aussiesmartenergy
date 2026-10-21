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

// Use memory storage for direct cloud upload
const storage = multer.memoryStorage();

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
