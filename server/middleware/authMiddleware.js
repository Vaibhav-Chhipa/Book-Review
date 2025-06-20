import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization?.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : null;
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id).select('-password');
  next();
});

export const admin = (req, res, next) => {
  if (req.user?.isAdmin) next();
  else {
    res.status(403);
    throw new Error('Admin only');
  }
};