import React, { useEffect, useState } from 'react';
import api from '../services/api';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/books', { params: { limit: 8 } });
        setBooks(data.results);
      } catch (err) {
        console.error('❌ Failed to fetch books:', err);
      } finally {
        setLoading(false);
      }
    })(); // <-- this is the missing call
  }, []);

  if (loading) return <p>Loading featured books...</p>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Featured Books</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((b) => (
          <BookCard key={b._id} book={b} />
        ))}
      </div>
    </>
  );
}
