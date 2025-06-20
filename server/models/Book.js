import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: String,
    cover: String,       
    genres: [String],
    published: Date,
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);