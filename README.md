# Aldy Portfolio (Next.js + TypeScript + Tailwind)

This repository is an auto-scaffold for a professional portfolio website. It includes placeholders and automation scripts to fetch your CV and certificates from Google Drive, run static checks, build, and run E2E smoke tests.

Quick commands (after placing files & installing):

```powershell
npm install
npm run type-check
npm run lint
npm run build
npm run start
```

See `fetch-and-test.ps1` for an automated sequence to download certificates from Google Drive and run the verification pipeline. Place your `Aldy.png` photo at `public/images/Aldy.png` and your CV as `public/cv.pdf` (the script can convert if available tools are installed).

Deployment: Vercel works out of the box — set root to the repo and use the `build` script.
