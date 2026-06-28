import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useDebounce } from '../hooks/useDebounce';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import SearchBar from '../components/ui/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Button from '../components/ui/Button';

/**
 * Tasks Page — Full task management with search, filter, sort, pagination, CRUD modals.
 */
export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const {
    tasks,
    pagination,
    loading,
    params,
    createTask,
    updateTask,
    deleteTask,
    updateParams,
    setPage,
  } = useTasks();

  // Open create modal from sidebar link
  useEffect(() => {
    if (searchParams.get('new') === 'true') {
      setShowCreateModal(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Search on debounced value change
  useEffect(() => {
    updateParams({ search: debouncedSearch || undefined });
  }, [debouncedSearch, updateParams]);

  // Create task
  const handleCreate = async (data) => {
    try {
      setFormLoading(true);
      await createTask(data);
      setShowCreateModal(false);
    } catch {
      // toast handled in hook
    } finally {
      setFormLoading(false);
    }
  };

  // Update task
  const handleUpdate = async (data) => {
    try {
      setFormLoading(true);
      await updateTask(editingTask._id, data);
      setEditingTask(null);
    } catch {
      // toast handled in hook
    } finally {
      setFormLoading(false);
    }
  };

  // Delete task
  const handleDelete = async () => {
    try {
      setFormLoading(true);
      await deleteTask(deletingTask._id);
      setDeletingTask(null);
    } catch {
      // toast handled in hook
    } finally {
      setFormLoading(false);
    }
  };

  // Filter change
  const handleFilterChange = (newFilters) => {
    updateParams(newFilters);
  };

  // Clear filters
  const handleClearFilters = () => {
    updateParams({
      status: undefined,
      priority: undefined,
      category: undefined,
      sort: '-createdAt',
      search: undefined,
    });
    setSearch('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage and organize all your tasks
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => setShowCreateModal(true)}
        >
          New Task
        </Button>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4 mb-6">
        <div className="max-w-md">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterPanel
          filters={params}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Task List */}
      <TaskList
        tasks={tasks}
        loading={loading}
        onEdit={setEditingTask}
        onDelete={setDeletingTask}
        onCreateNew={() => setShowCreateModal(true)}
      />

      {/* Pagination */}
      <Pagination pagination={pagination} onPageChange={setPage} />

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Task"
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
          loading={formLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
        size="lg"
      >
        {editingTask && (
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTask(null)}
            loading={formLoading}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${deletingTask?.title}"? This action cannot be undone.`}
        loading={formLoading}
      />
    </motion.div>
  );
}
