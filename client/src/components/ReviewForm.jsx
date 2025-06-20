import React from 'react';
import { useState } from 'react';
import api from '../services/api';

export default function ReviewForm({ bookId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/reviews', { bookId, rating, comment });
      setComment('');
      setRating(5);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg space-y-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block mb-1 text-sm font-medium">Rating</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full p-2 rounded bg-white dark:bg-gray-800">
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Comment</label>
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="3" className="w-full p-2 rounded bg-white dark:bg-gray-800" />
      </div>
      <button disabled={loading} className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
        {loading ? 'Posting...' : 'Post Review'}
      </button>
    </form>
  );
}