# 📚 Book Review Platform

A full-stack web application where users can browse featured books, read detailed information, write reviews, and manage their profiles. Admins can add new books to the platform.

---

## 🧩 Features

### 👥 Users
- Register & login with JWT authentication
- View and edit profile
- Submit reviews

### 📖 Books
- Browse featured and all books
- Search and filter functionality
- View individual book details and reviews

### 🛠 Admin
- Add new books (Work in progress)

---

## 🚀 Tech Stack

### Frontend
- React + Vite + Tailwind CSS
- React Router v6
- Context API for auth
- Axios for API calls

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT Auth (with Admin support)
- Bcrypt password hashing

---

## 📁 Project Structure
book-review-platform/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── pages/ # Home, Book, Profile, Login, etc.
│ │ ├── components/ # Navbar, BookCard, ReviewForm
│ │ ├── context/ # AuthContext
│ │ └── services/ # Axios instance
│
├── server/ # Express backend
│ ├── controllers/ # User & Book handlers
│ ├── middleware/ # auth.js
│ ├── models/ # User.js, Book.js, Review.js
│ ├── routes/ # API routes
│ └── utils/ # Token generator


---

## 🧑‍💻 Setup Instructions

### ✅ Prerequisites

- Node.js ≥ 16
- MongoDB (Atlas or local)
- `npm` or `yarn`

---

### 📦 Install Dependencies

```bash
# Clone the project
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform

# Install server deps
cd server
npm install

# Install client deps
cd ../client
npm install



# In root folder
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev


✨ Future Enhancements
Review editing/deletion

Pagination on book listing

User avatars from cloud storage

Ratings summary with stars
