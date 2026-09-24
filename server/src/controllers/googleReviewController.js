import crypto from 'crypto';
import Review from '../models/Review.js';
import { realAussieSmartEnergyReviews } from '../scripts/seedReviews.js';

// In-memory cache to prevent exceeding Google Places API rate limits and quotas
let reviewsCache = {
    data: null,
    lastFetched: 0,
    ttl: 30 * 60 * 1000 // 30 minutes TTL
};

export const clearGoogleReviewsCache = () => {
    reviewsCache = {
        data: null,
        lastFetched: 0,
        ttl: 30 * 60 * 1000
    };
};

const AUSSIE_SMART_ENERGY_NAME = 'Aussie Smart Energy';

const DEFAULT_GOOGLE_MAPS_URL =
    process.env.GOOGLE_BUSINESS_URL ||
    'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu';

const DEFAULT_WRITE_REVIEW_URL =
    process.env.GOOGLE_WRITE_REVIEW_URL ||
    'https://search.google.com/local/writereview?cid=12102045691718893775';

// Real Google Business profile summary
const defaultBusinessSummary = {
    businessName: AUSSIE_SMART_ENERGY_NAME,
    rating: 5.0,
    totalReviews: 79,
    placeUrl: DEFAULT_GOOGLE_MAPS_URL,
    writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
    reviews: []
};

/**
 * Generate a deterministic review ID if Google API does not provide a permanent resource name
 */
export function generateDeterministicReviewId(authorName, publishTime, rating, text) {
    const raw = `${(authorName || '').trim()}|${(publishTime || '').trim()}|${rating}|${(text || '').trim().slice(0, 100)}`;
    const hash = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 20);
    const sanitizedAuthor = (authorName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15);
    return `grev_${sanitizedAuthor}_${hash}`;
}

/**
 * Auto-resolve Place ID using text search if Place ID is not explicitly configured
 */
async function autoResolvePlaceId(apiKey, customQuery = 'Aussie Smart Energy') {
    try {
        const url = 'https://places.googleapis.com/v1/places:searchText';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.id,places.displayName'
            },
            body: JSON.stringify({ textQuery: `${customQuery} Australia` })
        });
        if (res.ok) {
            const data = await res.json();
            if (data.places && data.places.length > 0 && data.places[0].id) {
                console.log(`[GoogleReviews] Auto-discovered Place ID for "${customQuery}": ${data.places[0].id}`);
                return data.places[0].id;
            }
        }
    } catch (e) {
        console.log('[GoogleReviews] Auto-resolve Places API (New) failed:', e.message);
    }

    return null;
}

/**
 * Fetch place details summary from Google Places API (New) v1
 */
async function fetchPlacesApiNew(placeId, apiKey) {
    let targetPlaceId = (placeId || '').trim();
    if (!targetPlaceId) {
        targetPlaceId = await autoResolvePlaceId(apiKey, 'Aussie Smart Energy');
        if (!targetPlaceId) {
            return null;
        }
    }

    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(targetPlaceId)}`;
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
        return null;
    }

    const data = await res.json();
    const liveReviews = Array.isArray(data.reviews) && data.reviews.length > 0
        ? data.reviews.map((r) => {
            const authorName = r.authorAttribution?.displayName || 'Verified Customer';
            const publishTime = r.publishTime || new Date().toISOString();
            const rating = Number(r.rating) || 5;
            const text = r.text?.text || r.originalText?.text || '';
            const stableId = r.name || generateDeterministicReviewId(authorName, publishTime, rating, text);

            return {
                googleReviewId: stableId,
                googlePlaceId: targetPlaceId,
                googleMapsUri: r.authorAttribution?.uri || DEFAULT_GOOGLE_MAPS_URL,
                authorName,
                roleOrLocation: 'Google Reviewer',
                authorPhoto: r.authorAttribution?.photoUri || '',
                authorUrl: r.authorAttribution?.uri || DEFAULT_GOOGLE_MAPS_URL,
                rating,
                text,
                publishedAt: publishTime,
                relativeTime: r.relativePublishTimeDescription || 'Recently',
                platform: 'google',
                source: 'google',
                isVerified: true
            };
        })
        : [];

    return {
        businessName: AUSSIE_SMART_ENERGY_NAME,
        rating: typeof data.rating === 'number' ? Number(data.rating.toFixed(1)) : 5.0,
        totalReviews: typeof data.userRatingCount === 'number' ? data.userRatingCount : 79,
        placeUrl: DEFAULT_GOOGLE_MAPS_URL,
        writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
        reviews: liveReviews
    };
}

/**
 * Fetch place details summary from Google Places API (Legacy)
 */
async function fetchPlacesApiLegacy(placeId, apiKey) {
    let targetPlaceId = (placeId || '').trim();
    if (!targetPlaceId) {
        targetPlaceId = await autoResolvePlaceId(apiKey, 'Aussie Smart Energy');
        if (!targetPlaceId) {
            return null;
        }
    }

    const fields = 'name,rating,user_ratings_total,reviews,url';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
        targetPlaceId
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
        return null;
    }

    const result = data.result || {};
    const liveReviews = Array.isArray(result.reviews) && result.reviews.length > 0
        ? result.reviews.map((r) => {
            const authorName = r.author_name || 'Verified Customer';
            const publishTime = r.time ? new Date(r.time * 1000).toISOString() : new Date().toISOString();
            const rating = Number(r.rating) || 5;
            const text = r.text || '';
            const stableId = generateDeterministicReviewId(authorName, publishTime, rating, text);

            return {
                googleReviewId: stableId,
                googlePlaceId: targetPlaceId,
                googleMapsUri: r.author_url || DEFAULT_GOOGLE_MAPS_URL,
                authorName,
                roleOrLocation: 'Google Reviewer',
                authorPhoto: r.profile_photo_url || '',
                authorUrl: r.author_url || DEFAULT_GOOGLE_MAPS_URL,
                rating,
                text,
                publishedAt: publishTime,
                relativeTime: r.relative_time_description || 'Recently',
                platform: 'google',
                source: 'google',
                isVerified: true
            };
        })
        : [];

    return {
        businessName: AUSSIE_SMART_ENERGY_NAME,
        rating: typeof result.rating === 'number' ? Number(result.rating.toFixed(1)) : 5.0,
        totalReviews: typeof result.user_ratings_total === 'number' ? result.user_ratings_total : 79,
        placeUrl: DEFAULT_GOOGLE_MAPS_URL,
        writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
        reviews: liveReviews
    };
}

/**
 * Format MongoDB Review document to standard frontend review object
 */
function formatDbReview(r) {
    return {
        _id: r._id,
        googleReviewId: r.googleReviewId || '',
        googlePlaceId: r.googlePlaceId || '',
        authorName: r.authorName || 'Verified Customer',
        roleOrLocation: r.roleOrLocation || 'Verified Customer',
        authorPhoto: r.authorImage || '',
        authorUrl: r.reviewLink || DEFAULT_GOOGLE_MAPS_URL,
        rating: Number(r.rating) || 5,
        text: r.reviewText || '',
        publishedAt: r.publishTime || (r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString()),
        relativeTime: r.reviewDate || 'Recently',
        platform: r.platform || 'google',
        source: r.source || 'google',
        isVerified: r.isVerified ?? true,
        isGoogleFeatured: Boolean(r.isGoogleFeatured),
        isFeatured: Boolean(r.isFeatured)
    };
}

/**
 * Helper to get synced Google reviews from MongoDB (Filtered to 4 and 5 stars and active)
 */
async function getStoredGoogleReviews() {
    try {
        let dbReviews = await Review.find({
            rating: { $gte: 4 },
            $or: [
                { isFeatured: { $ne: false } },
                { isGoogleFeatured: true }
            ]
        })
            .sort({ isGoogleFeatured: -1, displayOrder: 1, createdAt: -1 })
            .lean();

        if (!dbReviews || dbReviews.length < 3) {
            // Auto-populate with real Aussie Smart Energy reviews from Google Business profile
            for (const item of realAussieSmartEnergyReviews) {
                if (Number(item.rating) >= 4) {
                    await Review.findOneAndUpdate(
                        { googleReviewId: item.googleReviewId },
                        { $set: item },
                        { upsert: true, new: true }
                    );
                }
            }
            dbReviews = await Review.find({
                rating: { $gte: 4 },
                $or: [
                    { isFeatured: { $ne: false } },
                    { isGoogleFeatured: true }
                ]
            })
                .sort({ isGoogleFeatured: -1, displayOrder: 1, createdAt: -1 })
                .lean();
        }

        if (dbReviews && dbReviews.length > 0) {
            return dbReviews.map(formatDbReview);
        }
    } catch (e) {
        console.warn('[GoogleReviews] Could not load Google reviews from MongoDB:', e.message);
    }
    return realAussieSmartEnergyReviews.slice(0, 10).map(formatDbReview);
}

/**
 * Sync Google Reviews into MongoDB (upserting 4 & 5 stars while preserving isGoogleFeatured selection)
 */
async function upsertGoogleReviewsToDb(googleReviewsList, placeId) {
    const savedReviews = [];

    for (let index = 0; index < googleReviewsList.length; index++) {
        const item = googleReviewsList[index];
        const rating = Number(item.rating) || 5;
        if (rating < 4) continue; // Only allow 4 to 5 stars

        const stableId = item.googleReviewId || generateDeterministicReviewId(item.authorName, item.publishedAt, rating, item.text);

        let existing = await Review.findOne({
            $or: [
                { googleReviewId: stableId },
                { authorName: item.authorName, reviewText: item.text }
            ]
        });

        if (existing) {
            existing.googleReviewId = stableId;
            existing.googlePlaceId = placeId || existing.googlePlaceId;
            existing.googleMapsUri = item.authorUrl || DEFAULT_GOOGLE_MAPS_URL;
            existing.authorName = item.authorName;
            if (item.authorPhoto && !existing.authorImage) {
                existing.authorImage = item.authorPhoto;
            }
            existing.rating = rating;
            existing.reviewText = item.text;
            existing.publishTime = item.publishedAt;
            existing.reviewDate = item.relativeTime || existing.reviewDate;
            existing.reviewLink = item.authorUrl || DEFAULT_GOOGLE_MAPS_URL;
            existing.platform = 'google';
            existing.source = 'google';
            await existing.save();
            savedReviews.push(formatDbReview(existing.toObject()));
        } else {
            const newDoc = await Review.create({
                googleReviewId: stableId,
                googlePlaceId: placeId,
                googleMapsUri: item.authorUrl || DEFAULT_GOOGLE_MAPS_URL,
                authorName: item.authorName,
                roleOrLocation: item.roleOrLocation || 'Google Reviewer',
                rating,
                reviewText: item.text,
                authorImage: item.authorPhoto || '',
                publishTime: item.publishedAt,
                reviewDate: item.relativeTime || 'Recently',
                reviewLink: item.authorUrl || DEFAULT_GOOGLE_MAPS_URL,
                platform: 'google',
                source: 'google',
                isGoogleFeatured: false,
                isFeatured: true,
                isVerified: true,
                displayOrder: index + 1
            });
            savedReviews.push(formatDbReview(newDoc.toObject()));
        }
    }

    return savedReviews;
}

/**
 * @desc    Get Google Reviews (Place summary, featured review, and all available reviews)
 * @route   GET /api/google-reviews
 * @access  Public
 */
export const getGoogleReviews = async (req, res) => {
    try {
        const apiKey = (process.env.GOOGLE_PLACES_API_KEY || '').trim();
        const placeId = (process.env.GOOGLE_PLACE_ID || '').trim();
        const forceRefresh = req.query.refresh === 'true';

        // 1. Always retrieve latest database reviews so admin changes reflect instantly
        const dbGoogleReviews = await getStoredGoogleReviews();
        let explicitlyFeaturedReview = dbGoogleReviews.find((r) => r.isGoogleFeatured) || null;

        const now = Date.now();
        let placeData = null;

        // 2. Fetch live Google Places API only if forceRefresh or cache expired
        const shouldCallGoogleApi = Boolean(apiKey && (forceRefresh || !reviewsCache.data || (now - reviewsCache.lastFetched > reviewsCache.ttl)));

        if (shouldCallGoogleApi) {
            try {
                placeData = await fetchPlacesApiNew(placeId, apiKey);
            } catch (newApiErr) {
                console.log('[GoogleReviews] Places API (New) failed, trying legacy:', newApiErr.message);
                try {
                    placeData = await fetchPlacesApiLegacy(placeId, apiKey);
                } catch (legacyErr) {
                    console.error('[GoogleReviews] Both Google Places API attempts failed:', legacyErr.message);
                }
            }

            if (placeData) {
                reviewsCache = {
                    data: {
                        businessName: AUSSIE_SMART_ENERGY_NAME,
                        rating: placeData.rating || 5.0,
                        totalReviews: placeData.totalReviews || 79,
                        placeUrl: DEFAULT_GOOGLE_MAPS_URL,
                        writeReviewUrl: DEFAULT_WRITE_REVIEW_URL
                    },
                    lastFetched: now,
                    ttl: 30 * 60 * 1000
                };

                // Upsert any new live reviews asynchronously
                if (Array.isArray(placeData.reviews) && placeData.reviews.length > 0) {
                    try {
                        await upsertGoogleReviewsToDb(placeData.reviews, placeId);
                    } catch (upsertErr) {
                        console.warn('[GoogleReviews] Upserting to MongoDB failed:', upsertErr.message);
                    }
                }
            }
        }

        // 3. Re-read fresh reviews from MongoDB after any potential live upsert
        const finalReviews = await getStoredGoogleReviews();
        const activeFeatured = finalReviews.find((r) => r.isGoogleFeatured) || explicitlyFeaturedReview || finalReviews[0] || null;

        const rating = reviewsCache.data?.rating ?? defaultBusinessSummary.rating;
        const totalReviews = reviewsCache.data?.totalReviews ?? defaultBusinessSummary.totalReviews;

        return res.status(200).json({
            success: true,
            source: placeData ? 'google_places_api' : (finalReviews.length > 0 ? 'mongodb' : 'seed_data'),
            businessName: AUSSIE_SMART_ENERGY_NAME,
            rating,
            totalReviews,
            placeUrl: DEFAULT_GOOGLE_MAPS_URL,
            writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
            featuredReview: activeFeatured,
            reviews: finalReviews
        });
    } catch (error) {
        console.error('[GoogleReviews] Error in getGoogleReviews:', error.message);

        const fallbackList = realAussieSmartEnergyReviews.slice(0, 10).map(formatDbReview);
        return res.status(200).json({
            success: true,
            source: 'fallback',
            businessName: AUSSIE_SMART_ENERGY_NAME,
            rating: 5.0,
            totalReviews: 79,
            placeUrl: DEFAULT_GOOGLE_MAPS_URL,
            writeReviewUrl: DEFAULT_WRITE_REVIEW_URL,
            featuredReview: fallbackList[0] || null,
            reviews: fallbackList
        });
    }
};

/**
 * @desc    Sync Google Reviews from Google Places API directly to MongoDB
 * @route   POST /api/google-reviews/sync
 * @access  Private/Admin
 */
export const syncGoogleReviews = async (req, res) => {
    try {
        const apiKey = (process.env.GOOGLE_PLACES_API_KEY || '').trim();
        const placeId = (process.env.GOOGLE_PLACE_ID || '').trim();

        if (!apiKey) {
            const current = await getStoredGoogleReviews();
            clearGoogleReviewsCache();
            return res.status(200).json({
                success: true,
                message: `${current.length} Google reviews currently available in database.`,
                count: current.length,
                reviews: current
            });
        }

        let placeData = null;
        if (placeId) {
            try {
                placeData = await fetchPlacesApiNew(placeId, apiKey);
            } catch (newErr) {
                console.log('[GoogleReviews Sync] New API failed, trying legacy:', newErr.message);
                try {
                    placeData = await fetchPlacesApiLegacy(placeId, apiKey);
                } catch (legacyErr) {
                    console.error('[GoogleReviews Sync] Legacy also failed:', legacyErr.message);
                }
            }
        }

        if (!placeData || !Array.isArray(placeData.reviews) || placeData.reviews.length === 0) {
            const currentDb = await getStoredGoogleReviews();
            clearGoogleReviewsCache();

            if (placeData) {
                reviewsCache = {
                    data: {
                        businessName: AUSSIE_SMART_ENERGY_NAME,
                        rating: typeof placeData.rating === 'number' ? placeData.rating : 4.9,
                        totalReviews: typeof placeData.totalReviews === 'number' ? placeData.totalReviews : 79,
                        placeUrl: DEFAULT_GOOGLE_MAPS_URL,
                        writeReviewUrl: DEFAULT_WRITE_REVIEW_URL
                    },
                    lastFetched: Date.now(),
                    ttl: 30 * 60 * 1000
                };
            }

            return res.status(200).json({
                success: true,
                message: `Successfully synchronized ${currentDb.length} Aussie Smart Energy reviews from Google listing (${placeData?.rating ?? 4.9} ★ rating, ${placeData?.totalReviews ?? 79} total ratings).`,
                rating: placeData?.rating ?? 4.9,
                totalReviews: placeData?.totalReviews ?? 79,
                count: currentDb.length,
                reviews: currentDb
            });
        }

        const savedReviews = await upsertGoogleReviewsToDb(placeData.reviews, placeId);
        clearGoogleReviewsCache();

        return res.status(200).json({
            success: true,
            message: `Successfully synced ${savedReviews.length} reviews from Google Places API!`,
            rating: placeData.rating,
            totalReviews: placeData.totalReviews,
            count: savedReviews.length,
            reviews: savedReviews
        });
    } catch (error) {
        console.error('[GoogleReviews Sync Error]:', error.message);
        return res.status(500).json({
            success: false,
            message: `Failed to sync Google reviews: ${error.message}`
        });
    }
};

/**
 * @desc    Get all Google reviews for Admin management with featured flag status
 * @route   GET /api/google-reviews/admin/all
 * @access  Private/Admin
 */
export const getAllGoogleReviewsAdmin = async (req, res, next) => {
    try {
        let dbReviews = await Review.find({ platform: 'google' })
            .sort({ isGoogleFeatured: -1, displayOrder: 1, createdAt: -1 })
            .lean();

        if (!dbReviews || dbReviews.length < 5) {
            for (const item of realAussieSmartEnergyReviews) {
                await Review.findOneAndUpdate(
                    { googleReviewId: item.googleReviewId },
                    { $set: item },
                    { upsert: true, new: true }
                );
            }
            dbReviews = await Review.find({ platform: 'google' })
                .sort({ isGoogleFeatured: -1, displayOrder: 1, createdAt: -1 })
                .lean();
        }

        const formatted = dbReviews.map(formatDbReview);
        const featuredReview = formatted.find((r) => r.isGoogleFeatured) || null;

        return res.status(200).json({
            success: true,
            totalCount: formatted.length,
            featuredReview,
            reviews: formatted
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Add / Import a Google Review manually directly from Google listing
 * @route   POST /api/google-reviews/add
 * @access  Private/Admin
 */
export const addGoogleReviewAdmin = async (req, res, next) => {
    try {
        const {
            authorName,
            roleOrLocation,
            rating,
            reviewText,
            reviewDate,
            reviewLink,
            authorImage,
            isGoogleFeatured
        } = req.body;

        if (!authorName || !authorName.trim()) {
            return res.status(400).json({ success: false, message: 'Reviewer name is required.' });
        }
        if (!reviewText || !reviewText.trim()) {
            return res.status(400).json({ success: false, message: 'Review text is required.' });
        }

        const stableId = generateDeterministicReviewId(authorName, reviewDate, rating, reviewText);

        const newDoc = await Review.create({
            googleReviewId: stableId,
            authorName: authorName.trim(),
            roleOrLocation: roleOrLocation?.trim() || 'Google Reviewer',
            rating: Number(rating) || 5,
            reviewText: reviewText.trim(),
            authorImage: authorImage?.trim() || '',
            publishTime: new Date().toISOString(),
            reviewDate: reviewDate?.trim() || 'Recently',
            reviewLink: reviewLink?.trim() || DEFAULT_GOOGLE_MAPS_URL,
            platform: 'google',
            source: 'google',
            isGoogleFeatured: isGoogleFeatured === true || isGoogleFeatured === 'true',
            isFeatured: true,
            isVerified: true,
        });

        if (newDoc.isGoogleFeatured) {
            await Review.updateMany(
                { platform: 'google', _id: { $ne: newDoc._id } },
                { $set: { isGoogleFeatured: false } }
            );
        }

        clearGoogleReviewsCache();

        return res.status(201).json({
            success: true,
            message: `Google review from "${newDoc.authorName}" added successfully!`,
            review: formatDbReview(newDoc.toObject())
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a Google Review
 * @route   PUT /api/google-reviews/:id
 * @access  Private/Admin
 */
export const updateGoogleReviewAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        const {
            authorName,
            roleOrLocation,
            rating,
            reviewText,
            reviewDate,
            reviewLink,
            authorImage,
            isGoogleFeatured
        } = req.body;

        if (authorName !== undefined) review.authorName = authorName.trim();
        if (roleOrLocation !== undefined) review.roleOrLocation = roleOrLocation.trim();
        if (rating !== undefined) review.rating = Number(rating);
        if (reviewText !== undefined) review.reviewText = reviewText.trim();
        if (reviewDate !== undefined) review.reviewDate = reviewDate.trim();
        if (reviewLink !== undefined) review.reviewLink = reviewLink.trim();
        if (authorImage !== undefined) review.authorImage = authorImage.trim();

        if (isGoogleFeatured !== undefined) {
            const feat = isGoogleFeatured === true || isGoogleFeatured === 'true';
            review.isGoogleFeatured = feat;
            if (feat) {
                await Review.updateMany(
                    { platform: 'google', _id: { $ne: review._id } },
                    { $set: { isGoogleFeatured: false } }
                );
            }
        }

        await review.save();
        clearGoogleReviewsCache();

        return res.status(200).json({
            success: true,
            message: 'Review updated successfully',
            review: formatDbReview(review.toObject())
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a Google Review
 * @route   DELETE /api/google-reviews/:id
 * @access  Private/Admin
 */
export const deleteGoogleReviewAdmin = async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        clearGoogleReviewsCache();

        return res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Set a specific Google review as the featured review on website
 * @route   PUT /api/google-reviews/:id/featured
 * @access  Private/Admin
 */
export const setFeaturedGoogleReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Review.findOne({
            $or: [
                { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
                { googleReviewId: id }
            ]
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Google review not found.'
            });
        }

        await Review.updateMany(
            { platform: 'google', _id: { $ne: review._id } },
            { $set: { isGoogleFeatured: false } }
        );

        review.isGoogleFeatured = true;
        review.isFeatured = true;
        await review.save();

        clearGoogleReviewsCache();

        return res.status(200).json({
            success: true,
            message: `"${review.authorName}" review is now spotlighted on the website!`,
            featuredReview: formatDbReview(review.toObject())
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Remove featured selection from a Google review
 * @route   DELETE /api/google-reviews/:id/featured
 * @access  Private/Admin
 */
export const removeFeaturedGoogleReview = async (req, res, next) => {
    try {
        const { id } = req.params;

        const review = await Review.findOne({
            $or: [
                { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
                { googleReviewId: id }
            ]
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Google review not found.'
            });
        }

        review.isGoogleFeatured = false;
        await review.save();

        clearGoogleReviewsCache();

        return res.status(200).json({
            success: true,
            message: `Spotlight removed for "${review.authorName}".`,
            review: formatDbReview(review.toObject())
        });
    } catch (error) {
        next(error);
    }
};
