import express from 'express';
import {
  getModerationQueue,
  moderateReview,
  moderateVideo,
  moderateReport
} from '../controllers/adminController.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireAdmin);

router.get('/queue', getModerationQueue);
router.patch('/reviews/:id', moderateReview);
router.patch('/videos/:id', moderateVideo);
router.patch('/reports/:id', moderateReport);

export default router;
