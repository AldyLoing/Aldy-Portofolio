# Aldy Portfolio (Next.js + TypeScript + Tailwind)

This repository is an auto-scaffold for a professional portfolio website. It includes placeholders and automation scripts to fetch your CV and certificates from Google Drive, run static checks, build, and run E2E smoke tests.

Quick commands (after placing files & installing):

```bash
export PATH="$HOME/.local/node/bin:$PATH"
npm install
npm run dev
```

Place your `Aldy.png` at `public/image/Aldy.png` and `cv.pdf` at `public/cv.pdf`.

Summary of recent redesign changes:
- Global design tokens and premium fonts (`app/globals.css`, `tailwind.config.js`)
- Sticky header and improved navigation (`src/components/Header.tsx`)
- Founder-level Hero (`src/components/Hero.tsx`)
- Capabilities (`src/components/Capabilities.tsx`) and Impact (`src/components/Impact.tsx`)
- Projects upgraded to case-study cards and expanded `src/data/site.json`
- Experience timeline, curated Certifications grid, Contact form + API
- Placeholder project images in `public/images/projects/`

Deployment: Vercel works out of the box — set root to the repo and use the `build` script.
