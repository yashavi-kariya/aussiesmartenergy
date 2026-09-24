import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const ReviewSchema = new mongoose.Schema({}, { strict: false });
const Review = mongoose.model('Review', ReviewSchema);

async function clean() {
  await mongoose.connect(process.env.MONGODB_URI);
  const deleted = await Review.deleteMany({
    authorName: { $in: ['John Doe', 'Linda George', 'Marinda Wilson'] }
  });
  console.log('Deleted static reviews:', deleted.deletedCount);
  const remaining = await Review.find({});
  console.log('Remaining reviews in DB:', remaining.length);
  process.exit(0);
}
clean();
