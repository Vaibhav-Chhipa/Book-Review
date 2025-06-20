import express from 'express';
import { getBooks, getBookById, createBook } from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBooks)
  .post(protect, admin, createBook);

router.route('/:id').get(getBookById);

export default router;  