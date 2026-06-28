import { cn } from '../../utils/helpers';
import { STATUS_CONFIG, PRIORITY_CONFIG, CATEGORY_COLORS } from '../../utils/constants';

/**
 * Badge — Color-coded badge for status, priority, or category.
 */
export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status];
  if (!config) return null;
  return (
    <span className={cn('badge', config.bg, config.color)}>
      <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', config.dot)} />
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const config = PRIORITY_CONFIG[priority];
  if (!config) return null;
  return (
    <span className={cn('badge', config.bg, config.color)}>
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </span>
  );
}

export function CategoryBadge({ category }) {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  return (
    <span className={cn('badge', colors.bg, colors.text)}>
      {category}
    </span>
  );
}
