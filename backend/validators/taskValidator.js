const { body } = require('express-validator');

/**
 * Task Validation Rules
 * Separate rule sets for create and update operations.
 */

const createTaskRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),

  body('category')
    .optional()
    .isIn(['Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'])
    .withMessage('Invalid category'),

  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),

  body('estimatedTime')
    .optional({ values: 'null' })
    .isInt({ min: 0, max: 480 })
    .withMessage('Estimated time must be between 0 and 480 minutes'),

  body('tags')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Tags must be an array with max 5 items'),

  body('tags.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Each tag must be 1-20 characters'),
];

const updateTaskRules = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Title must be at least 3 characters')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),

  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be Pending, In Progress, or Completed'),

  body('category')
    .optional()
    .isIn(['Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'])
    .withMessage('Invalid category'),

  body('dueDate')
    .optional({ values: 'null' })
    .isISO8601()
    .withMessage('Due date must be a valid date'),

  body('estimatedTime')
    .optional({ values: 'null' })
    .isInt({ min: 0, max: 480 })
    .withMessage('Estimated time must be between 0 and 480 minutes'),

  body('tags')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Tags must be an array with max 5 items'),

  body('tags.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Each tag must be 1-20 characters'),

  body('order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
];

module.exports = { createTaskRules, updateTaskRules };
