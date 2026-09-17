import Headline from '../models/Headline.js';

/**
 * @desc   Get all active headlines for frontend
 * @route  GET /api/headlines
 * @access Public
 */
export const getActiveHeadlines = async (req, res, next) => {
    try {
        const headlines = await Headline.find({ isActive: true })
            .sort({ displayOrder: 1, createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: headlines.length,
            data: headlines,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc   Get all headlines for admin with counts and filtering
 * @route  GET /api/headlines/admin/all
 * @access Private/Admin
 */
export const getAllHeadlinesAdmin = async (req, res, next) => {
    try {
        const { search = '', status = 'all' } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { text: { $regex: search, $options: 'i' } },
                { badge: { $regex: search, $options: 'i' } },
                { linkText: { $regex: search, $options: 'i' } },
            ];
        }

        if (status === 'active') {
            query.isActive = true;
        } else if (status === 'inactive') {
            query.isActive = false;
        }

        const [headlines, totalCount, activeCount, inactiveCount] = await Promise.all([
            Headline.find(query).sort({ displayOrder: 1, createdAt: -1 }).lean(),
            Headline.countDocuments(),
            Headline.countDocuments({ isActive: true }),
            Headline.countDocuments({ isActive: false }),
        ]);

        res.status(200).json({
            success: true,
            data: {
                headlines,
                stats: {
                    total: totalCount,
                    active: activeCount,
                    inactive: inactiveCount,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc   Create new headline
 * @route  POST /api/headlines
 * @access Private/Admin
 */
export const createHeadline = async (req, res, next) => {
    try {
        const { text, badge, link, linkText, icon, theme, isActive, displayOrder } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Headline text is required',
            });
        }

        const newHeadline = await Headline.create({
            text: text.trim(),
            badge: badge ? badge.trim() : '',
            link: link ? link.trim() : '',
            linkText: linkText ? linkText.trim() : '',
            icon: icon || 'zap',
            theme: theme || 'navy-green',
            isActive: typeof isActive === 'boolean' ? isActive : true,
            displayOrder: Number(displayOrder) || 0,
        });

        res.status(201).json({
            success: true,
            message: 'Headline created successfully',
            data: newHeadline,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc   Update headline
 * @route  PUT /api/headlines/:id
 * @access Private/Admin
 */
export const updateHeadline = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { text, badge, link, linkText, icon, theme, isActive, displayOrder } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Headline text is required',
            });
        }

        const headline = await Headline.findById(id);
        if (!headline) {
            return res.status(404).json({
                success: false,
                message: 'Headline not found',
            });
        }

        headline.text = text.trim();
        headline.badge = badge !== undefined ? badge.trim() : headline.badge;
        headline.link = link !== undefined ? link.trim() : headline.link;
        headline.linkText = linkText !== undefined ? linkText.trim() : headline.linkText;
        if (icon !== undefined) headline.icon = icon;
        if (theme !== undefined) headline.theme = theme;
        if (typeof isActive === 'boolean') headline.isActive = isActive;
        if (displayOrder !== undefined) headline.displayOrder = Number(displayOrder) || 0;

        const updated = await headline.save();

        res.status(200).json({
            success: true,
            message: 'Headline updated successfully',
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc   Toggle active status of headline
 * @route  PATCH /api/headlines/:id/toggle
 * @access Private/Admin
 */
export const toggleHeadlineStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const headline = await Headline.findById(id);

        if (!headline) {
            return res.status(404).json({
                success: false,
                message: 'Headline not found',
            });
        }

        headline.isActive = !headline.isActive;
        await headline.save();

        res.status(200).json({
            success: true,
            message: `Headline ${headline.isActive ? 'activated' : 'deactivated'} successfully`,
            data: headline,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc   Delete headline
 * @route  DELETE /api/headlines/:id
 * @access Private/Admin
 */
export const deleteHeadline = async (req, res, next) => {
    try {
        const { id } = req.params;
        const headline = await Headline.findById(id);

        if (!headline) {
            return res.status(404).json({
                success: false,
                message: 'Headline not found',
            });
        }

        await headline.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Headline deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
