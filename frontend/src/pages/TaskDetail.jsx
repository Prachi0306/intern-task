import { motion } from 'framer-motion';

/**
 * Task Detail Page — Placeholder.
 * Full implementation in Phase 6.
 */
export default function TaskDetail() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="page-container"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Task Detail
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        Task detail view coming in Phase 6
      </p>
    </motion.div>
  );
}
