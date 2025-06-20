// import React from 'react';
// import { useContext, useEffect, useState } from 'react';
// import api from '../services/api';
// import AuthContext from '../context/AuthContext';

// export default function Profile() {
//   const { user, login } = useContext(AuthContext);
//   const [form, setForm] = useState({ name: '', email: '', avatar: '' });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [msg, setMsg] = useState('');

//   useEffect(() => {
//     (async () => {
//       const { data } = await api.get(`/users/${user._id}`);
//       setForm({ name: data.name, email: data.email, avatar: data.avatar || '' });
//       setLoading(false);
//     })();
//   }, [user._id]);

//   const changeHandler = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const { data } = await api.put(`/users/${user._id}`, form);
//       login({ ...user, ...data }); // update local storage
//       setMsg('Profile updated');
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <p>Loading profile...</p>;

//   return (
//     <form onSubmit={submitHandler} className="max-w-md mx-auto space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
//       {msg && <p className="text-green-600">{msg}</p>}
//       <div>
//         <label className="block mb-1 text-sm font-medium">Name</label>
//         <input name="name" value={form.name} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
//       </div>
//       <div>
//         <label className="block mb-1 text-sm font-medium">Email</label>
//         <input name="email" value={form.email} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
//       </div>
//       <div>
//         <label className="block mb-1 text-sm font-medium">Avatar URL</label>
//         <input name="avatar" value={form.avatar} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" />
//       </div>
//       <button disabled={saving} className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">
//         {saving ? 'Saving...' : 'Save Changes'}
//       </button>
//     </form>
//   );
// }


import React, { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/users/${user._id}`);
      setForm({ name: data.name, email: data.email, avatar: data.avatar || '' });
      setLoading(false);
    })();
  }, [user._id]);
  const changeHandler = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submitHandler = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put(`/users/${user._id}`, form);
      login({ ...user, ...data });
      setMsg('Profile updated');
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <p>Loading profile…</p>;
  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h2>
      {msg && <p className="text-green-600">{msg}</p>}
      <div><label className="block mb-1 text-sm font-medium">Name</label><input name="name" value={form.name} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" /></div>
      <div><label className="block mb-1 text-sm font-medium">Email</label><input name="email" value={form.email} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" /></div>
      <div><label className="block mb-1 text-sm font-medium">Avatar URL</label><input name="avatar" value={form.avatar} onChange={changeHandler} className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700" /></div>
      <button disabled={saving} className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Saving…' : 'Save Changes'}</button>
    </form>
  );
}