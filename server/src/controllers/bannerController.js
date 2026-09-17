import fs from 'fs';
import path from 'path';
import Banner from '../models/Banner.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const MAX_BANNERS = 10;

export const getBanners = async (req, res, next) => {
    try {
        const banners = await Banner.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
        return successResponse(res, banners, 'Banners retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export const getAllAdminBanners = async (req, res, next) => {
    try {
        const banners = await Banner.find({}).sort({ displayOrder: 1, createdAt: -1 });
        const totalCount = banners.length;
        return successResponse(res, { banners, totalCount, maxAllowed: MAX_BANNERS }, 'Admin banners retrieved');
    } catch (error) {
        next(error);
    }
};

export const uploadBanners = async (req, res, next) => {
    try {
        const currentCount = await Banner.countDocuments({});

        if (currentCount >= MAX_BANNERS) {
            // Clean up uploaded temp files if any
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                });
            }
            return errorResponse(res, `Maximum limit of ${MAX_BANNERS} hero banner images has already been reached.`, 400);
        }

        const files = req.files || (req.file ? [req.file] : []);
        if (!files || files.length === 0) {
            return errorResponse(res, 'Please upload at least one image file.', 400);
        }

        if (currentCount + files.length > MAX_BANNERS) {
            const availableSlots = MAX_BANNERS - currentCount;
            // Clean up uploaded temp files
            files.forEach(file => {
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            });
            return errorResponse(res, `Cannot upload ${files.length} images. Only ${availableSlots} slot(s) remaining (Max: ${MAX_BANNERS}).`, 400);
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const createdBanners = [];

        // Find highest existing display order
        const lastBanner = await Banner.findOne({}).sort({ displayOrder: -1 });
        let nextOrder = lastBanner ? lastBanner.displayOrder + 1 : 1;

        for (const file of files) {
            const imageUrl = `${baseUrl}/uploads/banners/${file.filename}`;
            const title = path.parse(file.originalname).name;
            const newBanner = await Banner.create({
                imageUrl,
                title,
                displayOrder: nextOrder++,
                isActive: true,
            });
            createdBanners.push(newBanner);
        }

        return successResponse(res, createdBanners, `${createdBanners.length} banner image(s) uploaded successfully.`, 201);
    } catch (error) {
        // Clean up files on unexpected error
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
            });
        }
        next(error);
    }
};

export const deleteBanner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);

        if (!banner) {
            return errorResponse(res, 'Banner image not found.', 404);
        }

        // Extract filename and delete from server storage if exists
        try {
            if (banner.imageUrl) {
                const urlParts = banner.imageUrl.split('/uploads/banners/');
                if (urlParts.length > 1) {
                    const filename = urlParts[1];
                    const baseUploadsDir = process.cwd().endsWith('server')
                        ? path.join(process.cwd(), 'uploads')
                        : path.join(process.cwd(), 'server', 'uploads');
                    const filePath = path.join(baseUploadsDir, 'banners', filename);
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            }
        } catch (fsErr) {
            console.error('Error removing banner file from disk:', fsErr);
        }

        await Banner.findByIdAndDelete(id);
        return successResponse(res, null, 'Banner image deleted successfully.');
    } catch (error) {
        next(error);
    }
};

export const reorderBanners = async (req, res, next) => {
    try {
        const { orderedIds } = req.body;
        if (!Array.isArray(orderedIds)) {
            return errorResponse(res, 'orderedIds must be an array of IDs', 400);
        }

        const updates = orderedIds.map((id, index) =>
            Banner.findByIdAndUpdate(id, { displayOrder: index + 1 })
        );
        await Promise.all(updates);

        return successResponse(res, null, 'Banner order updated successfully.');
    } catch (error) {
        next(error);
    }
};
