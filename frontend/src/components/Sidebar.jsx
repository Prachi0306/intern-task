import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Plus,
  X,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
  { icon: CheckSquare, label: 'Tasks', path: '/app/tasks' },
];

/**
 * Sidebar — Collapsible navigation with links and branding.
 */
export default function Sidebar({ isOpen, mobileOpen, onClose, onToggle }) {
  const location = useLocation();

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-dark-600/50">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 bg-accent-gradient rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={17} className="text-white" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap"
              >
                TaskFlow
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Close on mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-500"
        >
          <X size={18} />
        </button>
      </div>

      {/* Quick add */}
      <div className="px-3 pt-4 pb-2">
        <NavLink
          to="/app/tasks?new=true"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-accent-gradient text-white text-sm font-medium shadow-glow hover:shadow-glow-lg transition-all duration-200 ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <Plus size={18} />
          {isOpen && <span>New Task</span>}
        </NavLink>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive =
            path === '/app'
              ? location.pathname === '/app'
              : location.pathname.startsWith(path);

          return (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isOpen ? 'justify-start' : 'justify-center'
              } ${
                isActive
                  ? 'bg-accent-50 dark:bg-accent-500/10 text-accent-600 dark:text-accent-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon
                size={20}
                className={
                  isActive
                    ? 'text-accent-500'
                    : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                }
              />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:block px-3 pb-4">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600/50 w-full transition-all duration-200 ${
            isOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          {isOpen && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 h-full z-30 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-600/50 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-600/50 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
