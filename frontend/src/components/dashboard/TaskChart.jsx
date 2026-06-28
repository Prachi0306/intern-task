import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const PIE_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-700 px-3 py-2 rounded-lg shadow-glass border border-gray-200 dark:border-dark-500/50 text-xs">
        <p className="text-gray-500 dark:text-gray-400">{label || payload[0].name}</p>
        <p className="font-semibold text-gray-900 dark:text-white">{payload[0].value} tasks</p>
      </div>
    );
  }
  return null;
};

/**
 * TaskChart — Bar chart for priority distribution and pie chart for categories.
 */
export default function TaskChart({ stats, loading }) {
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-6 h-72">
          <div className="skeleton h-4 w-32 mb-4" />
          <div className="skeleton h-48 w-full rounded-xl" />
        </div>
        <div className="glass-card p-6 h-72">
          <div className="skeleton h-4 w-32 mb-4" />
          <div className="skeleton h-48 w-48 rounded-full mx-auto" />
        </div>
      </div>
    );
  }

  // Priority bar data
  const priorityData = (stats?.byPriority || []).map((item) => ({
    name: item._id,
    count: item.count,
  }));

  // Category pie data
  const categoryData = (stats?.byCategory || []).map((item) => ({
    name: item._id,
    value: item.count,
  }));

  const axisColor = isDark ? '#4a5578' : '#d1d5e0';
  const textColor = isDark ? '#a3aabf' : '#75809e';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Priority Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Priority Distribution
        </h3>
        {priorityData.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={priorityData}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: textColor }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: textColor }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={40}>
                {priorityData.map((entry, index) => {
                  const colors = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };
                  return <Cell key={index} fill={colors[entry.name] || '#6366f1'} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            No data yet
          </div>
        )}
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        {categoryData.length > 0 ? (
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            No data yet
          </div>
        )}
      </motion.div>
    </div>
  );
}
