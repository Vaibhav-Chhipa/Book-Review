import React from 'react';

import { useEffect, useState } from 'react';
import api from '../services/api';
import BookCard from '../components/BookCard';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (p = 1, kw = keyword) => {
    setLoading(true);
    const { data } = await api.get('/books', { params: { page: p, keyword: kw } });
    setBooks(data.results);
    setPage(data.page);
    setLoading(false);
  };

  useEffect(() => { fetchBooks(); }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchBooks(1, keyword);
  };

  return (
    <>
      <form onSubmit={submitHandler} className="mb-4 flex gap-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search title or author..."
          className="flex-1 p-2 rounded bg-white dark:bg-gray-800"
        />
        <button className="px-3 py-2 bg-indigo-600 text-white rounded">Search</button>
      </form>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {books.map((b) => (
            <BookCard key={b._id} book={b} />
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </>
  );
}