import crypto from 'crypto';
import Review from '../models/Review.js';
import { realAussieSmartEnergyReviews } from '../scripts/seedReviews.js';

const AUSSIE_SMART_ENERGY_NAME = 'Aussie Smart Energy';

const DEFAULT_GOOGLE_MAPS_URL =
    process.env.GOOGLE_BUSINESS_URL ||
    'https://www.google.com/maps/place/Aussie+Smart+Energy/@-24.1501978,148.5507008,3254937m/data=!3m1!1e3!4m18!1m9!3m8!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!2sAussie+Smart+Energy!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8!3m7!1s0x6ad68f00519106fd:0xa7f31a6fee7380cf!8m2!3d-24.1501978!4d148.5507008!9m1!1b1!16s%2Fg%2F11y8snbby8?entry=ttu';

const DEFAULT_WRITE_REVIEW_URL =
    process.env.GOOGLE_WRITE_REVIEW_URL ||
    'https://search.google.com/local/writereview?cid=12102045691718893775';

export function generateDeterministicReviewId(authorName, publishTime, rating, text) {
    const raw = `${(authorName || '').trim()}|${(publishTime || '').trim()}|${rating}|${(text || '').trim().slice(0, 100)}`;
    const hash = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 20);
    const sanitizedAuthor = (authorName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15);
    return `grev_${sanitizedAuthor}_${hash}`;
}

/**
 * Auto-discover Place ID using text search if not explicitly set
 */
async function autoResolvePlaceId(apiKey) {
    try {
        const url = 'https://places.googleapis.com/v1/places:searchText';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.id,places.displayName'
            },
            body: JSON.stringify({ textQuery: 'Aussie Smart Energy Australia' })
        });
        if (res.ok) {
            const data = await res.json();
            if (data.places && data.places.length > 0 && data.places[0].id) {
                return data.places[0].id;
            }
        }
    } catch (e) {
        console.warn('[GoogleSyncService] Auto-resolve Place ID error:', e.message);
    }
    return null;
}

/**
 * Fetch reviews from Places API (New)
 */
async function fetchPlacesApiNew(placeId, apiKey) {
    let targetPlaceId = (placeId || '').trim();
    if (!targetPlaceId) {
        targetPlaceId = await autoResolvePlaceId(apiKey);
        if (!targetPlaceId) return null;
    }

    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(targetPlaceId)}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

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
        throw new Error(`Google Places API returned status ${res.status}`);
    }

    const data = await res.json();
    const liveReviews = Array.isArray(data.reviews) ? data.reviews : [];

    // Filter only 4 to 5 star reviews
    const filtered = liveReviews
        .filter((r) => Number(r.rating) >= 4)
        .map((r) => {
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
                authorImage: r.authorAttribution?.photoUri || '',
                authorUrl: r.authorAttribution?.uri || DEFAULT_GOOGLE_MAPS_URL,
                rating,
                reviewText: text,
                publishTime,
                reviewDate: r.relativePublishTimeDescription || 'Recently',
                platform: 'google',
                source: 'google',
                isVerified: true,
                isFeatured: true
            };
        });

    return {
        businessName: AUSSIE_SMART_ENERGY_NAME,
        rating: typeof data.rating === 'number' ? Number(data.rating.toFixed(1)) : 5.0,
        totalReviews: typeof data.userRatingCount === 'number' ? data.userRatingCount : 79,
        placeUrl: data.googleMapsUri || DEFAULT_GOOGLE_MAPS_URL,
        reviews: filtered
    };
}

/**
 * Sync Google Reviews automatically into MongoDB
 */
export async function syncGoogleReviewsAutomatically() {
    try {
        const apiKey = (process.env.GOOGLE_PLACES_API_KEY || '').trim();
        const placeId = (process.env.GOOGLE_PLACE_ID || '').trim();

        // 1. Ensure baseline verified Google Maps reviews exist in DB
        const count = await Review.countDocuments({ platform: 'google', rating: { $gte: 4 } });
        if (count < 5) {
            for (const item of realAussieSmartEnergyReviews) {
                if (item.rating >= 4) {
                    await Review.findOneAndUpdate(
                        { googleReviewId: item.googleReviewId },
                        { $set: item },
                        { upsert: true, new: true }
                    );
                }
            }
            console.log(`[GoogleSyncService] Seeded baseline Google Maps reviews into MongoDB.`);
        }

        // 2. Query live Google Places API if configured
        if (apiKey) {
            const liveData = await fetchPlacesApiNew(placeId, apiKey);
            if (liveData && Array.isArray(liveData.reviews) && liveData.reviews.length > 0) {
                let newCount = 0;
                let updatedCount = 0;

                for (const r of liveData.reviews) {
                    // Only process 4-5 stars
                    if (r.rating < 4) continue;

                    const existing = await Review.findOne({
                        $or: [
                            { googleReviewId: r.googleReviewId },
                            { authorName: r.authorName, reviewText: r.reviewText }
                        ]
                    });

                    if (existing) {
                        existing.authorName = r.authorName;
                        existing.reviewText = r.reviewText;
                        existing.rating = r.rating;
                        existing.reviewDate = r.reviewDate;
                        if (r.authorImage && !existing.authorImage) {
                            existing.authorImage = r.authorImage;
                        }
                        await existing.save();
                        updatedCount++;
                    } else {
                        await Review.create({
                            ...r,
                            isGoogleFeatured: false,
                            displayOrder: 99
                        });
                        newCount++;
                    }
                }

                console.log(`[GoogleSyncService] Live Sync Complete: ${newCount} new reviews added, ${updatedCount} updated.`);
            }
        }
    } catch (err) {
        console.warn('[GoogleSyncService] Background sync warning:', err.message);
    }
}

/**
 * Initialize background interval sync (runs every 30 minutes)
 */
export function startGoogleReviewsBackgroundSync(intervalMs = 30 * 60 * 1000) {
    // Run initial sync 5 seconds after server boot
    setTimeout(() => {
        syncGoogleReviewsAutomatically();
    }, 5000);

    // Schedule periodic automatic sync
    setInterval(() => {
        console.log('[GoogleSyncService] Running scheduled automatic Google Reviews sync...');
        syncGoogleReviewsAutomatically();
    }, intervalMs);
}
