import express from 'express';
import multer from 'multer';
import path from 'path';
import { createProject, getAllProjects, getProjectBySlug, updateProject, deleteProject, restoreProject, deleteGalleryImage } from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Use memory storage for direct cloud upload
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB max file size
});

// Public
router.get('/', getAllProjects);
router.get('/:slug', getProjectBySlug);

// Admin protected
router.post('/', protectAdmin, upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'gallery', maxCount: 12 }]), createProject);
router.put('/:id', protectAdmin, upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'gallery', maxCount: 12 }]), updateProject);
router.patch('/:id/restore', protectAdmin, restoreProject);
router.delete('/:id', protectAdmin, deleteProject);
router.delete('/:id/gallery/:imageName', protectAdmin, deleteGalleryImage);

export default router;
