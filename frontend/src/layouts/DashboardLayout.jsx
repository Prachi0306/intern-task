import { Outlet } from 'react-router-dom';

/**
 * Dashboard Layout — Shell with sidebar + navbar + content area.
 * Full implementation in Phase 4.
 */
export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="flex">
        {/* Sidebar placeholder — Phase 4 */}
        <main className="flex-1 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
