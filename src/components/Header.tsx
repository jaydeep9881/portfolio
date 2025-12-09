import { motion } from 'framer-motion';
import config from '../data/config';

type HeaderProps = {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
};

export default function Header({ theme, setTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur glass">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="#home" className="font-semibold text-lg focus-ring">{config.site.title}</a>
        <nav aria-label="Primary" className="hidden sm:flex gap-6 text-sm text-muted">
          <a className="hover:text-white focus-ring" href="#projects">Projects</a>
          <a className="hover:text-white focus-ring" href="#skills">Skills</a>
          <a className="hover:text-white focus-ring" href="#learning">Learning</a>
          <a className="hover:text-white focus-ring" href="#about">About</a>
          <a className="hover:text-white focus-ring" href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={config.contact.resumeUrl}
            className="px-3 py-1.5 rounded-md bg-primary/20 text-primary hover:bg-primary/30 focus-ring"
            download
          >
            Resume
          </a>
          <motion.button
            aria-label="Toggle theme"
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 focus-ring"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>
        </div>
      </div>
    </header>
  );
}


