import { Loader2 } from 'lucide-react';

/**
 * Loader — Spinner for full-page or inline loading states.
 */
export function Spinner({ size = 24, className = '' }) {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-accent-500 ${className}`}
    />
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Spinner size={32} />
        <p className="text-gray-400 text-sm mt-3">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Skeleton — Shimmer loading placeholder.
 */
export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

export function TaskCardSkeleton() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}
