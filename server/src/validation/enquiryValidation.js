import { body, validationResult } from 'express-validator';

export const validateEnquiry = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone is required')
        .custom((val) => {
            let clean = val.replace(/[^\d+]/g, '');
            if (clean.startsWith('+61')) clean = '0' + clean.slice(3);
            else if (clean.startsWith('61') && clean.length > 10) clean = '0' + clean.slice(2);
            const digits = clean.replace(/\D/g, '');
            if (digits.length !== 10) {
                throw new Error('Phone number must be a 10-digit Australian phone number');
            }
            if (!/^(0[23478]\d{8}|1[38]00\d{6}|0\d{9})$/.test(digits)) {
                throw new Error('Please enter a valid 10-digit Australian phone number');
            }
            return true;
        }),
    body('address').optional({ values: 'falsy' }).trim(),
    body('message').optional({ values: 'falsy' }).trim(),
    body('formType').optional().isIn([
        'hero', 'contact',
        'residential-6.6kw', 'residential-10.5kw', 'residential-13.2kw',
        'commercial-20kw', 'commercial-30kw', 'commercial-50kw', 'commercial-100kw',
        'savings-check', 'finance-plan', 'general',
    ]).withMessage('Invalid form type'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
        }
        next();
    },
];
