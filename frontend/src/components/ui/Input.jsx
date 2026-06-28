import { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

/**
 * Input — Styled input with label, error message, and icon support.
 */
const Input = forwardRef(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={16} />
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'input-field',
              Icon && 'pl-10',
              error && 'border-danger-500 focus:ring-danger-500/40 focus:border-danger-500',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-xs text-danger-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
