/**
 * ProgressRing — Circular progress indicator with animated fill.
 */
export default function ProgressRing({
  value = 0,
  size = 80,
  strokeWidth = 6,
  color = 'stroke-accent-500',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-gray-200 dark:stroke-dark-600"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <div className="absolute text-center">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {Math.round(value)}%
        </span>
      </div>
    </div>
  );
}
