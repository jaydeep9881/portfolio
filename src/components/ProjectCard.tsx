import { motion } from 'framer-motion';

type Project = {
  title: string;
  description: string;
  tech: string[];
  demo: string;
  repo: string;
  images?: string[];
  details?: string;
};

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="glass rounded-xl p-5 flex flex-col"
    >
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm text-muted flex-1">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 rounded bg-white/5">{t}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-3">
        <a href={project.demo} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md bg-primary/20 text-primary hover:bg-primary/30 focus-ring">Demo</a>
        <a href={project.repo} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 focus-ring">Repo</a>
        <button onClick={onOpen} className="px-3 py-1.5 rounded-md bg-accent/20 text-accent hover:bg-accent/30 focus-ring">Details</button>
      </div>
    </motion.article>
  );
}


