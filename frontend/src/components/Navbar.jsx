import { useTheme } from '../context/ThemeContext';
import { Menu, Sun, Moon, Bell } from 'lucide-react';

/**
 * Navbar — Top bar with menu toggle, theme switch, and profile.
 */
export default function Navbar({ onMenuClick }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-dark-600/50">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-500 dark:text-gray-400 transition-colors">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile avatar */}
          <div className="ml-1 w-9 h-9 rounded-full bg-accent-gradient flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:shadow-glow transition-shadow">
            P
          </div>
        </div>
      </div>
    </header>
  );
}
