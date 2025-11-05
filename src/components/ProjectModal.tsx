import { motion, AnimatePresence } from 'framer-motion';

type Project = {
  title: string;
  details?: string;
  images?: string[];
};

export default function ProjectModal({ project, open, onClose }: { project: Project | null; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          className="fixed inset-0 z-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="relative z-10 max-w-2xl w-full mx-4 glass rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <button aria-label="Close details" className="focus-ring px-2 py-1 rounded bg-white/5" onClick={onClose}>✕</button>
            </div>
            {project.images && project.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {project.images.map((src) => (
                  <img key={src} src={src} alt="Project screenshot" className="rounded-lg" loading="lazy" />
                ))}
              </div>
            )}
            {project.details && <p className="mt-4 text-sm text-muted">{project.details}</p>}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


