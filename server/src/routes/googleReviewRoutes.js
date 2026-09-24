import express from 'express';
import {
    getGoogleReviews,
    syncGoogleReviews,
    getAllGoogleReviewsAdmin,
    addGoogleReviewAdmin,
    updateGoogleReviewAdmin,
    deleteGoogleReviewAdmin,
    setFeaturedGoogleReview,
    removeFeaturedGoogleReview,
} from '../controllers/googleReviewController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Fetch Google Reviews & Featured Customer Review
router.get('/', getGoogleReviews);

// Admin: Sync latest Google Reviews from Google Places API
router.post('/sync', protectAdmin, syncGoogleReviews);

// Admin: Get all synced Google reviews with featured status
router.get('/admin/all', protectAdmin, getAllGoogleReviewsAdmin);

// Admin: Add a Google Review directly from listing
router.post('/add', protectAdmin, addGoogleReviewAdmin);

// Admin: Update a Google Review
router.put('/:id', protectAdmin, updateGoogleReviewAdmin);

// Admin: Delete a Google Review permanently
router.delete('/:id', protectAdmin, deleteGoogleReviewAdmin);

// Admin: Set a specific Google review as the featured review on website
router.put('/:id/featured', protectAdmin, setFeaturedGoogleReview);

// Admin: Remove featured status from a Google review
router.delete('/:id/featured', protectAdmin, removeFeaturedGoogleReview);

export default router;
