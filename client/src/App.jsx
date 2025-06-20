

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ReviewForm from './components/ReviewForm';
import AuthContext from './context/AuthContext';
import AddBook from './pages/AddBook';

export default function App(){
  const {user}=React.useContext(AuthContext);
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/review" element={user?<ReviewFormWrapper/>:<Navigate to="/login" />} />
          <Route path="/profile" element={user?<Profile/>:<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}
function ReviewFormWrapper(){
  const {id}=useParams();
  return <ReviewForm bookId={id} onSuccess={()=>window.location.reload()} />;
}
