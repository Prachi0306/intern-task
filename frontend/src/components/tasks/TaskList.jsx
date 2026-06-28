import { AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import { TaskCardSkeleton } from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

/**
 * TaskList — Grid of task cards with loading and empty states.
 */
export default function TaskList({ tasks, loading, onEdit, onDelete, onCreateNew }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        description="Create your first task or adjust your filters to see results."
        actionLabel="Create Task"
        onAction={onCreateNew}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <AnimatePresence>
        {tasks.map((task, i) => (
          <TaskCard
            key={task._id}
            task={task}
            index={i}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
