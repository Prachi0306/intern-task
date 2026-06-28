const asyncHandler = require('../middleware/asyncHandler');
const taskService = require('../services/taskService');
const ApiResponse = require('../utils/ApiResponse');

/**
 * Task Controller
 * Thin controller layer — delegates to TaskService.
 */

// @desc    Get all tasks (with filter, search, sort, pagination)
// @route   GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const result = await taskService.getTasks(req.query);
  ApiResponse.paginated(res, 'Tasks retrieved successfully', result.tasks, result.pagination);
});

// @desc    Get dashboard statistics
// @route   GET /api/tasks/stats
const getTaskStats = asyncHandler(async (req, res) => {
  const stats = await taskService.getStats();
  ApiResponse.success(res, 'Statistics retrieved successfully', stats);
});

// @desc    Get single task
// @route   GET /api/tasks/:id
const getTask = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.params.id);
  ApiResponse.success(res, 'Task retrieved successfully', task);
});

// @desc    Create task
// @route   POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.body);
  ApiResponse.created(res, 'Task created successfully', task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  ApiResponse.success(res, 'Task updated successfully', task);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);
  ApiResponse.success(res, 'Task deleted successfully');
});

module.exports = {
  getTasks,
  getTaskStats,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
