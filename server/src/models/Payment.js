import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        projectNumber: {
            type: String,
            trim: true,
            default: '',
            index: true,
        },
        customer: {
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, required: true, trim: true },
            email: { type: String, required: true, trim: true, lowercase: true },
            phone: { type: String, required: true, trim: true },
            address: { type: String, trim: true, default: '' },
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        amountInCents: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            default: 'AUD',
            uppercase: true,
        },
        status: {
            type: String,
            enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED'],
            default: 'PENDING',
            index: true,
        },
        transactionId: {
            type: String,
            default: '',
            trim: true,
        },
        hostedCheckoutId: {
            type: String,
            default: '',
            trim: true,
            index: true,
        },
        redirectUrl: {
            type: String,
            default: '',
        },
        packageDetails: {
            title: { type: String, default: '' },
            packageId: { type: String, default: '' },
            formType: { type: String, default: '' },
            description: { type: String, default: '' },
        },
        rawResponse: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
