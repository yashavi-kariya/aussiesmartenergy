import mongoose from 'mongoose';

const connectDB = async () => {
    // Read MongoDB connection details from the environment with a local fallback.
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aussiesmartenergy';

    try {
        // Mask credentials before logging so secrets never appear in Render logs.
        const maskedUri = mongoUri.replace(/:([^:@]+)@/, ':****@');
        console.log(`Connecting to MongoDB: ${maskedUri}`);

        // Open the Mongoose connection without running any application queries.
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
        });

        // Confirm the driver established the connection successfully.
        console.log('MongoDB connected successfully');
    } catch (error) {
        // Keep the HTTP process alive so /health/live can still answer quickly.
        console.error('MongoDB connection failed:', error.message);
    }
};

export default connectDB;
