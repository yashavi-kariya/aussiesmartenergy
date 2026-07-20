import { body, validationResult } from 'express-validator';

export const validateEnquiry = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('address').optional({ values: 'falsy' }).trim(),
    body('message').optional({ values: 'falsy' }).trim(),
    body('formType').optional().isIn([
        'hero', 'contact',
        'residential-6.6kw', 'residential-10.5kw', 'residential-13.2kw',
        'commercial-20kw', 'commercial-30kw', 'commercial-50kw', 'commercial-100kw',
    ]).withMessage('Invalid form type'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
        }
        next();
    },
];
