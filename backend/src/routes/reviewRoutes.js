import express from 'express';
import { createReview, voteReview, reportReview } from '../controllers/reviewController.js';
import { requireAuth, requireCollegeEmail } from '../middleware/auth.js';
import { checkReviewRateLimit } from '../middleware/rateLimiter.js';
import { profanityMiddleware } from '../middleware/profanityFilter.js';

const router = express.Router();

router.post(
  '/',
  requireAuth,
  requireCollegeEmail,
  checkReviewRateLimit,
  profanityMiddleware,
  createReview
);

router.post('/:id/vote', requireAuth, voteReview);
router.post('/:id/report', requireAuth, reportReview);

export default router;
