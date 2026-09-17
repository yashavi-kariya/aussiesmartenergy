import express from 'express';
import {
    getActiveHeadlines,
    getAllHeadlinesAdmin,
    createHeadline,
    updateHeadline,
    toggleHeadlineStatus,
    deleteHeadline,
} from '../controllers/headlineController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public: Fetch active headlines
router.get('/', getActiveHeadlines);

// Admin protected endpoints
router.get('/admin/all', protectAdmin, getAllHeadlinesAdmin);
router.post('/', protectAdmin, createHeadline);
router.put('/:id', protectAdmin, updateHeadline);
router.patch('/:id/toggle', protectAdmin, toggleHeadlineStatus);
router.delete('/:id', protectAdmin, deleteHeadline);

export default router;
