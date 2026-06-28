import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

/**
 * 404 Not Found Page
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Large 404 */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl lg:text-9xl font-extrabold gradient-text mb-4"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Page not found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn-gradient px-6 py-2.5"
            >
              <Home size={18} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 btn-ghost border border-gray-200 dark:border-dark-500 px-6 py-2.5"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
