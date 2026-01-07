# Minimal Portfolio (React + Vite + Tailwind + TS)

A responsive, accessible, minimal portfolio with a dark theme, glassmorphism accents, and micro-animations. Content is driven by a single config file.

## Tech
- React 18 + TypeScript
- Vite
- Tailwind CSS
- framer-motion
- Jest + React Testing Library

## Quick Start
```bash
# install deps
npm install

# start dev server
npm run dev

# build
npm run build

# preview built app
npm run preview

# tests
npm test

# lint
npm run lint
```

## Editing Content (Single Source of Truth)
All editable content and theme colors live in `src/data/config.js`.
- Change theme colors under `theme.colors`
- Update hero name, role, tagline, CTAs under `hero`
- Add/edit projects under `projects`
- Update skills under `skills`
- Edit About copy under `about`
- Update contact links and resume URL under `contact`

## Developer Notes
1) Change theme colors: edit `src/data/config.js` → `theme.colors`.
2) Add a new project: append to `projects` in `src/data/config.js` with `{ title, description, tech, demo, repo, images, details }`.
3) Update resume link and contact email: edit `contact.resumeUrl` and `contact.email` in `src/data/config.js`.
4) Replace profile photo: replace `public/profile.jpg` and update `hero.profileImage` if needed.

## Structure
```
src/
  components/
  sections/
  data/
  assets/
public/
```

## Accessibility & Performance
- Semantic markup, keyboard navigable, visible focus rings
- Lazy-loaded images
- Minimal dependencies, small bundle via Vite
- SEO and Open Graph meta tags in `index.html`

## Deployment
### Vercel (recommended)
1. Push to GitHub
2. Import repo in Vercel, select root
3. Build command: `vite build` (default) | Output directory: `dist`
4. Set `NODE_VERSION` to 18+ if needed

### Netlify
1. New site from Git
2. Build command: `npm run build`
3. Publish directory: `dist`

## Optional
- To use light-only or system-only dark mode, change `darkMode` in `tailwind.config.js` or set initial theme in `App.tsx` state.
- Blog posts can be wired by enabling `config.blog.enabled` and populating `posts`.




