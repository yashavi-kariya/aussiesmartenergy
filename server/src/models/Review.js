import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
    },
    roleOrLocation: {
        type: String,
        default: 'Verified Customer',
        trim: true,
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5,
    },
    reviewText: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true,
    },
    authorImage: {
        type: String,
        default: '',
    },
    reviewDate: {
        type: String,
        default: 'Recently',
        trim: true,
    },
    reviewLink: {
        type: String,
        default: '',
        trim: true,
    },
    platform: {
        type: String,
        enum: ['google', 'solarquotes', 'productreview', 'trustpilot', 'website', 'other'],
        default: 'google',
    },
    isFeatured: {
        type: Boolean,
        default: true,
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    displayOrder: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
