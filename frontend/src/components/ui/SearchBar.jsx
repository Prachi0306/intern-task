import { Search, X } from 'lucide-react';

/**
 * SearchBar — Debounced search input with clear button.
 */
export default function SearchBar({ value, onChange, placeholder = 'Search tasks...' }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-9 pr-9 py-2 text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
