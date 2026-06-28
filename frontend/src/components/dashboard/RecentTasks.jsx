import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { StatusBadge, PriorityBadge } from '../ui/Badge';
import { formatRelativeTime } from '../../utils/helpers';

/**
 * RecentTasks — Latest tasks displayed in the dashboard.
 */
export default function RecentTasks({ tasks = [], loading }) {
  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="skeleton h-5 w-28 mb-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-dark-600/30 last:border-0">
            <div className="skeleton h-4 w-4 rounded" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Recent Tasks
        </h3>
        <Link
          to="/app/tasks"
          className="text-xs text-accent-500 hover:text-accent-600 font-medium flex items-center gap-1"
        >
          View All <ArrowRight size={12} />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">No tasks yet</p>
      ) : (
        <div className="space-y-1">
          {tasks.map((task) => (
            <Link
              key={task._id}
              to={`/app/tasks/${task._id}`}
              className="flex items-center justify-between py-3 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-600/30 transition-colors group"
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-accent-500 transition-colors">
                  {task.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatRelativeTime(task.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <PriorityBadge priority={task.priority} />
                <StatusBadge status={task.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </motion.div>
  );
}
