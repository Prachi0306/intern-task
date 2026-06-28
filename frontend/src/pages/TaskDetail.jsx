import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  Tag,
  Layers,
} from 'lucide-react';
import taskService from '../services/taskService';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../components/ui/Badge';
import DueDateBadge from '../components/tasks/DueDateBadge';
import TaskForm from '../components/tasks/TaskForm';
import Modal from '../components/ui/Modal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import Button from '../components/ui/Button';
import { PageLoader } from '../components/ui/Loader';
import { formatDate, formatDuration } from '../utils/helpers';
import toast from 'react-hot-toast';

/**
 * TaskDetail — Full task view with edit and delete functionality.
 */
export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await taskService.getTask(id);
        setTask(response.data);
      } catch (err) {
        toast.error(err.message || 'Task not found');
        navigate('/app/tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, navigate]);

  const handleUpdate = async (data) => {
    try {
      setActionLoading(true);
      const response = await taskService.updateTask(id, data);
      setTask(response.data);
      setEditModal(false);
      toast.success('Task updated');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await taskService.deleteTask(id);
      toast.success('Task deleted');
      navigate('/app/tasks');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!task) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container max-w-3xl"
    >
      {/* Back button */}
      <Link
        to="/app/tasks"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Tasks
      </Link>

      {/* Task card */}
      <div className="glass-card p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <CategoryBadge category={task.category} />
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
              {task.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Edit3}
              onClick={() => setEditModal(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setDeleteDialog(true)}
            >
              Delete
            </Button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          </div>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-t border-b border-gray-100 dark:border-dark-600/30">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Due Date</p>
              <DueDateBadge dueDate={task.dueDate} status={task.status} />
              {!task.dueDate && <span className="text-sm text-gray-500">Not set</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Estimated Time</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatDuration(task.estimatedTime)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Created</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatDate(task.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-400" />
            <div>
              <p className="text-xs text-gray-400">Updated</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {formatDate(task.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag size={14} className="text-gray-400" />
              <span className="text-xs text-gray-400">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        title="Edit Task"
        size="lg"
      >
        <TaskForm
          task={task}
          onSubmit={handleUpdate}
          onCancel={() => setEditModal(false)}
          loading={actionLoading}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onConfirm={handleDelete}
        loading={actionLoading}
      />
    </motion.div>
  );
}
