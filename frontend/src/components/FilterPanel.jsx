import { SlidersHorizontal, X } from 'lucide-react';
import { STATUSES, PRIORITIES, CATEGORIES, SORT_OPTIONS } from '../utils/constants';

/**
 * FilterPanel — Dropdowns for status, priority, category, and sort.
 */
export default function FilterPanel({ filters, onFilterChange, onClearFilters }) {
  const hasFilters = filters.status || filters.priority || filters.category;

  const selectClass =
    'input-field py-2 text-sm appearance-none cursor-pointer bg-[length:16px] bg-[right_12px_center] bg-no-repeat';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <SlidersHorizontal size={14} />
        <span className="hidden sm:inline">Filters</span>
      </div>

      {/* Status */}
      <select
        value={filters.status || ''}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className={selectClass}
      >
        <option value="">All Status</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Priority */}
      <select
        value={filters.priority || ''}
        onChange={(e) => onFilterChange({ priority: e.target.value })}
        className={selectClass}
      >
        <option value="">All Priority</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* Category */}
      <select
        value={filters.category || ''}
        onChange={(e) => onFilterChange({ category: e.target.value })}
        className={selectClass}
      >
        <option value="">All Category</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sort || '-createdAt'}
        onChange={(e) => onFilterChange({ sort: e.target.value })}
        className={selectClass}
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>

      {/* Clear filters */}
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-danger-500 bg-danger-50 dark:bg-danger-500/10 rounded-lg hover:bg-danger-100 dark:hover:bg-danger-500/20 transition-colors"
        >
          <X size={12} />
          Clear
        </button>
      )}
    </div>
  );
}
