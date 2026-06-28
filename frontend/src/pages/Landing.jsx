import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Preview from '../components/landing/Preview';
import Stats from '../components/landing/Stats';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';
import Footer from '../components/landing/Footer';

/**
 * Landing Page
 * Marketing page with hero, features, preview, stats, testimonials, FAQ, and footer.
 * Forces dark mode for consistent branding.
 */
export default function Landing() {
  const { isDark } = useTheme();

  // Force dark mode on landing page
  useEffect(() => {
    const root = document.documentElement;
    if (!isDark) {
      root.classList.add('dark');
    }
    return () => {
      if (!isDark) {
        root.classList.remove('dark');
      }
    };
  }, [isDark]);

  return (
    <div className="bg-dark-900 text-white overflow-hidden">
      <Hero />
      <Features />
      <Preview />
      <Stats />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
