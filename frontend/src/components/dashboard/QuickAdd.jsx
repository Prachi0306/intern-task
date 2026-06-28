import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send } from 'lucide-react';
import taskService from '../../services/taskService';
import toast from 'react-hot-toast';

/**
 * QuickAdd — Inline task creation for the dashboard.
 */
export default function QuickAdd({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || title.trim().length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }

    try {
      setLoading(true);
      await taskService.createTask({ title: title.trim() });
      toast.success('Task created!');
      setTitle('');
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-4"
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-500/10 flex items-center justify-center flex-shrink-0">
          <Plus size={16} className="text-accent-500" />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quick add a task..."
          className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!title.trim() || loading}
          className="p-2 rounded-lg bg-accent-500 text-white hover:bg-accent-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={14} />
        </button>
      </form>
    </motion.div>
  );
}
