import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getGreeting } from '../utils/helpers';
import taskService from '../services/taskService';
import StatsGrid from '../components/dashboard/StatsGrid';
import TaskChart from '../components/dashboard/TaskChart';
import RecentTasks from '../components/dashboard/RecentTasks';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import QuickAdd from '../components/dashboard/QuickAdd';
import ProgressRing from '../components/ui/ProgressRing';

/**
 * Dashboard Page
 * Main overview with stats, charts, recent/upcoming tasks, quick-add, and progress.
 */
export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskService.getStats();
      setStats(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            {getGreeting()} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Here&apos;s an overview of your tasks and productivity
          </p>
        </div>

        {/* Completion ring */}
        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ProgressRing value={stats.completionRate || 0} size={72} strokeWidth={5} />
          </motion.div>
        )}
      </div>

      {/* Quick Add */}
      <div className="mb-6">
        <QuickAdd onTaskCreated={fetchStats} />
      </div>

      {/* Stats Grid */}
      <div className="mb-6">
        <StatsGrid stats={stats} loading={loading} />
      </div>

      {/* Charts */}
      <div className="mb-6">
        <TaskChart stats={stats} loading={loading} />
      </div>

      {/* Recent + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentTasks tasks={stats?.recentTasks} loading={loading} />
        <UpcomingTasks tasks={stats?.upcomingTasks} loading={loading} />
      </div>
    </motion.div>
  );
}
