import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Loader,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const statCards = [
  {
    key: 'total',
    label: 'Total Tasks',
    icon: ListTodo,
    color: 'text-accent-500',
    bg: 'bg-accent-50 dark:bg-accent-500/10',
    iconBg: 'bg-accent-100 dark:bg-accent-500/20',
  },
  {
    key: 'completed',
    label: 'Completed',
    icon: CheckCircle2,
    color: 'text-success-500',
    bg: 'bg-success-50 dark:bg-success-500/10',
    iconBg: 'bg-success-100 dark:bg-success-500/20',
  },
  {
    key: 'inProgress',
    label: 'In Progress',
    icon: Loader,
    color: 'text-warning-500',
    bg: 'bg-warning-50 dark:bg-warning-500/10',
    iconBg: 'bg-warning-100 dark:bg-warning-500/20',
  },
  {
    key: 'pending',
    label: 'Pending',
    icon: Clock,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    iconBg: 'bg-blue-100 dark:bg-blue-500/20',
  },
  {
    key: 'overdue',
    label: 'Overdue',
    icon: AlertTriangle,
    color: 'text-danger-500',
    bg: 'bg-danger-50 dark:bg-danger-500/10',
    iconBg: 'bg-danger-100 dark:bg-danger-500/20',
  },
  {
    key: 'completionRate',
    label: 'Completion Rate',
    icon: TrendingUp,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    suffix: '%',
  },
];

/**
 * StatsGrid — Animated dashboard statistics cards.
 */
export default function StatsGrid({ stats, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card p-5 space-y-3">
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-7 w-14" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map(({ key, label, icon: Icon, color, bg, iconBg, suffix }, i) => (
        <motion.div
          key={key}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={`glass-card p-5 ${bg} border-0`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {label}
            </span>
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center`}>
              <Icon size={16} className={color} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${color}`}>
            {stats?.[key] ?? 0}{suffix || ''}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
