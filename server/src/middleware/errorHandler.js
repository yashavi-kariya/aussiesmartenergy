export const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Server error';

    res.status(statusCode).json({
        success: false,
        message,
        errors: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};

export default errorHandler;
