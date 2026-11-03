/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md}'],
  // Colours come from CSS custom properties so light and dark share one set of names.
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        ink: 'var(--ink)',
        indigo: 'var(--indigo)',
        slate: 'var(--slate)',
        amber: 'var(--amber)',
      },
    },
  },
  plugins: [],
};
