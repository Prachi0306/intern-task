import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, BarChart3, Zap } from 'lucide-react';

/**
 * Landing Page — Placeholder hero section.
 * Full implementation with all sections in Phase 3.
 */
export default function Landing() {
  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow animate-delay-200" />
      </div>

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-6 lg:px-12 py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent-gradient rounded-lg flex items-center justify-center">
              <CheckCircle2 size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          <Link
            to="/app"
            className="btn-gradient text-sm"
          >
            Open Dashboard
            <ArrowRight size={16} className="ml-2 inline" />
          </Link>
        </nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center px-6 py-20 lg:py-32 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm mb-8"
          >
            <Zap size={14} />
            Smart Task Management
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Organize your work,
            <br />
            <span className="gradient-text">amplify your focus</span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            A beautiful, modern task tracker built for developers and teams.
            Track progress, manage priorities, and hit every deadline.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app" className="btn-gradient text-lg px-8 py-3">
              Get Started Free
              <ArrowRight size={20} className="ml-2 inline" />
            </Link>
            <a href="#features" className="btn-ghost text-gray-300 text-lg px-8 py-3 border border-dark-500 rounded-xl hover:border-accent-500/50">
              See Features
            </a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-12 mt-16"
          >
            {[
              { icon: CheckCircle2, value: '10K+', label: 'Tasks Completed' },
              { icon: BarChart3, value: '99%', label: 'Uptime' },
              { icon: Zap, value: '<100ms', label: 'Response Time' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="text-accent-400 mx-auto mb-1" />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
