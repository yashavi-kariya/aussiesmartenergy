import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    longDescription: { type: String, default: '' },
    mainImage: { type: String, default: '' },
    gallery: [{ type: String }],
    slug: { type: String, required: true, unique: true, index: true },
    displayOrder: { type: Number, default: 0 },
    deletedFromAdmin: { type: Boolean, default: false },
    // Dynamic SEO Fields
    seoTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    focusKeyword: { type: String, default: '' },
    canonicalUrl: { type: String, default: '' },
    ogTitle: { type: String, default: '' },
    ogDescription: { type: String, default: '' },
    ogImage: { type: String, default: '' },
    noIndex: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
