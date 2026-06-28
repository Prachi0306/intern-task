const ApiError = require('../utils/ApiError');
const config = require('../config');

/**
 * Centralized Error Handler
 * Transforms Mongoose errors into consistent API responses.
 * Shows stack traces only in development.
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  // Mongoose: Invalid ObjectId
  if (err.name === 'CastError') {
    error = ApiError.badRequest(`Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose: Validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = ApiError.badRequest('Validation failed', messages);
  }

  // Mongoose: Duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = ApiError.badRequest(`Duplicate value for: ${field}`);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  if (config.isDev) {
    console.error('❌', message, err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: error.errors || [],
    ...(config.isDev && { stack: err.stack }),
  });
};

module.exports = errorHandler;
