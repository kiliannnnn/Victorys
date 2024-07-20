import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      console.error('Token expired:', err.expiredAt);
    } else if (err.name === 'JsonWebTokenError') {
      console.error('Invalid token:', err.message);
    } else if (err.name === 'NotBeforeError') {
      console.error('Token not active yet:', err.date);
    }
    return null;
  }
}


/*
Generate token on login example:
import { generateToken } from './lib/jwt';

const user = {
  id: 1,
  username: 'testuser'
};

const token = generateToken(user);
console.log('Generated JWT:', token);
*/

/*
Verify token example:
import { verifyToken } from './lib/jwt';

const token = 'received-jwt-token-here';
const decoded = verifyToken(token);

if (decoded) {
  console.log('Token is valid:', decoded);
} else {
  console.log('Invalid token');
}
*/