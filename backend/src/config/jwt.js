import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'profpulse_super_secret_jwt_key_2025';
const JWT_EXPIRES_IN = '7d';

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
