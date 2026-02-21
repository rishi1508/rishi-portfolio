# Rishi Mishra — Portfolio Website

A modern, responsive portfolio website built with Astro, React, Tailwind CSS, and Framer Motion. Features a terminal-inspired dark theme with smooth animations and a DevOps aesthetic.

![Portfolio Preview](./preview.png)

## ✨ Features

- **🌙 Dark Mode Default** — Terminal-inspired aesthetic perfect for developers
- **⚡ Blazing Fast** — Built with Astro for optimal performance
- **🎭 Smooth Animations** — Framer Motion for delightful interactions
- **📱 Fully Responsive** — Looks great on all devices
- **🔧 DevOps Theme** — CI/CD pipeline visualization, terminal elements
- **♿ Accessible** — Semantic HTML, ARIA labels, keyboard navigation
- **🚀 Deploy Ready** — Configured for Vercel deployment

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/) v5
- **UI Library:** [React](https://reactjs.org/) v18
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v3
- **Animations:** [Framer Motion](https://www.framer.com/motion/) v11
- **Deployment:** [Vercel](https://vercel.com/)
- **Language:** TypeScript

## 📦 Project Structure

```
site/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── resume.pdf          # Add your resume here
├── src/
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd site

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your portfolio!

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel Dashboard](https://vercel.com/new)
3. Vercel will auto-detect Astro and configure build settings
4. Click Deploy!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Other Platforms

The site can be deployed to any static hosting:

- **Netlify:** Auto-detects Astro projects
- **GitHub Pages:** Use the `@astrojs/github-pages` adapter
- **Cloudflare Pages:** Works out of the box

## 📝 Customization

### Update Personal Info

1. **Hero Section** (`src/components/Hero.tsx`)
   - Update name, roles, and description

2. **About Section** (`src/components/About.tsx`)
   - Edit bio paragraphs and technology list

3. **Experience** (`src/components/Experience.tsx`)
   - Add/modify job entries in the `jobs` array

4. **Projects** (`src/components/Projects.tsx`)
   - Update the `projects` array with your work

5. **Contact** (`src/components/Contact.tsx`)
   - Update email and social links

### Customize Colors

Edit `tailwind.config.mjs` to change the color scheme:

```javascript
colors: {
  terminal: {
    bg: '#0a0e14',     // Background
    surface: '#0d1117', // Card backgrounds
    // ... other colors
  },
  accent: {
    cyan: '#00d4ff',    // Primary accent
    purple: '#a855f7',  // Secondary accent
    // ... other accents
  },
}
```

### Add Resume

Place your resume PDF in the `public/` folder as `resume.pdf`.

### Add Profile Image

Replace the placeholder in `About.tsx` with your image:

```tsx
<img 
  src="/your-photo.jpg" 
  alt="Rishi Mishra" 
  className="rounded-lg"
/>
```

## 🎨 Design Credits

Inspired by:
- [brittanychiang.com](https://brittanychiang.com)
- [leerob.io](https://leerob.io)

## 📄 License

MIT License — feel free to use this as a template for your own portfolio!

---

Built with ❤️ by Rishi Mishra
