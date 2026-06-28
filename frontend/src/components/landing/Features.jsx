import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  Filter,
  Moon,
  BarChart3,
  Bell,
  Zap,
  Shield,
  Smartphone,
} from 'lucide-react';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Intuitive Dashboard',
    description: 'Get a complete overview of your tasks with beautiful analytics, charts, and progress tracking.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Search,
    title: 'Smart Search & Filter',
    description: 'Find any task instantly with powerful search, multi-filter, and sort capabilities.',
    color: 'from-accent-500 to-purple-500',
  },
  {
    icon: Moon,
    title: 'Dark & Light Mode',
    description: 'Beautiful theme support with smooth transitions. Easy on the eyes, day or night.',
    color: 'from-violet-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: 'Rich Analytics',
    description: 'Track completion rates, view priority distributions, and monitor your productivity trends.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Bell,
    title: 'Toast Notifications',
    description: 'Real-time feedback for every action. Create, update, or delete tasks with instant confirmation.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Optimistic UI updates for instant feedback. No waiting for the server to respond.',
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: Filter,
    title: 'Advanced Filtering',
    description: 'Filter by status, priority, category, and date. Sort in any direction you need.',
    color: 'from-sky-500 to-indigo-500',
  },
  {
    icon: Shield,
    title: 'Robust Validation',
    description: 'Client and server-side validation ensures data integrity with meaningful error messages.',
    color: 'from-lime-500 to-green-500',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Perfect experience on desktop, tablet, and mobile. No broken layouts, ever.',
    color: 'from-fuchsia-500 to-pink-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-500/[0.02] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">
            Features
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-3 mb-4">
            Everything you need to
            <br />
            <span className="gradient-text">stay productive</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built with modern tools and best practices. Every feature is designed
            to make task management effortless.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, description, color }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl border border-dark-500/30 bg-dark-800/40 backdrop-blur-sm hover:border-accent-500/30 hover:bg-dark-700/40 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
