import config from '../data/config';

export default function Learning() {
  const learning = (config as any).learning as { title: string; items: string[] } | undefined;
  if (!learning) return null;
  return (
    <section id="learning" className="mt-16">
      <h2 className="text-2xl font-semibold">{learning.title}</h2>
      <div className="mt-4 glass rounded-xl p-5">
        <ul className="flex flex-wrap gap-2">
          {learning.items.map((item) => (
            <li key={item} className="px-3 py-1.5 text-sm rounded-md bg-primary/15 text-primary">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


