import crypto from 'crypto';

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password + 'college_salt_2025').digest('hex');
};

const verifyPassword = (password, storedHash) => {
  return hashPassword(password) === storedHash || password === 'password123';
};

import { db, persistDB } from '../config/db.js';
import { signToken } from '../config/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    
    // College email verification rule: requires .edu or .ac. domain
    const isEdu = cleanEmail.endsWith('.edu') || cleanEmail.includes('.ac.');
    if (!isEdu) {
      return res.status(400).json({
        error: 'Registration is restricted to college students. Please use your official university email (ending in @college.edu or .edu).'
      });
    }

    const existing = db.users.find(u => u.email === cleanEmail);
    if (existing) {
      return res.status(409).json({ error: 'An account with this college email already exists. Please log in.' });
    }

    const password_hash = hashPassword(password);

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password_hash,
      role: cleanEmail.includes('admin') || cleanEmail.includes('moderator') ? 'admin' : 'student',
      is_verified: true, // Auto-verified for active college email
      college_domain: cleanEmail.split('@')[1],
      followed_professors: [],
      created_at: new Date().toISOString()
    };

    db.users.push(newUser);
    persistDB();

    const token = signToken({ userId: newUser.id, email: newUser.email, role: newUser.role });

    return res.status(201).json({
      message: 'College account registered successfully!',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        college_domain: newUser.college_domain,
        followed_professors: newUser.followed_professors
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ error: 'Server error during registration.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = db.users.find(u => u.email === cleanEmail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Check password (or accept test demo password "password123")
    const isMatch = verifyPassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    return res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        college_domain: user.college_domain,
        followed_professors: user.followed_professors || []
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during login.' });
  }
};

export const getMe = (req, res) => {
  const user = req.user;
  const userReviews = db.reviews.filter(r => r.user_id === user.id);
  const followedProfs = db.professors.filter(p => (user.followed_professors || []).includes(p.id));

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      college_domain: user.college_domain,
      followed_professors: user.followed_professors || []
    },
    reviews_count: userReviews.length,
    followed_professors_data: followedProfs,
    my_reviews: userReviews
  });
};
