import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Heart, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative border-t border-dark-600/50">
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-600/10 via-purple-600/10 to-accent-600/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-500/10 rounded-full blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to get <span className="gradient-text">organized?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
              Start managing your tasks with a beautiful, modern dashboard. It&apos;s free, fast, and easy to use.
            </p>
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 btn-gradient text-lg px-8 py-3.5"
            >
              Launch Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-dark-600/50 bg-dark-950/60">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-accent-gradient rounded-lg flex items-center justify-center">
                <CheckCircle2 size={15} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">TaskFlow</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/app" className="hover:text-white transition-colors">Dashboard</Link>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaGithub, href: 'https://github.com' },
                { icon: FaLinkedinIn, href: 'https://linkedin.com' },
                { icon: FaTwitter, href: 'https://twitter.com' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-dark-700/50 border border-dark-500/30 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-500/30 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-dark-600/30 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
              Built with <Heart size={13} className="text-red-400 fill-red-400" /> using the MERN Stack
              <span className="mx-2">·</span>
              © {new Date().getFullYear()} TaskFlow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
