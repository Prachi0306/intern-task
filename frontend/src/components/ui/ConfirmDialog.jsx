import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

/**
 * ConfirmDialog — Delete confirmation modal.
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Task',
  message = 'Are you sure you want to delete this task? This action cannot be undone.',
  confirmLabel = 'Delete',
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-sm bg-white dark:bg-dark-700 rounded-2xl shadow-glass-lg border border-gray-200 dark:border-dark-500/50 p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-danger-50 dark:bg-danger-500/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-danger-500" />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {message}
        </p>

        <div className="flex items-center gap-3 justify-center">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
