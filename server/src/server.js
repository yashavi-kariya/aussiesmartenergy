import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import errorHandler, { notFound } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'https://aussiesmartenergy.vercel.app',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.json({ success: true, message: 'Server is healthy' });
});

app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/login/admin', (req, res) => {
    res.json({ success: true, message: 'Use the admin login endpoint at /api/admin/login' });
});

app.use(notFound);
app.use(errorHandler);

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
