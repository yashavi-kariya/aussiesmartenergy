import Review from '../models/Review.js';

// In-memory cache to prevent exceeding Google Places API rate limits and quotas
let reviewsCache = {
    data: null,
    lastFetched: 0,
    ttl: 30 * 60 * 1000 // 30 minutes TTL
};

const DEFAULT_GOOGLE_MAPS_URL = 
    process.env.GOOGLE_BUSINESS_URL ||
    'https://www.google.com/maps/place/Aussie+Smart+Energy/@-22.6821199,150.7337371,4411103m/data=!3m1!1e3!4m8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D';

const DEFAULT_WRITE_REVIEW_URL = 
    process.env.GOOGLE_WRITE_REVIEW_URL ||
    'https://www.google.com/maps/place/Aussie+Smart+Energy/@-22.6821199,150.7337371,4411103m/data=!3m1!1e3!4m8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu&g_ep=EgoyMDI2MDkxNC4wIKXMDSoASAFQAw%3D%3D';

// Fallback reviews with valid Australian customer stories and direct Google links
const fallbackGoogleReviews = {
    businessName: 'Aussie Smart Energy',
    rating: 4.9,
    totalReviews: 47,
    placeUrl: DEFAULT_GOOGLE_MAPS_URL,
    writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
    reviews: [
        {
            authorName: 'John Doe',
            roleOrLocation: 'Homeowner, Sydney NSW',
            authorPhoto: '',
            authorUrl: DEFAULT_GOOGLE_MAPS_URL,
            rating: 5,
            text: 'Great to deal with from start to finish. Sales team and the installers were excellent. There was no dents on my color bond roof after the installation. Very Happy customer here. Would highly recommend Aussie Smart Energy to everyone.',
            publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            relativeTime: '1 month ago',
            platform: 'google',
            isVerified: true
        },
        {
            authorName: 'Linda George',
            roleOrLocation: 'Business Owner, Melbourne VIC',
            authorPhoto: '',
            authorUrl: DEFAULT_GOOGLE_MAPS_URL,
            rating: 5,
            text: 'Very happy with the service provided by the whole team, Adam and John, patiently guided us to the right product, following up on time, tried their best to fulfill our needs, the installers are kind and professional as well, patiently answered our questions, help me set up the app while I had to hold my baby in arm, kids friendly and dog friendly also😊. Love the team!',
            publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            relativeTime: '2 months ago',
            platform: 'google',
            isVerified: true
        },
        {
            authorName: 'Marinda Wilson',
            roleOrLocation: 'Resident, Brisbane QLD',
            authorPhoto: '',
            authorUrl: DEFAULT_GOOGLE_MAPS_URL,
            rating: 5,
            text: 'Exceptional service from start to finish! Aussie Smart Energy has been fantastic, responding to all my queries promptly and professionally every step of the way. They went above and beyond by offering discounts wherever possible, which I truly appreciated. The installation process was seamless—quick, efficient, and handled with great expertise.',
            publishedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            relativeTime: '3 months ago',
            platform: 'google',
            isVerified: true
        }
    ]
};

/**
 * Fetch place details summary from Google Places API (New) v1
 */
async function fetchPlacesApiNew(placeId, apiKey) {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: {
            'Accept': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews,googleMapsUri'
        }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        const err = new Error(errorBody?.error?.message || `Places API (New) returned ${res.status}`);
        err.status = res.status;
        err.data = errorBody;
        throw err;
    }

    const data = await res.json();
    const liveReviews = Array.isArray(data.reviews) && data.reviews.length > 0
        ? data.reviews.map((r) => ({
            authorName: r.authorAttribution?.displayName || 'Verified Customer',
            roleOrLocation: 'Google Reviewer',
            authorPhoto: r.authorAttribution?.photoUri || '',
            authorUrl: r.authorAttribution?.uri || data.googleMapsUri || DEFAULT_GOOGLE_MAPS_URL,
            rating: Number(r.rating) || 5,
            text: r.text?.text || r.originalText?.text || '',
            publishedAt: r.publishTime || new Date().toISOString(),
            relativeTime: r.relativePublishTimeDescription || 'Recently',
            platform: 'google',
            isVerified: true
        }))
        : [];

    return {
        businessName: data.displayName?.text || 'Aussie Smart Energy',
        rating: typeof data.rating === 'number' ? Number(data.rating.toFixed(1)) : 4.9,
        totalReviews: typeof data.userRatingCount === 'number' ? data.userRatingCount : 47,
        placeUrl: data.googleMapsUri || DEFAULT_GOOGLE_MAPS_URL,
        writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
        reviews: liveReviews
    };
}

/**
 * Fetch place details summary from Google Places API (Legacy)
 */
async function fetchPlacesApiLegacy(placeId, apiKey) {
    const fields = 'name,rating,user_ratings_total,reviews,url';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        placeId
    )}&fields=${encodeURIComponent(fields)}&key=${encodeURIComponent(apiKey)}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (data.status !== 'OK') {
        const err = new Error(data.error_message || `Legacy Places API status: ${data.status}`);
        err.googleStatus = data.status;
        throw err;
    }

    const result = data.result || {};
    const liveReviews = Array.isArray(result.reviews) && result.reviews.length > 0
        ? result.reviews.map((r) => ({
            authorName: r.author_name || 'Verified Customer',
            roleOrLocation: 'Google Reviewer',
            authorPhoto: r.profile_photo_url || '',
            authorUrl: r.author_url || result.url || DEFAULT_GOOGLE_MAPS_URL,
            rating: Number(r.rating) || 5,
            text: r.text || '',
            publishedAt: r.time ? new Date(r.time * 1000).toISOString() : new Date().toISOString(),
            relativeTime: r.relative_time_description || 'Recently',
            platform: 'google',
            isVerified: true
        }))
        : [];

    return {
        businessName: result.name || 'Aussie Smart Energy',
        rating: typeof result.rating === 'number' ? Number(result.rating.toFixed(1)) : 4.9,
        totalReviews: typeof result.user_ratings_total === 'number' ? result.user_ratings_total : 47,
        placeUrl: result.url || DEFAULT_GOOGLE_MAPS_URL,
        writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
        reviews: liveReviews
    };
}

/**
 * Helper to fetch and format featured reviews from MongoDB
 */
async function getDatabaseFeaturedReviews() {
    try {
        const dbReviews = await Review.find({ isFeatured: true })
            .sort({ displayOrder: 1, createdAt: -1 })
            .lean();

        if (dbReviews && dbReviews.length > 0) {
            return dbReviews.map((r) => ({
                _id: r._id,
                authorName: r.authorName || 'Verified Customer',
                roleOrLocation: r.roleOrLocation || 'Verified Customer',
                authorPhoto: r.authorImage || '',
                authorUrl: r.reviewLink || DEFAULT_GOOGLE_MAPS_URL,
                rating: Number(r.rating) || 5,
                text: r.reviewText || '',
                publishedAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
                relativeTime: r.reviewDate || 'Recently',
                platform: r.platform || 'google',
                isVerified: r.isVerified ?? true
            }));
        }
    } catch (e) {
        console.warn('[GoogleReviews] Could not load reviews from MongoDB:', e.message);
    }
    return [];
}

/**
 * @desc    Get Google Reviews for the business (combining Google Places summary + curated/live reviews)
 * @route   GET /api/google-reviews
 * @access  Public
 */
export const getGoogleReviews = async (req, res) => {
    try {
        const apiKey = (process.env.GOOGLE_PLACES_API_KEY || '').trim();
        const placeId = (process.env.GOOGLE_PLACE_ID || '').trim();
        const forceRefresh = req.query.refresh === 'true';

        // Retrieve curated reviews stored in MongoDB
        const dbReviews = await getDatabaseFeaturedReviews();

        const now = Date.now();
        // Return cached Google summary if still valid and force refresh is not requested
        if (!forceRefresh && reviewsCache.data && (now - reviewsCache.lastFetched < reviewsCache.ttl)) {
            const finalReviews = dbReviews.length > 0
                ? dbReviews
                : (reviewsCache.data.reviews && reviewsCache.data.reviews.length > 0
                    ? reviewsCache.data.reviews
                    : fallbackGoogleReviews.reviews);

            return res.status(200).json({
                success: true,
                cached: true,
                ...reviewsCache.data,
                reviews: finalReviews
            });
        }

        let placeData = null;

        // Try Places API (New) if credentials exist
        if (apiKey && placeId) {
            try {
                placeData = await fetchPlacesApiNew(placeId, apiKey);
            } catch (newApiErr) {
                console.log('[GoogleReviews] Places API (New) attempt failed, trying legacy endpoint:', newApiErr.message);
                try {
                    placeData = await fetchPlacesApiLegacy(placeId, apiKey);
                } catch (legacyErr) {
                    console.error('[GoogleReviews] Both Places API attempts failed:', legacyErr.message);
                }
            }
        }

        // Determine combined rating, count, place URL, and reviews
        const rating = placeData?.rating ?? fallbackGoogleReviews.rating;
        const totalReviews = placeData?.totalReviews ?? fallbackGoogleReviews.totalReviews;
        const placeUrl = DEFAULT_GOOGLE_MAPS_URL;
        const writeReviewUrl = DEFAULT_WRITE_REVIEW_URL;
        const businessName = 'Aussie Smart Energy';

        // Priority for reviews list:
        // 1. Curated database reviews if any exist
        // 2. Live reviews from Google Places API if returned
        // 3. Fallback verified customer reviews
        let finalReviews = fallbackGoogleReviews.reviews;
        if (dbReviews && dbReviews.length > 0) {
            finalReviews = dbReviews;
        } else if (placeData?.reviews && placeData.reviews.length > 0) {
            finalReviews = placeData.reviews;
        }

        const responsePayload = {
            businessName,
            rating,
            totalReviews,
            placeUrl,
            writeReviewUrl,
            reviews: finalReviews
        };

        // Cache Google place summary
        reviewsCache = {
            data: {
                businessName,
                rating,
                totalReviews,
                placeUrl,
                writeReviewUrl
            },
            lastFetched: now,
            ttl: 30 * 60 * 1000
        };

        return res.status(200).json({
            success: true,
            source: placeData ? 'google_places_api' : 'fallback',
            ...responsePayload
        });
    } catch (error) {
        console.error('[GoogleReviews] Server error while fetching Google Reviews:', error.message);

        return res.status(200).json({
            success: true,
            source: 'fallback',
            warning: error.message,
            ...fallbackGoogleReviews
        });
    }
};

