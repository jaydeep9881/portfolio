import { motion } from 'framer-motion';
import config from '../data/config';

export default function Hero() {
  const h = config.hero;
  return (
    <section id="home" className="pt-20 sm:pt-28">
      <div className="grid sm:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-bold"
            
          >
            {h.name}
          </motion.h1>
          <p className="mt-2 text-primary font-semibold">{h.role}</p>
          <p className="mt-4 text-muted max-w-prose">{h.tagline}</p>
          <div className="mt-6 flex gap-3">
            {h.ctas.map((c) => (
              <a key={c.href} href={c.href} className="px-4 py-2 rounded-md bg-primary/20 text-primary hover:bg-primary/30 focus-ring">
                {c.label}
              </a>
            ))}
          </div>
        </div>
        <div className="justify-self-center">
          <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-2xl glass overflow-hidden">
            <img src={h.profileImage} alt="Profile" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}


