import Review from '../models/Review.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { clearGoogleReviewsCache } from './googleReviewController.js';

const DEFAULT_GOOGLE_MAPS_URL = 
    process.env.GOOGLE_BUSINESS_URL ||
    'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu';

export const getPublicReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ isFeatured: true, rating: { $gte: 4 } })
            .sort({ isGoogleFeatured: -1, displayOrder: 1, createdAt: -1 });

        return successResponse(res, reviews, 'Reviews retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const getAllReviewsAdmin = async (req, res, next) => {
    try {
        const { search, platform, featured } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { authorName: { $regex: search, $options: 'i' } },
                { reviewText: { $regex: search, $options: 'i' } },
                { roleOrLocation: { $regex: search, $options: 'i' } },
            ];
        }

        if (platform && platform !== 'all') {
            query.platform = platform;
        }

        if (featured === 'true') {
            query.isFeatured = true;
        } else if (featured === 'false') {
            query.isFeatured = false;
        }

        const reviews = await Review.find(query).sort({ isGoogleFeatured: -1, displayOrder: 1, createdAt: -1 });
        return successResponse(res, reviews, 'Admin reviews retrieved');
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const {
            authorName,
            roleOrLocation,
            rating,
            reviewText,
            reviewDate,
            reviewLink,
            platform,
            isFeatured,
            isVerified,
            authorImage,
        } = req.body;

        if (!authorName || !authorName.trim()) {
            return errorResponse(res, 'Author name is required', 400);
        }

        if (!reviewText || !reviewText.trim()) {
            return errorResponse(res, 'Review text is required', 400);
        }

        let imagePath = authorImage || '';
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            imagePath = `${baseUrl}/uploads/reviews/${req.file.filename}`;
        }

        // Calculate next display order
        const lastReview = await Review.findOne({}).sort({ displayOrder: -1 }).select('displayOrder');
        const displayOrder = lastReview ? lastReview.displayOrder + 1 : 1;

        const review = await Review.create({
            authorName: authorName.trim(),
            roleOrLocation: roleOrLocation?.trim() || 'Verified Customer',
            rating: Number(rating) || 5,
            reviewText: reviewText.trim(),
            reviewDate: reviewDate?.trim() || 'Recently',
            reviewLink: reviewLink?.trim() || DEFAULT_GOOGLE_MAPS_URL,
            platform: platform || 'google',
            isFeatured: isFeatured === true || isFeatured === 'true',
            isVerified: isVerified === undefined ? true : (isVerified === true || isVerified === 'true'),
            authorImage: imagePath,
            displayOrder,
        });

        clearGoogleReviewsCache();

        return successResponse(res, review, 'Review created successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return errorResponse(res, 'Review not found', 404);
        }

        const {
            authorName,
            roleOrLocation,
            rating,
            reviewText,
            reviewDate,
            reviewLink,
            platform,
            isFeatured,
            isVerified,
            authorImage,
            displayOrder,
        } = req.body;

        if (authorName !== undefined) review.authorName = authorName.trim();
        if (roleOrLocation !== undefined) review.roleOrLocation = roleOrLocation.trim();
        if (rating !== undefined) review.rating = Number(rating);
        if (reviewText !== undefined) review.reviewText = reviewText.trim();
        if (reviewDate !== undefined) review.reviewDate = reviewDate.trim();
        if (reviewLink !== undefined) review.reviewLink = reviewLink.trim();
        if (platform !== undefined) review.platform = platform;
        if (isFeatured !== undefined) review.isFeatured = isFeatured === true || isFeatured === 'true';
        if (isVerified !== undefined) review.isVerified = isVerified === true || isVerified === 'true';
        if (displayOrder !== undefined) review.displayOrder = Number(displayOrder);

        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            review.authorImage = `${baseUrl}/uploads/reviews/${req.file.filename}`;
        } else if (authorImage !== undefined) {
            review.authorImage = authorImage;
        }

        await review.save();
        clearGoogleReviewsCache();

        return successResponse(res, review, 'Review updated successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return errorResponse(res, 'Review not found', 404);
        }

        clearGoogleReviewsCache();

        return successResponse(res, null, 'Review deleted successfully');
    } catch (error) {
        next(error);
    }
};
