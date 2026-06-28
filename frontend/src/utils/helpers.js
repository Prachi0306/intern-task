/**
 * Utility Functions
 * Reusable helpers for formatting, dates, and display logic.
 */

/**
 * Format a date to a readable string.
 */
export function formatDate(date, options = {}) {
  if (!date) return '—';
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  return new Date(date).toLocaleDateString('en-US', defaultOptions);
}

/**
 * Format a date to relative time (e.g., "2 days ago", "in 3 hours").
 */
export function formatRelativeTime(date) {
  if (!date) return '—';
  const now = new Date();
  const target = new Date(date);
  const diffMs = target - now;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  return formatDate(date);
}

/**
 * Get due date urgency level for color coding.
 */
export function getDueDateUrgency(dueDate, status) {
  if (!dueDate || status === 'Completed') return 'none';
  const now = new Date();
  const due = new Date(dueDate);
  const diffHours = (due - now) / (1000 * 60 * 60);

  if (diffHours < 0) return 'overdue';
  if (diffHours < 24) return 'urgent';
  if (diffHours < 72) return 'soon';
  return 'normal';
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(str, maxLength = 50) {
  if (!str) return '';
  return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}

/**
 * Capitalize first letter.
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate a greeting based on time of day.
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

/**
 * Format minutes to human-readable duration.
 */
export function formatDuration(minutes) {
  if (!minutes) return '—';
  if (minutes < 60) return `${minutes}m`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}

/**
 * Generate initials from a name.
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Class name merger — filters falsy values.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
