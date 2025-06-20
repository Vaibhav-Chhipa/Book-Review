import React, { useState, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export default function AddBook() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    cover: '',
    genres: '',
    published: '',
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bookData = { ...form, genres: form.genres.split(',').map((g) => g.trim()) };
      await api.post('/books', bookData);
      setMsg('✅ Book added successfully!');
      setTimeout(() => navigate('/books'), 1500);
    } catch (err) {
      setMsg('❌ Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  if (!user?.isAdmin) {
    return <p className="text-center text-red-500 mt-10">Unauthorized</p>;
  }

  return (
    <section className="max-w-xl mx-auto px-4 py-8 bg-white dark:bg-[#1e1e1e] shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 text-center">Add New Book</h2>
      {msg && <p className="text-center text-green-500 mb-4">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'author', 'description', 'cover', 'genres', 'published'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field === 'published' ? 'date' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        ))}
        <button
          disabled={loading}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Add Book'}
        </button>
      </form>
    </section>
  );
}
