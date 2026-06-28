const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskStats,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { createTaskRules, updateTaskRules } = require('../validators/taskValidator');
const validate = require('../middleware/validate');

/**
 * Task Routes
 * All routes prefixed with /api/tasks
 */

// Dashboard statistics — placed before /:id to avoid conflict
router.get('/stats', getTaskStats);

// CRUD routes
router
  .route('/')
  .get(getTasks)
  .post(createTaskRules, validate, createTask);

router
  .route('/:id')
  .get(getTask)
  .put(updateTaskRules, validate, updateTask)
  .delete(deleteTask);

module.exports = router;
