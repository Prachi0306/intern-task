/**
 * Application Constants
 * Centralized enums and color mappings used across the app.
 */

export const STATUSES = ['Pending', 'In Progress', 'Completed'];
export const PRIORITIES = ['Low', 'Medium', 'High'];
export const CATEGORIES = ['Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'];

export const STATUS_CONFIG = {
  Pending: {
    color: 'text-warning-500',
    bg: 'bg-warning-50 dark:bg-warning-500/10',
    border: 'border-warning-400',
    dot: 'bg-warning-400',
    label: 'Pending',
  },
  'In Progress': {
    color: 'text-accent-500',
    bg: 'bg-accent-50 dark:bg-accent-500/10',
    border: 'border-accent-400',
    dot: 'bg-accent-400',
    label: 'In Progress',
  },
  Completed: {
    color: 'text-success-500',
    bg: 'bg-success-50 dark:bg-success-500/10',
    border: 'border-success-400',
    dot: 'bg-success-400',
    label: 'Completed',
  },
};

export const PRIORITY_CONFIG = {
  Low: {
    color: 'text-success-600 dark:text-success-400',
    bg: 'bg-success-50 dark:bg-success-500/10',
    icon: '↓',
    label: 'Low',
  },
  Medium: {
    color: 'text-warning-600 dark:text-warning-400',
    bg: 'bg-warning-50 dark:bg-warning-500/10',
    icon: '→',
    label: 'Medium',
  },
  High: {
    color: 'text-danger-600 dark:text-danger-400',
    bg: 'bg-danger-50 dark:bg-danger-500/10',
    icon: '↑',
    label: 'High',
  },
};

export const CATEGORY_COLORS = {
  Work: { bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  Personal: { bg: 'bg-purple-50 dark:bg-purple-500/10', text: 'text-purple-600 dark:text-purple-400' },
  Study: { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
  Health: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  Finance: { bg: 'bg-cyan-50 dark:bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-400' },
  Other: { bg: 'bg-gray-50 dark:bg-gray-500/10', text: 'text-gray-600 dark:text-gray-400' },
};

export const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt', label: 'Oldest First' },
  { value: 'dueDate', label: 'Due Date (Ascending)' },
  { value: '-dueDate', label: 'Due Date (Descending)' },
  { value: '-priority', label: 'Priority (High → Low)' },
  { value: 'priority', label: 'Priority (Low → High)' },
  { value: 'title', label: 'Title (A → Z)' },
];
