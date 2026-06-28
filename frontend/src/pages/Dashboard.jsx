import { motion } from 'framer-motion';
import { getGreeting } from '../utils/helpers';

/**
 * Dashboard Page — Placeholder.
 * Full implementation with stats, charts, and widgets in Phase 5.
 */
export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="page-container"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {getGreeting()} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Here&apos;s an overview of your tasks
        </p>
      </div>

      {/* Stats placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-6">
            <div className="skeleton h-4 w-24 mb-3" />
            <div className="skeleton h-8 w-16" />
          </div>
        ))}
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-center py-12">
        Dashboard widgets coming in Phase 5
      </p>
    </motion.div>
  );
}
