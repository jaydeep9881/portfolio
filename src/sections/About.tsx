import config from '../data/config';

export default function About() {
  const a = config.about;
  return (
    <section id="about" className="mt-16">
      <h2 className="text-2xl font-semibold">About</h2>
      <div className="mt-4 grid gap-4">
        <p className="text-muted max-w-prose">{a.summary1}</p>
        <p className="text-muted max-w-prose">{a.summary2}</p>
        <p className="text-sm text-primary">{a.roleLine}</p>
      </div>
    </section>
  );
}


