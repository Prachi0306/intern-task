import { motion } from 'framer-motion';

/**
 * Tasks Page — Placeholder.
 * Full implementation with list, filters, search, pagination in Phase 6.
 */
export default function Tasks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="page-container"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Tasks
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Task list coming in Phase 6
      </p>
    </motion.div>
  );
}
