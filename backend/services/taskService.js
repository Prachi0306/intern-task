const Task = require('../models/Task');
const ApiError = require('../utils/ApiError');

/**
 * Task Service
 * Business logic layer — keeps controllers thin.
 */
class TaskService {
  /**
   * Get paginated, filtered, sorted tasks.
   */
  async getTasks(query) {
    const {
      status,
      priority,
      category,
      search,
      sort = '-createdAt',
      page = 1,
      limit = 10,
    } = query;

    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    // Text search across title and description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Build sort object from string like "-createdAt" or "dueDate"
    const sortObj = {};
    const sortFields = sort.split(',');
    sortFields.forEach((field) => {
      const trimmed = field.trim();
      if (trimmed.startsWith('-')) {
        sortObj[trimmed.substring(1)] = -1;
      } else {
        sortObj[trimmed] = 1;
      }
    });

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort(sortObj).skip(skip).limit(limitNum).lean(),
      Task.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return {
      tasks,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalItems: total,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    };
  }

  /**
   * Get a single task by ID.
   */
  async getTaskById(id) {
    const task = await Task.findById(id);
    if (!task) throw ApiError.notFound('Task not found');
    return task;
  }

  /**
   * Create a new task.
   */
  async createTask(data) {
    // Set order to be after the last task
    const lastTask = await Task.findOne().sort('-order').select('order').lean();
    data.order = lastTask ? lastTask.order + 1 : 0;

    const task = await Task.create(data);
    return task;
  }

  /**
   * Update a task by ID.
   */
  async updateTask(id, data) {
    const task = await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!task) throw ApiError.notFound('Task not found');
    return task;
  }

  /**
   * Delete a task by ID.
   */
  async deleteTask(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw ApiError.notFound('Task not found');
    return task;
  }

  /**
   * Get dashboard statistics.
   */
  async getStats() {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));
    const weekEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [
      total,
      completed,
      pending,
      inProgress,
      overdue,
      todayTasks,
      upcomingTasks,
      byCategory,
      byPriority,
      recentTasks,
    ] = await Promise.all([
      Task.countDocuments(),
      Task.countDocuments({ status: 'Completed' }),
      Task.countDocuments({ status: 'Pending' }),
      Task.countDocuments({ status: 'In Progress' }),
      Task.countDocuments({
        status: { $ne: 'Completed' },
        dueDate: { $lt: new Date() },
      }),
      Task.find({
        dueDate: { $gte: todayStart, $lte: todayEnd },
      })
        .sort('dueDate')
        .limit(5)
        .lean(),
      Task.find({
        status: { $ne: 'Completed' },
        dueDate: { $gte: new Date(), $lte: weekEnd },
      })
        .sort('dueDate')
        .limit(5)
        .lean(),
      Task.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Task.aggregate([
        { $group: { _id: '$priority', count: { $sum: 1 } } },
      ]),
      Task.find().sort('-createdAt').limit(5).lean(),
    ]);

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      inProgress,
      overdue,
      completionRate,
      todayTasks,
      upcomingTasks,
      byCategory,
      byPriority,
      recentTasks,
    };
  }
}

module.exports = new TaskService();
