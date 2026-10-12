import { verifyToken } from '../config/jwt.js';
import { db } from '../config/db.js';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please log in with your college account.' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded || !decoded.userId) {
    return res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
  }

  const user = db.users.find(u => u.id === decoded.userId);
  if (!user) {
    return res.status(401).json({ error: 'User account not found.' });
  }

  req.user = user;
  next();
};

// Strict check for .edu or college-specific email domain when submitting reviews
export const requireCollegeEmail = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Please log in to continue.' });
  }

  const email = req.user.email.toLowerCase();
  const isCollegeEmail = email.endsWith('.edu') || email.includes('.ac.') || email.endsWith('@college.edu');

  if (!isCollegeEmail) {
    return res.status(403).json({
      error: 'Restricted: Only verified college students with an active .edu email address are permitted to post reviews and ratings.'
    });
  }

  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'moderator')) {
    return res.status(403).json({ error: 'Access denied: Administrator privileges required.' });
  }
  next();
};
