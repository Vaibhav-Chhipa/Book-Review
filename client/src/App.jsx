// // import React from 'react';


// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Home from './pages/Home';
// // import Books from './pages/Books';
// // import BookDetail from './pages/BookDetail';
// // import Profile from './pages/Profile';
// // import { useContext } from 'react';
// // import AuthContext from './context/AuthContext';

// // export default function App() {
// //   const { user } = useContext(AuthContext);
// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
// //       <Navbar />
// //       <main className="flex-1 container mx-auto px-4 py-6">
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/books" element={<Books />} />
// //           <Route path="/books/:id" element={<BookDetail />} />
// //           <Route
// //             path="/profile"
// //             element={user ? <Profile /> : <Navigate to="/" replace />} // simple guard
// //           />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </main>
// //     </div>
// //   );
// // }

// // src/App.jsx
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Books from './pages/Books';
// import BookDetail from './pages/BookDetail';
// import Profile from './pages/Profile';
// import ReviewForm from './components/ReviewForm';

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <main className="container mx-auto px-4 py-6">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/books" element={<Books />} />
//           <Route path="/books/:id" element={<BookDetail />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/books/:id/review" element={<ReviewForm />} />
//         </Routes>
//       </main>
//     </>
//   );
// }


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
