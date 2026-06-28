import { useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';
import toast from 'react-hot-toast';

/**
 * Custom hook for task CRUD operations.
 * Manages tasks state, loading, errors, pagination, and filters.
 */
export function useTasks(initialParams = {}) {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    sort: '-createdAt',
    ...initialParams,
  });

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Clean undefined/empty params
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
      );
      const response = await taskService.getTasks(cleanParams);
      setTasks(response.data || []);
      setPagination(response.pagination || null);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create task
  const createTask = async (data) => {
    try {
      const response = await taskService.createTask(data);
      toast.success('Task created successfully');
      await fetchTasks(); // Refresh list
      return response.data;
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
      throw err;
    }
  };

  // Update task
  const updateTask = async (id, data) => {
    try {
      // Optimistic update
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...data } : t))
      );
      const response = await taskService.updateTask(id, data);
      toast.success('Task updated successfully');
      return response.data;
    } catch (err) {
      // Rollback on failure
      await fetchTasks();
      toast.error(err.message || 'Failed to update task');
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      // Optimistic delete
      const previousTasks = [...tasks];
      setTasks((prev) => prev.filter((t) => t._id !== id));
      await taskService.deleteTask(id);
      toast.success('Task deleted successfully');
    } catch (err) {
      // Rollback
      await fetchTasks();
      toast.error(err.message || 'Failed to delete task');
      throw err;
    }
  };

  // Update query params
  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({ ...prev, ...newParams, page: newParams.page || 1 }));
  }, []);

  // Change page
  const setPage = useCallback((page) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  return {
    tasks,
    pagination,
    loading,
    error,
    params,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateParams,
    setPage,
  };
}
