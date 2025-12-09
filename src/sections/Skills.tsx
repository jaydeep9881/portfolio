import config from '../data/config';

export default function Skills() {
  const s = config.skills;
  return (
    <section id="skills" className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <span className="hidden sm:inline text-xs text-muted">Crafted for readability and depth</span>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <SkillGroup title="Frontend" emoji="🎨" items={s.frontend} accent="primary" />
        <SkillGroup title="Backend" emoji="🛠️" items={s.backend} accent="accent" />
        <SkillGroup title="Tools" emoji="⚙️" items={s.tools} accent="white" />
      </div>
    </section>
  );
}

function SkillGroup({ title, items, emoji, accent }: { title: string; items: string[]; emoji: string; accent: 'primary' | 'accent' | 'white' }) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-primary/40 via-white/10 to-accent/40">
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2">
          <span aria-hidden>{emoji}</span>
          <h3 className="font-semibold tracking-tight">{title}</h3>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" role="list">
          {items.map((i) => (
            <li
              key={i}
              className={chipClass(accent)}
            >
              {i}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function chipClass(accent: 'primary' | 'accent' | 'white') {
  const base = 'inline-flex items-center px-3 py-1.5 text-xs rounded-md border backdrop-blur';
  if (accent === 'primary') return `${base} border-primary/30 bg-primary/10 text-primary hover:bg-primary/15`;
  if (accent === 'accent') return `${base} border-accent/30 bg-accent/10 text-accent hover:bg-accent/15`;
  return `${base} border-white/15 bg-white/5 text-white/80 hover:bg-white/10`;
}


