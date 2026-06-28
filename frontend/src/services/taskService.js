import api from './api';

/**
 * Task API Service
 * All task-related API calls in one place.
 */
const taskService = {
  // Get paginated tasks with filters
  getTasks: (params = {}) => api.get('/tasks', { params }),

  // Get single task
  getTask: (id) => api.get(`/tasks/${id}`),

  // Create task
  createTask: (data) => api.post('/tasks', data),

  // Update task
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),

  // Delete task
  deleteTask: (id) => api.delete(`/tasks/${id}`),

  // Get dashboard stats
  getStats: () => api.get('/tasks/stats'),
};

export default taskService;
