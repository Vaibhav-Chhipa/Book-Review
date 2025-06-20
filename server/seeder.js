import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';
import User from './models/User.js';
import Review from './models/Review.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

// 1. Sample Users
const users = [
  { name: 'Alice', email: 'alice@example.com', password: '123456', isAdmin: true },
  { name: 'Bob', email: 'bob@example.com', password: '123456' },
  { name: 'Charlie', email: 'charlie@example.com', password: '123456' }
];

// 2. Sample Books
const books = [
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A journey of self-discovery.',
    genres: ['Fiction', 'Philosophy'],
    published: new Date('1988-01-01'),
    cover: 'https://covers.openlibrary.org/b/id/8277896-L.jpg'
  },
  {
    title: '1984',
    author: 'George Orwell',
    description: 'Dystopian political fiction.',
    genres: ['Fiction', 'Politics'],
    published: new Date('1949-06-08'),
    cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg'
  }
];

const importData = async () => {
  try {
    await Review.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const sampleBooks = books.map((b) => ({ ...b }));
    const createdBooks = await Book.insertMany(sampleBooks);

    // Optional: Add one review per book
    await Review.insertMany([
      {
        user: createdUsers[1]._id,
        book: createdBooks[0]._id,
        rating: 5,
        comment: 'Amazing book!'
      },
      {
        user: createdUsers[2]._id,
        book: createdBooks[1]._id,
        rating: 4,
        comment: 'Very powerful and relevant.'
      }
    ]);

    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
