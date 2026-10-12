import { db } from '../config/db.js';

/**
 * Rate Limiter: Enforces at most 1 review per professor per semester per student
 */
export const checkReviewRateLimit = (req, res, next) => {
  const userId = req.user.id;
  const { professorId, semester, year } = req.body;

  if (!professorId || !semester || !year) {
    return res.status(400).json({ error: 'Professor ID, semester, and year are required.' });
  }

  const existingReview = db.reviews.find(r => 
    r.user_id === userId &&
    r.professor_id === professorId &&
    r.semester?.toLowerCase() === semester?.toLowerCase() &&
    Number(r.year) === Number(year)
  );

  if (existingReview) {
    return res.status(429).json({
      error: `Rate limit reached: You have already submitted a review for this professor for ${semester} ${year}. Only one review per semester is allowed.`
    });
  }

  next();
};
