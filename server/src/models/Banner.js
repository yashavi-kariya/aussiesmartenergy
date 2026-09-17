import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    displayOrder: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default mongoose.model('Banner', BannerSchema);
