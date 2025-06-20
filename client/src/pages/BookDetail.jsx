import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import ReviewForm from '../components/ReviewForm';
import AuthContext from '../context/AuthContext';

export default function BookDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [bookRes, revRes] = await Promise.all([
      api.get(`/books/${id}`),
      api.get('/reviews', { params: { bookId: id } })
    ]);
    setBook(bookRes.data);
    setReviews(revRes.data);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, [id]);

  if (loading) return <p>Loading book...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {book.cover && <img src={book.cover} alt={book.title} className="w-48 rounded" />}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{book.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-1">by {book.author}</p>
          <p className="text-yellow-500 mb-2">⭐ {book.averageRating.toFixed(1)} ({book.numReviews})</p>
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{book.description}</p>
        </div>
      </div>

      <section>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Reviews</h3>
        {reviews.length ? (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{r.user.name} • {new Date(r.createdAt).toLocaleDateString()}</p>
                <p className="text-yellow-500 mb-1">⭐ {r.rating}</p>
                <p className="text-gray-800 dark:text-gray-200">{r.comment}</p>
              </li>
            ))}
          </ul>
        ) : <p>No reviews yet.</p>}
      </section>

      {user && (
        <ReviewForm bookId={id} onSuccess={fetchAll} />
      )}
    </div>
  );
}