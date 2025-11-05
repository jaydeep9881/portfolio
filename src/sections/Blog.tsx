import config from '../data/config';

export default function Blog() {
  if (!config.blog?.enabled) {
    return (
      <section id="blog" className="mt-16">
        <h2 className="text-2xl font-semibold">Notes</h2>
        <div className="mt-4 text-muted">Coming soon.</div>
      </section>
    );
  }
  return (
    <section id="blog" className="mt-16">
      <h2 className="text-2xl font-semibold">Blog</h2>
      <ul className="mt-4 grid gap-3">
        {config.blog.posts.map((p: any) => (
          <li key={p.slug} className="glass rounded-xl p-5">
            <a href={p.url} className="font-medium hover:underline">{p.title}</a>
            <p className="text-sm text-muted">{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}


