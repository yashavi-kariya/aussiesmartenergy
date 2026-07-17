import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const loginAdmin = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;
        const admin = await Admin.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });

        if (!admin) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 'Invalid credentials', 401);
        }

        const token = createToken(admin._id);

        return successResponse(res, {
            token,
            admin: {
                id: admin._id,
                username: admin.username,
                email: admin.email,
            },
        }, 'Admin logged in successfully');
    } catch (error) {
        next(error);
    }
};

export const getAdminProfile = async (req, res, next) => {
    try {
        return successResponse(res, req.admin, 'Admin profile retrieved successfully');
    } catch (error) {
        next(error);
    }
};
