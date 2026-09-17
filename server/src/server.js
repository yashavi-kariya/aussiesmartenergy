import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import headlineRoutes from './routes/headlineRoutes.js';
import googleReviewRoutes from './routes/googleReviewRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import errorHandler, { notFound } from './middleware/errorHandler.js';
import path from 'path';

// Load .env from both server folder and root directory
dotenv.config({ path: path.join(process.cwd(), 'server', '.env') });
dotenv.config({ path: path.join(process.cwd(), '.env') });
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

// Mount lightweight health endpoints before application routes and error handlers.
app.use('/health', healthRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/google-reviews', googleReviewRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/headlines', headlineRoutes);
app.use('/api/admin', adminRoutes);
app.use('/login/admin', (req, res) => {
    res.json({ success: true, message: 'Use the admin login endpoint at /api/admin/login' });
});

// Serve uploaded files (must be before notFound handler)
// crossOriginResourcePolicy set to cross-origin so browsers can load images from the API server
const uploadsDir = process.cwd().endsWith('server')
    ? path.join(process.cwd(), 'uploads')
    : path.join(process.cwd(), 'server', 'uploads');

app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express.static(uploadsDir));

app.use(notFound);
app.use(errorHandler);

// Start accepting HTTP traffic immediately so liveness checks work during startup.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Connect to MongoDB after the server starts; readiness reports unavailable until connected.
connectDB();

