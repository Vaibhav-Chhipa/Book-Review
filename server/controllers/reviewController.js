import asyncHandler from 'express-async-handler';
import Review from '../models/Review.js';
import Book from '../models/Book.js';


export const getReviews = asyncHandler(async (req, res) => {
  const { bookId } = req.query;
  if (!bookId) {
    res.status(400);
    throw new Error('bookId query param is required');
  }

  const reviews = await Review.find({ book: bookId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 })
    .lean();

  res.json(reviews);
});


export const addReview = asyncHandler(async (req, res) => {
  const { bookId, rating, comment } = req.body;
  if (!bookId || !rating) {
    res.status(400);
    throw new Error('bookId and rating are required');
  }

  const exists = await Review.findOne({ book: bookId, user: req.user._id });
  if (exists) {
    res.status(400);
    throw new Error('You have already reviewed this book');
  }

  const review = await Review.create({
    user: req.user._id,
    book: bookId,
    rating,
    comment
  });

  const stats = await Review.aggregate([
    { $match: { book: review.book } },
    {
      $group: {
        _id: '$book',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  if (stats.length) {
    await Book.findByIdAndUpdate(review.book, {
      averageRating: stats[0].avgRating,
      numReviews: stats[0].numReviews
    });
  }

  res.status(201).json(review);
});