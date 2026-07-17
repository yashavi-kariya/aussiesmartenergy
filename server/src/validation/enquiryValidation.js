import { body, validationResult } from 'express-validator';

export const validateEnquiry = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('address').optional({ values: 'falsy' }).trim(),
    body('message').optional({ values: 'falsy' }).trim(),
    body('formType').optional().isIn(['hero', 'contact']).withMessage('Form type must be hero or contact'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
        }
        next();
    },
];
