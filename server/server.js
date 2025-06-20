import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.get('/ping', (req, res) => res.send('pong'));
console.log('🟢  /ping route registered');

// 👉 2. prove bookRoutes really is a router
console.log('📚 imported bookRoutes is', typeof bookRoutes);  // should print 'function'

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.get('/ping', (req, res) => {
    req.send('pong');
});
console.log("running")

app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
import listEndpoints from 'express-list-endpoints';

console.table(listEndpoints(app));
app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));