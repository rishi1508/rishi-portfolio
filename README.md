# Rishi Mishra, portfolio

https://rishi1508.github.io/rishi-portfolio/

A single long page in a chaptered editorial layout: a title page, how the work
usually starts, the work in date order, an illustrated walk through what a
read-only agent does with an alarm, how I build, recognition, and a colophon.

## Stack

- [Astro](https://astro.build/) 5, static output, deployed to GitHub Pages by
  `.github/workflows/deploy.yml` on every push to `main`.
- Plain CSS in `src/styles/global.css` (Tailwind is wired in but the page uses
  custom properties and hand-written rules).
- Scroll behaviour comes from the unmodified
  [scroll-craft](https://github.com/nateherkai/scroll-craft) engine
  (`src/vendor/scrollcraft/`, MIT). Page-specific behaviour (pin fallbacks,
  timeline line, folio, access ledger) is in `src/scripts/page.js`.
- Fonts: Bricolage Grotesque and Literata, self-hosted, subset to Latin and
  trimmed to the axis ranges the page uses (`public/fonts/`, OFL).
- No framework runtime is shipped. About 24 KB of minified JS in total.

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

- `prefers-reduced-motion: reduce` removes all pinning; the alarm sequence and
  every other section render as static content.
- Below 768px the alarm sequence is a stacked list. Any pinned section that
  would not fit the viewport is shown unpinned.
- Without JavaScript, all content is visible.
- Light and dark themes follow the system setting, with a toggle that is
  remembered per browser.
