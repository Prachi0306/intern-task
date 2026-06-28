import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import Button from './Button';

/**
 * EmptyState — Shown when a list has no items.
 */
export default function EmptyState({
  title = 'No tasks found',
  description = 'Create your first task to get started.',
  actionLabel = 'Create Task',
  onAction,
  icon: Icon = Inbox,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-dark-600/50 flex items-center justify-center mb-4">
        <Icon size={28} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mb-6">
        {description}
      </p>
      {onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </motion.div>
  );
}
