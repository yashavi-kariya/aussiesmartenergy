import { body, validationResult } from 'express-validator';

export const validateAdminLogin = [
    body('identifier').trim().notEmpty().withMessage('Username or email is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
        }
        next();
    },
];
