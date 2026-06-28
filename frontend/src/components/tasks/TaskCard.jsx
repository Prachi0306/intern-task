import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoreVertical, Trash2, Edit3, Eye, Clock } from 'lucide-react';
import { useState } from 'react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../ui/Badge';
import DueDateBadge from './DueDateBadge';
import { truncate, formatRelativeTime } from '../../utils/helpers';

/**
 * TaskCard — Individual task display card with actions dropdown.
 */
export default function TaskCard({ task, onEdit, onDelete, index = 0 }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="glass-card p-5 group hover:shadow-card-hover transition-all duration-300"
    >
      {/* Top row: Category + Actions */}
      <div className="flex items-center justify-between mb-3">
        <CategoryBadge category={task.category} />
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-400 transition-all"
          >
            <MoreVertical size={16} />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-0 top-8 z-20 w-36 bg-white dark:bg-dark-700 rounded-xl shadow-glass border border-gray-200 dark:border-dark-500/50 py-1 overflow-hidden"
              >
                <Link
                  to={`/app/tasks/${task._id}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600"
                  onClick={() => setShowMenu(false)}
                >
                  <Eye size={14} /> View
                </Link>
                <button
                  onClick={() => { onEdit(task); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600"
                >
                  <Edit3 size={14} /> Edit
                </button>
                <button
                  onClick={() => { onDelete(task); setShowMenu(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <Link to={`/app/tasks/${task._id}`}>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white hover:text-accent-500 dark:hover:text-accent-400 transition-colors mb-1">
          {task.title}
        </h3>
      </Link>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
          {truncate(task.description, 80)}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-dark-600 text-gray-500 dark:text-gray-400">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row: Status + Priority + Due Date */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-dark-600/30">
        <div className="flex items-center gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
        <div className="flex items-center gap-2">
          <DueDateBadge dueDate={task.dueDate} status={task.status} />
        </div>
      </div>

      {/* Created time */}
      <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
        <Clock size={10} />
        {formatRelativeTime(task.createdAt)}
      </div>
    </motion.div>
  );
}
