# Rishi Mishra, portfolio

https://rishi1508.github.io/rishi-portfolio/

One page: a hero with highlights, how the work usually starts, the work in
date order on a timeline, a step-by-step example of what a read-only agent does
with an alarm, how I build, recognition, and contact.

## Stack

- [Astro](https://astro.build/) 5, static output, deployed to GitHub Pages by
  `.github/workflows/deploy.yml` on every push to `main`.
- Plain CSS in `src/styles/global.css` (Tailwind is wired in but the page uses
  custom properties and hand-written rules).
- Native scrolling throughout. `src/scripts/page.js` (about 2 KB) fills the
  timeline line and advances the alarm example, which sticks in place on wide
  screens and is a plain list everywhere else.
- Fonts: Bricolage Grotesque and Literata, self-hosted, subset to Latin and
  trimmed to the axis ranges the page uses (`public/fonts/`, OFL).
- No framework runtime is shipped. 

## Content rules

Every figure on the page is a measured number. Lists run oldest first. No em or
en dashes in copy. The alarm sequence is labelled as an illustrative example and
uses invented names.

## Develop

```bash
npm ci
npm run dev      # http://localhost:4321/rishi-portfolio/
npm run build    # astro check, then a static build into dist/
npm run preview
```

The site is served under `/rishi-portfolio/`, so internal links use
`import.meta.env.BASE_URL`.

## Accessibility and motion

- `prefers-reduced-motion: reduce` shows the alarm example as a static list and
  turns off the load animation.
- Below 900px wide, or when the window is too short, the alarm example is a
  stacked list.
- Without JavaScript, all content is visible.
- Light and dark themes follow the system setting, with a toggle that is
  remembered per browser.
