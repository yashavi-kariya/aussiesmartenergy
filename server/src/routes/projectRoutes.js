import express from 'express';
import multer from 'multer';
import path from 'path';
import { createProject, getAllProjects, getProjectBySlug, updateProject, deleteProject, restoreProject, deleteGalleryImage } from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// ensure upload directory
const baseUploadsDir = process.cwd().endsWith('server')
    ? path.join(process.cwd(), 'uploads')
    : path.join(process.cwd(), 'server', 'uploads');
const uploadDir = path.join(baseUploadsDir, 'projects');
import fs from 'fs';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

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
