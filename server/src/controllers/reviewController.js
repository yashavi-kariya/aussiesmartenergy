import Review from '../models/Review.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const DEFAULT_GOOGLE_MAPS_URL = 
    process.env.GOOGLE_BUSINESS_URL ||
    'https://www.google.com/maps/place/Aussie+Smart+Energy/@-22.6821199,150.7337371,4411103m/data=!3m1!1e3!4m8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D';

// Initial default reviews seed
const defaultReviews = [
    {
        authorName: 'John Doe',
        roleOrLocation: 'Homeowner, Sydney NSW',
        rating: 5,
        reviewText: "Great to deal with from start to finish. Sales team and the installers were excellent. There was no dents on my color bond roof after the installation. Very Happy customer here. Would highly recommend Aussie Smart Energy to everyone.",
        reviewDate: '1 month ago',
        reviewLink: DEFAULT_GOOGLE_MAPS_URL,
        platform: 'google',
        isFeatured: true,
        isVerified: true,
        displayOrder: 1,
    },
    {
        authorName: 'Linda George',
        roleOrLocation: 'Business Owner, Melbourne VIC',
        rating: 5,
        reviewText: "Very happy with the service provided by the whole team, Adam and John, patiently guided us to the right product, following up on time, tried their best to fulfill our needs, the installers are kind and professional as well, patiently answered our questions, help me set up the app while I had to hold my baby in arm, kids friendly and dog friendly also😊. Love the team!",
        reviewDate: '2 weeks ago',
        reviewLink: DEFAULT_GOOGLE_MAPS_URL,
        platform: 'google',
        isFeatured: true,
        isVerified: true,
        displayOrder: 2,
    },
    {
        authorName: 'Marinda Wilson',
        roleOrLocation: 'Resident, Brisbane QLD',
        rating: 5,
        reviewText: "Exceptional service from start to finish! Aussie Smart Energy has been fantastic, responding to all my queries promptly and professionally every step of the way. They went above and beyond by offering discounts wherever possible, which I truly appreciated. The installation process was seamless—quick, efficient, and handled with great expertise.",
        reviewDate: '3 weeks ago',
        reviewLink: DEFAULT_GOOGLE_MAPS_URL,
        platform: 'google',
        isFeatured: true,
        isVerified: true,
        displayOrder: 3,
    },
];

export const getPublicReviews = async (req, res, next) => {
    try {
        let count = await Review.countDocuments();
        if (count === 0) {
            await Review.insertMany(defaultReviews);
        }

        const reviews = await Review.find({ isFeatured: true })
            .sort({ displayOrder: 1, createdAt: -1 });

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

        const reviews = await Review.find(query).sort({ displayOrder: 1, createdAt: -1 });
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
            reviewLink: reviewLink?.trim() || '',
            platform: platform || 'google',
            isFeatured: isFeatured === true || isFeatured === 'true',
            isVerified: isVerified === undefined ? true : (isVerified === true || isVerified === 'true'),
            authorImage: imagePath,
            displayOrder,
        });

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

        return successResponse(res, null, 'Review deleted successfully');
    } catch (error) {
        next(error);
    }
};
