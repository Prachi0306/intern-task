const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Validation Middleware
 * Runs after express-validator rules, extracts errors, throws ApiError if invalid.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    throw ApiError.badRequest('Validation failed', messages);
  }
  next();
};

module.exports = validate;
