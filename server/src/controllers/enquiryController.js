import Enquiry from '../models/Enquiry.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const createEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.create(req.body);
        return successResponse(res, enquiry, 'Enquiry submitted successfully', 201);
    } catch (error) {
        next(error);
    }
};

export const getAllEnquiries = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || '';
        const formType = req.query.formType || '';
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

        const query = {};
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } },
            ];
        }

        if (formType) {
            query.formType = formType;
        }

        const total = await Enquiry.countDocuments(query);
        const enquiries = await Enquiry.find(query)
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit);

        return successResponse(res, {
            enquiries,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        }, 'Enquiries retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const getEnquiryById = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return errorResponse(res, 'Enquiry not found', 404);
        return successResponse(res, enquiry, 'Enquiry retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const deleteEnquiry = async (req, res, next) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) return errorResponse(res, 'Enquiry not found', 404);
        return successResponse(res, null, 'Enquiry deleted successfully');
    } catch (error) {
        next(error);
    }
};
