import { Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { formatDate, getDueDateUrgency } from '../../utils/helpers';
import { cn } from '../../utils/helpers';

const config = {
  overdue: { icon: AlertTriangle, color: 'text-danger-500', bg: 'bg-danger-50 dark:bg-danger-500/10', label: 'Overdue' },
  urgent: { icon: Clock, color: 'text-warning-600', bg: 'bg-warning-50 dark:bg-warning-500/10', label: 'Due today' },
  soon: { icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', label: 'Due soon' },
  normal: { icon: Calendar, color: 'text-gray-500', bg: 'bg-gray-50 dark:bg-dark-600/50', label: '' },
  none: { icon: CheckCircle, color: 'text-success-500', bg: 'bg-success-50 dark:bg-success-500/10', label: 'Completed' },
};

/**
 * DueDateBadge — Color-coded due date indicator.
 */
export default function DueDateBadge({ dueDate, status }) {
  if (!dueDate) return null;

  const urgency = getDueDateUrgency(dueDate, status);
  const { icon: Icon, color, bg } = config[urgency] || config.normal;

  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md', bg, color)}>
      <Icon size={12} />
      {formatDate(dueDate, { month: 'short', day: 'numeric' })}
    </span>
  );
}
