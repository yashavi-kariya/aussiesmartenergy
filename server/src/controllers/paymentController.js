import Payment from '../models/Payment.js';
import Enquiry from '../models/Enquiry.js';
import {
    createHostedCheckoutSession,
    getHostedCheckoutStatus,
    verifyWebhookSignature,
} from '../services/anzWorldlineService.js';

// Server-side Package Price Directory for Validation
const PACKAGE_PRICES = {
    '24kwh': 2499,
    '32kwh': 3499,
    '40kwh': 4499,
    '6.6kw-24kwh': 4999,
    '10kw-32kwh': 6999,
    '13.3kw-40kwh': 8999,
    'goodwe-24kwh': 2499,
};

/**
 * Create a new Payment order and ANZ Worldline Hosted Checkout Session
 * @route POST /api/payments/create
 */
export const createPayment = async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            amount,
            projectNumber,
            currency = 'AUD',
            packageDetails = {},
        } = req.body;

        // Input validation
        if (!firstName || !lastName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'First name, last name, email, and phone number are required.',
            });
        }

        if (/\d/.test(firstName) || /\d/.test(lastName)) {
            return res.status(400).json({
                success: false,
                message: 'First name and last name cannot contain numeric digits.',
            });
        }

        if (/[a-zA-Z]/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Phone number cannot contain alphabetic letters.',
            });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.includes(',') || email.includes(';') || (email.match(/@/g) || []).length > 1 || !emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: 'Only a single valid email address is allowed.',
            });
        }

        // Server-side amount validation
        let validatedAmount = Number(amount);
        const pkgId = (packageDetails.packageId || '').toLowerCase();
        if (PACKAGE_PRICES[pkgId]) {
            validatedAmount = PACKAGE_PRICES[pkgId];
        }

        if (!validatedAmount || isNaN(validatedAmount) || validatedAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'A valid payment amount is required.',
            });
        }

        if (validatedAmount > 100000) {
            return res.status(400).json({
                success: false,
                message: 'Payment amount cannot exceed $100,000.00 AUD.',
            });
        }

        const amountInCents = Math.round(validatedAmount * 100);
        const orderId = `ORD-ANZ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        // Step 1: Create PENDING payment record in database
        const payment = new Payment({
            orderId,
            projectNumber: (projectNumber || '').trim(),
            customer: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                address: (address || '').trim(),
            },
            amount: validatedAmount,
            amountInCents,
            currency: currency.toUpperCase(),
            status: 'PENDING',
            packageDetails: {
                title: packageDetails.title || 'Solar / Battery Package',
                packageId: packageDetails.packageId || 'custom',
                formType: packageDetails.formType || 'general',
                description: packageDetails.description || '',
            },
        });

        await payment.save();

        // Step 1b: Create matching Enquiry record for Admin Dashboard
        try {
            await Enquiry.create({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                address: (address || '').trim(),
                message: `Pay Online Payment: $${validatedAmount} AUD (Ref: ${projectNumber || orderId})`,
                formType: packageDetails.formType || 'finance-plan',
                source: 'website',
            });
        } catch (eErr) {
            console.warn('⚠️ Could not save matching enquiry record:', eErr.message);
        }

        // Step 2: Build Return URL for ANZ Hosted Checkout
        const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
        const returnUrl = `${frontendUrl}/payment/result?paymentId=${payment._id}`;

        // Step 3: Create Hosted Checkout Session via ANZ Worldline Service
        const checkoutSession = await createHostedCheckoutSession({
            orderId: payment.orderId,
            projectNumber: req.body.projectNumber || payment.orderId,
            amountInCents,
            currency: payment.currency,
            returnUrl,
            customer: payment.customer,
            packageDetails: payment.packageDetails,
        });

        // Step 4: Update payment record with checkout details
        payment.hostedCheckoutId = checkoutSession.hostedCheckoutId;
        payment.redirectUrl = checkoutSession.redirectUrl;
        payment.rawResponse = checkoutSession.raw || { isMock: checkoutSession.isMock };
        await payment.save();

        res.status(201).json({
            success: true,
            message: 'Hosted checkout session created successfully.',
            data: {
                paymentId: payment._id,
                orderId: payment.orderId,
                hostedCheckoutId: payment.hostedCheckoutId,
                redirectUrl: payment.redirectUrl,
                amount: payment.amount,
                currency: payment.currency,
                isMock: checkoutSession.isMock || false,
            },
        });
    } catch (error) {
        console.error('❌ Error creating payment:', error);
        next(error);
    }
};

/**
 * Get current Payment Status and verify with ANZ Worldline
 * @route GET /api/payments/:paymentId/status
 */
export const getPaymentStatus = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const { hostedCheckoutId: queryCheckoutId, status: queryStatus } = req.query;

        let payment = null;
        if (paymentId && paymentId !== 'undefined' && paymentId.match(/^[0-9a-fA-F]{24}$/)) {
            payment = await Payment.findById(paymentId);
        }

        if (!payment && queryCheckoutId) {
            payment = await Payment.findOne({ hostedCheckoutId: queryCheckoutId });
        }

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment record not found.',
            });
        }

        // If payment is pending, query ANZ Worldline Hosted Checkout status API
        if (payment.status === 'PENDING' && payment.hostedCheckoutId) {
            try {
                const statusResult = await getHostedCheckoutStatus(payment.hostedCheckoutId, req.query);
                
                payment.status = statusResult.status;
                if (statusResult.transactionId) {
                    payment.transactionId = statusResult.transactionId;
                }
                if (statusResult.response) {
                    payment.rawResponse = statusResult.response;
                }
                await payment.save();
            } catch (verr) {
                console.warn('⚠️ Could not verify status with ANZ API, returning local record status:', verr.message);
            }
        }

        res.json({
            success: true,
            data: {
                paymentId: payment._id,
                orderId: payment.orderId,
                projectNumber: payment.projectNumber || '',
                status: payment.status,
                transactionId: payment.transactionId,
                amount: payment.amount,
                currency: payment.currency,
                customer: payment.customer,
                packageDetails: payment.packageDetails,
                createdAt: payment.createdAt,
                updatedAt: payment.updatedAt,
            },
        });
    } catch (error) {
        console.error('❌ Error fetching payment status:', error);
        next(error);
    }
};

/**
 * Handle ANZ Worldline Webhooks
 * @route POST /api/payments/webhook
 */
export const handleWebhook = async (req, res, next) => {
    try {
        const isVerified = verifyWebhookSignature(req);
        if (!isVerified) {
            return res.status(400).json({ success: false, message: 'Invalid webhook signature.' });
        }

        const event = req.body;
        const hostedCheckoutId = event.hostedCheckoutId || event.payment?.hostedCheckoutId;
        const merchantOrderId = event.payment?.paymentOutput?.references?.merchantOrderId || event.merchantOrderId;

        if (hostedCheckoutId || merchantOrderId) {
            const payment = await Payment.findOne({
                $or: [
                    { hostedCheckoutId: hostedCheckoutId },
                    { orderId: merchantOrderId },
                ],
            });

            if (payment) {
                const eventType = event.type || event.payment?.statusOutput?.status;
                if (eventType) {
                    if (eventType.includes('PAID') || eventType.includes('CAPTURED')) {
                        payment.status = 'SUCCESS';
                    } else if (eventType.includes('CANCELLED')) {
                        payment.status = 'CANCELLED';
                    } else if (eventType.includes('REJECTED') || eventType.includes('FAILED')) {
                        payment.status = 'FAILED';
                    }
                    if (event.payment?.id) {
                        payment.transactionId = event.payment.id;
                    }
                    payment.rawResponse = event;
                    await payment.save();
                }
            }
        }

        res.json({ success: true, message: 'Webhook received and processed.' });
    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.status(500).json({ success: false, message: 'Webhook processing error.' });
    }
};

/**
 * Admin: Get all payments list with filters and statistics
 * @route GET /api/payments/admin/all
 */
export const getAdminPayments = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            status = '',
            sortBy = 'createdAt',
            sortOrder = 'desc',
        } = req.query;

        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const skip = (pageNum - 1) * limitNum;

        const filter = {};
        if (status) {
            filter.status = status.toUpperCase();
        }

        if (search) {
            filter.$or = [
                { orderId: { $regex: search, $options: 'i' } },
                { projectNumber: { $regex: search, $options: 'i' } },
                { transactionId: { $regex: search, $options: 'i' } },
                { 'customer.firstName': { $regex: search, $options: 'i' } },
                { 'customer.lastName': { $regex: search, $options: 'i' } },
                { 'customer.email': { $regex: search, $options: 'i' } },
                { 'customer.phone': { $regex: search, $options: 'i' } },
                { 'packageDetails.title': { $regex: search, $options: 'i' } },
            ];
        }

        const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

        const [payments, total] = await Promise.all([
            Payment.find(filter).sort(sort).skip(skip).limit(limitNum),
            Payment.countDocuments(filter),
        ]);

        const allPayments = await Payment.find({});
        const stats = {
            total: allPayments.length,
            success: allPayments.filter(p => p.status === 'SUCCESS').length,
            pending: allPayments.filter(p => p.status === 'PENDING').length,
            failed: allPayments.filter(p => p.status === 'FAILED').length,
            cancelled: allPayments.filter(p => p.status === 'CANCELLED').length,
            totalRevenue: allPayments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
        };

        res.json({
            success: true,
            data: {
                payments,
                pagination: {
                    total,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: Math.ceil(total / limitNum) || 1,
                },
                stats,
            },
        });
    } catch (error) {
        console.error('❌ Error fetching admin payments:', error);
        next(error);
    }
};

export default {
    createPayment,
    getPaymentStatus,
    handleWebhook,
    getAdminPayments,
};
