import asyncHandler from 'express-async-handler';
import Book from '../models/Book.js';
import Review from '../models/Review.js';

/**
 * GET /api/books
 * Query: page, limit, keyword, genre
 */
export const getBooks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { author: { $regex: req.query.keyword, $options: 'i' } }
        ]
      }
    : {};

  const genreFilter = req.query.genre ? { genres: req.query.genre } : {};

  const filter = { ...keyword, ...genreFilter };

  const total = await Book.countDocuments(filter);
  const books = await Book.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.json({
    page,
    totalPages: Math.ceil(total / limit),
    total,
    results: books
  });
});

/**
 * GET /api/books/:id
 */
export const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).lean();
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  res.json(book);
});

/**
 * POST /api/books (admin only)
 */
export const createBook = asyncHandler(async (req, res) => {
  const { title, author, description, cover, genres, published } = req.body;

  const book = new Book({
    title,
    author,
    description,
    cover,
    genres,
    published
  });

  const created = await book.save();
  res.status(201).json(created);
});