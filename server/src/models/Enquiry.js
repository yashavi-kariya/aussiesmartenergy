import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        phone: { type: String, required: true, trim: true },
        address: { type: String, trim: true, default: '' },
        message: { type: String, trim: true, default: '' },
        formType: {
            type: String,
            enum: [
                'hero',
                'contact',
                'residential-6.6kw',
                'residential-10.5kw',
                'residential-13.2kw',
                'commercial-20kw',
                'commercial-30kw',
                'commercial-50kw',
                'commercial-100kw',
            ],
            default: 'contact',
        },
        source: { type: String, default: 'website' },
    },
    { timestamps: true }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
