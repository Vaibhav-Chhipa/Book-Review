import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      {book.cover && <img src={book.cover} alt={book.title} className="h-48 w-full object-cover" />}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{book.author}</p>
        <p className="mt-2 text-xs text-yellow-500">⭐ {book.averageRating.toFixed(1)} ({book.numReviews})</p>
      </div>
    </Link>
  );
}