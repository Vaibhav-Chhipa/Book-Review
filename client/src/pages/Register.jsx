import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const changeHandler = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/users/register', form);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    }
  };
  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4 fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Register</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input name="name" placeholder="Name" value={form.name} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
      <input name="email" placeholder="Email" value={form.email} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
      <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Register</button>
    </form>
  );
}
