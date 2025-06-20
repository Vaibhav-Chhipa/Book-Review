import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const createAdmin = async () => {
  const hashedPassword = bcrypt.hashSync('123456', 10);

  const exists = await User.findOne({ email: 'Admin@example.com' });
  if (exists) {
    console.log('❌ Admin already exists');
    process.exit();
  }

  const admin = new User({
    name: 'Admin',
    email: 'Admin@example.com',
    password: hashedPassword,
    isAdmin: true,
    avatar: 'https://i.pravatar.cc/150?img=47'
  });

  await admin.save();
  console.log('✅ Admin created successfully');
  process.exit();
};

createAdmin();
