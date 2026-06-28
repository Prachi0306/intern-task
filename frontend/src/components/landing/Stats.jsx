import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle2, TrendingUp, Clock, Users } from 'lucide-react';

const stats = [
  { icon: CheckCircle2, value: 10000, suffix: '+', label: 'Tasks Completed', color: 'text-emerald-400' },
  { icon: TrendingUp, value: 99, suffix: '%', label: 'Uptime', color: 'text-accent-400' },
  { icon: Clock, value: 100, prefix: '<', suffix: 'ms', label: 'Response Time', color: 'text-amber-400' },
  { icon: Users, value: 500, suffix: '+', label: 'Active Users', color: 'text-pink-400' },
];

/**
 * Animated counter that counts up when in view.
 */
function AnimatedCounter({ value, prefix = '', suffix = '', color }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className={`text-4xl lg:text-5xl font-extrabold ${color}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/[0.03] via-purple-500/[0.05] to-accent-500/[0.03]" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">
            By the numbers
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3">
            Trusted by developers <span className="gradient-text">worldwide</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, prefix, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <Icon size={24} className={`${color} mx-auto mb-3 opacity-80`} />
              <AnimatedCounter
                value={value}
                prefix={prefix}
                suffix={suffix}
                color={color}
              />
              <p className="text-gray-400 text-sm mt-2">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
