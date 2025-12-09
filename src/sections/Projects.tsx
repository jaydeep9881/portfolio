import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import config from '../data/config';

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<any>(null);

  return (
    <section id="projects" className="mt-16">
      <h2 className="text-2xl font-semibold">Projects</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {config.projects.map((p) => (
          <ProjectCard key={p.title} project={p as any} onOpen={() => { setActive(p); setOpen(true); }} />
        ))}
      </div>
      <ProjectModal project={active} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}


