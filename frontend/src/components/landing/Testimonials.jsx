import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Aarav Patel',
    role: 'Frontend Developer',
    content: 'TaskFlow completely changed how I manage my daily tasks. The UI is gorgeous and the dark mode is chef\'s kiss. Best task tracker I\'ve used.',
    avatar: 'AP',
    color: 'from-accent-500 to-purple-500',
  },
  {
    name: 'Meera Singh',
    role: 'Full Stack Engineer',
    content: 'The dashboard analytics are incredibly useful. I can see my productivity trends at a glance. The filtering and search features save me so much time.',
    avatar: 'MS',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Rohan Sharma',
    role: 'Product Manager',
    content: 'I love how responsive the UI is — works flawlessly on my phone and desktop. The animations feel premium and the whole app is a joy to use.',
    avatar: 'RS',
    color: 'from-amber-500 to-orange-500',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-3 mb-4">
            Loved by <span className="gradient-text">developers</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            See what people are saying about their experience with TaskFlow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, content, avatar, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative p-6 rounded-2xl border border-dark-500/30 bg-dark-800/40 backdrop-blur-sm hover:border-accent-500/20 transition-colors duration-300"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-accent-500/10 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                &ldquo;{content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-semibold`}>
                  {avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{name}</p>
                  <p className="text-gray-500 text-xs">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
