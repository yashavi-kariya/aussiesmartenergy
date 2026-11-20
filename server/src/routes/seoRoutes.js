import express from 'express';
import {
  getAllPagesSeo,
  getPageSeo,
  updatePageSeo,
  resetPageSeo,
  getDynamicSitemap,
  getDynamicRobots,
} from '../controllers/seoController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllPagesSeo);
router.get('/sitemap.xml', getDynamicSitemap);
router.get('/robots.txt', getDynamicRobots);
router.get('/:pageKey', getPageSeo);

// Admin protected routes
router.put('/:pageKey', protectAdmin, updatePageSeo);
router.post('/:pageKey/reset', protectAdmin, resetPageSeo);

export default router;

