import express from 'express';
import { getGoogleReviews } from '../controllers/googleReviewController.js';

const router = express.Router();

// GET /api/google-reviews - Fetch live Google Reviews for the business
router.get('/', getGoogleReviews);

export default router;
