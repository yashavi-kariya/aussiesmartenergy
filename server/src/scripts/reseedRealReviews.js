import 'dotenv/config';
import mongoose from 'mongoose';
import Review from '../models/Review.js';
import { realAussieSmartEnergyReviews } from './seedReviews.js';

async function reseed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected to MongoDB');

    // Delete all existing google reviews
    const del = await Review.deleteMany({ platform: 'google' });
    console.log('Deleted:', del.deletedCount, 'google reviews');

    // Insert only the 10 real reviews
    await Review.insertMany(realAussieSmartEnergyReviews);

    const total = await Review.countDocuments({ platform: 'google' });
    const all = await Review.find({ platform: 'google' }).select('googleReviewId authorName displayOrder').sort({ displayOrder: 1 }).lean();
    console.log('Inserted', total, 'real reviews:');
    all.forEach(r => console.log(` ${r.displayOrder}. ${r.authorName} (${r.googleReviewId})`));

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

reseed();
