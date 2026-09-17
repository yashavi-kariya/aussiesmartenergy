import mongoose from 'mongoose';

const HeadlineSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Headline text is required'],
        trim: true,
        maxlength: [350, 'Headline text cannot exceed 350 characters'],
    },
    badge: {
        type: String,
        trim: true,
        default: '',
        maxlength: [50, 'Badge text cannot exceed 50 characters'],
    },
    link: {
        type: String,
        trim: true,
        default: '',
    },
    linkText: {
        type: String,
        trim: true,
        default: '',
        maxlength: [50, 'Link text cannot exceed 50 characters'],
    },
    icon: {
        type: String,
        trim: true,
        default: 'zap', // zap, sparkles, gift, tag, megaphone, alert, sun, flame
    },
    theme: {
        type: String,
        trim: true,
        default: 'navy-green', // navy-green, solar-amber, crimson, electric-blue, dark-slate
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    displayOrder: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

export default mongoose.model('Headline', HeadlineSchema);
