import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, AlertTriangle } from 'lucide-react';
import { formatDate, getDueDateUrgency } from '../../utils/helpers';

const urgencyStyles = {
  overdue: 'text-danger-500 bg-danger-50 dark:bg-danger-500/10',
  urgent: 'text-warning-600 bg-warning-50 dark:bg-warning-500/10',
  soon: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
  normal: 'text-gray-500 bg-gray-50 dark:bg-dark-600/50',
};

/**
 * UpcomingTasks — Tasks with upcoming due dates.
 */
export default function UpcomingTasks({ tasks = [], loading }) {
  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="skeleton h-5 w-32 mb-4" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-dark-600/30 last:border-0">
            <div className="skeleton h-8 w-8 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-2/3" />
              <div className="skeleton h-3 w-1/3" />
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
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={16} className="text-accent-500" />
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Upcoming Deadlines
        </h3>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400 py-6 text-center">No upcoming deadlines</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => {
            const urgency = getDueDateUrgency(task.dueDate, task.status);
            const style = urgencyStyles[urgency] || urgencyStyles.normal;

            return (
              <Link
                key={task._id}
                to={`/app/tasks/${task._id}`}
                className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-600/30 transition-colors group"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${style}`}>
                  {urgency === 'overdue' ? (
                    <AlertTriangle size={16} />
                  ) : (
                    <Calendar size={16} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-accent-500 transition-colors">
                    {task.title}
                  </p>
                  <p className={`text-xs ${urgency === 'overdue' ? 'text-danger-500' : 'text-gray-400'}`}>
                    {urgency === 'overdue' ? 'Overdue · ' : ''}{formatDate(task.dueDate)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
