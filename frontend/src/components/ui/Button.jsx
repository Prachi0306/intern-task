import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const variants = {
  primary: 'bg-accent-gradient text-white shadow-glow hover:shadow-glow-lg',
  secondary: 'bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-dark-500',
  danger: 'bg-danger-500 text-white hover:bg-danger-600',
  ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600',
  outline: 'border border-gray-200 dark:border-dark-500 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-600',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

/**
 * Button — Reusable button with variants, sizes, loading state, and hover animation.
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon: Icon,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : Icon ? (
          <Icon size={16} />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
