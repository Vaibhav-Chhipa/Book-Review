
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaBookOpen, FaSignOutAlt } from 'react-icons/fa';

const linkStyle = ({ isActive }) =>
  `px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm ${
    isActive
      ? 'bg-indigo-600 text-white'
      : 'text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 dark:hover:text-white'
  }`;

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-indigo-700 dark:text-indigo-400 hover:scale-105 transition-transform"
        >
          <FaBookOpen /> BookShelf
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/books" className={linkStyle} end>
            Books
          </NavLink>

          {/* Admin‑only link */}
          {user?.isAdmin && (
            <NavLink to="/books/add" className={linkStyle}>
              Add Book
            </NavLink>
          )}

          {user ? (
            <>
              <NavLink to="/profile" className={linkStyle}>
                {user.name}
              </NavLink>
              <button
                onClick={logout}
                className="text-gray-700 dark:text-gray-200 hover:text-red-500 transition duration-200"
              >
                <FaSignOutAlt size={18} />
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkStyle}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
