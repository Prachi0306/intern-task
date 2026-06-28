import { motion } from 'framer-motion';

/**
 * Dashboard Preview — A styled mockup of the dashboard UI.
 */
export default function Preview() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase">
            Preview
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-3 mb-4">
            A dashboard you&apos;ll
            <span className="gradient-text"> love using</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Clean design, powerful features, and smooth animations create an experience that feels premium.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          {/* Glow behind the card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />

          {/* Browser frame */}
          <div className="relative bg-dark-800 rounded-2xl border border-dark-500/40 overflow-hidden shadow-glass-lg">
            {/* Browser top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-600/50 bg-dark-800/80">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-dark-700 rounded-lg px-4 py-1.5 text-xs text-gray-500 text-center max-w-xs mx-auto">
                  taskflow.app/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content mockup */}
            <div className="p-6 bg-dark-900/60">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="h-6 w-48 bg-dark-600 rounded-lg mb-2" />
                  <div className="h-4 w-32 bg-dark-700 rounded-lg" />
                </div>
                <div className="flex gap-2">
                  <div className="h-9 w-9 bg-dark-600 rounded-xl" />
                  <div className="h-9 w-24 bg-accent-gradient rounded-xl" />
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Tasks', value: '128', color: 'from-accent-500/20 to-accent-600/20', accent: 'text-accent-400' },
                  { label: 'Completed', value: '84', color: 'from-emerald-500/20 to-teal-500/20', accent: 'text-emerald-400' },
                  { label: 'In Progress', value: '31', color: 'from-amber-500/20 to-orange-500/20', accent: 'text-amber-400' },
                  { label: 'Overdue', value: '5', color: 'from-red-500/20 to-rose-500/20', accent: 'text-red-400' },
                ].map(({ label, value, color, accent }) => (
                  <div
                    key={label}
                    className={`bg-gradient-to-br ${color} border border-dark-500/30 rounded-xl p-4`}
                  >
                    <p className="text-gray-400 text-xs mb-1">{label}</p>
                    <p className={`text-2xl font-bold ${accent}`}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Chart + tasks */}
              <div className="grid grid-cols-3 gap-4">
                {/* Chart area */}
                <div className="col-span-2 bg-dark-700/40 border border-dark-500/30 rounded-xl p-4 h-44">
                  <div className="h-3 w-24 bg-dark-600 rounded mb-4" />
                  <div className="flex items-end gap-2 h-24">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-accent-500/60 to-accent-400/40 rounded-t-sm"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent tasks */}
                <div className="bg-dark-700/40 border border-dark-500/30 rounded-xl p-4 h-44">
                  <div className="h-3 w-20 bg-dark-600 rounded mb-4" />
                  <div className="space-y-3">
                    {[
                      { status: 'bg-emerald-400', width: 'w-28' },
                      { status: 'bg-amber-400', width: 'w-24' },
                      { status: 'bg-accent-400', width: 'w-32' },
                      { status: 'bg-red-400', width: 'w-20' },
                    ].map(({ status, width }, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${status}`} />
                        <div className={`h-2.5 ${width} bg-dark-600 rounded`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
