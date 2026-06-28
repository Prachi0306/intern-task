import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils/helpers';

/**
 * Pagination — Page navigation with previous/next and page numbers.
 */
export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { currentPage, totalPages, totalItems, hasNextPage, hasPrevPage } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) end = 4;
      if (currentPage >= totalPages - 1) start = totalPages - 3;

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing page {currentPage} of {totalPages} ({totalItems} tasks)
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className={cn(
            'p-2 rounded-lg transition-colors',
            hasPrevPage
              ? 'hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-600 dark:text-gray-400'
              : 'text-gray-300 dark:text-dark-500 cursor-not-allowed'
          )}
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, i) =>
          page === '...' ? (
            <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                'w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200',
                page === currentPage
                  ? 'bg-accent-500 text-white shadow-glow'
                  : 'hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-600 dark:text-gray-400'
              )}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={cn(
            'p-2 rounded-lg transition-colors',
            hasNextPage
              ? 'hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-600 dark:text-gray-400'
              : 'text-gray-300 dark:text-dark-500 cursor-not-allowed'
          )}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
