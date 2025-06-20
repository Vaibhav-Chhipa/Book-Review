
import express from 'express';
import {
  registerUser,
  loginUser,
  getUser,
  updateUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser);

export default router;
