import { useCallback } from 'react';
import config from '../data/config';

export default function Contact() {
  const c = config.contact;

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(String(data.get('subject') || ''));
    const body = encodeURIComponent(String(data.get('message') || ''));
    window.location.href = `mailto:${c.email}?subject=${subject}&body=${body}`;
  }, [c.email]);

  return (
    <section id="contact" className="mt-16">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div className="glass rounded-xl p-5">
          <ul className="grid gap-3 text-sm" role="list">
            <li>
              <a aria-label="Email" className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/15 text-accent hover:bg-accent/25 focus-ring ring-1 ring-accent/30" href={`mailto:${c.email}`}>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent group-hover:scale-110 transition-transform" />
                <span className="underline-offset-4 group-hover:underline">{c.email}</span>
              </a>
            </li>
            <li>
              <a aria-label="LinkedIn" className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/15 text-primary hover:bg-primary/25 focus-ring ring-1 ring-primary/30" href={c.linkedin} target="_blank" rel="noreferrer">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary group-hover:scale-110 transition-transform" />
                <span className="underline-offset-4 group-hover:underline">LinkedIn</span>
              </a>
            </li>
            <li>
              <a aria-label="GitHub" className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 focus-ring ring-1 ring-white/10" href={c.github} target="_blank" rel="noreferrer">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-white/60 group-hover:scale-110 transition-transform" />
                <span className="underline-offset-4 group-hover:underline">GitHub</span>
              </a>
            </li>
            <li>
              <a aria-label="View Resume" className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface hover:bg-white/10 focus-ring ring-1 ring-white/10" href={c.resumeUrl} target="_blank" rel="noreferrer">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-muted group-hover:scale-110 transition-transform" />
                <span className="underline-offset-4 group-hover:underline">View Resume</span>
              </a>
            </li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="glass rounded-xl p-5 grid gap-3" aria-label="Contact form">
          <label className="grid gap-1 text-sm" htmlFor="subject">Subject
            <input id="subject" name="subject" className="mt-1 input-base" required placeholder="What’s up?" />
          </label>
          <label className="grid gap-1 text-sm" htmlFor="message">Message
            <textarea id="message" name="message" className="mt-1 input-base h-28 resize-y" required placeholder="Tell me a bit about your project..." />
          </label>
          <div>
            <button type="submit" className="px-4 py-2 rounded-md bg-accent/20 text-accent hover:bg-accent/30 focus-ring">Send</button>
          </div>
        </form>
      </div>
    </section>
  );
}


