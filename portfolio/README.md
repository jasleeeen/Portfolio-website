# Jasleen Kaur Sohal — Portfolio

Single-page AI/ML portfolio: cursor-parallax glass hero, a scroll-driven
"fly-through" Domains reel that snaps to each domain, animated ML visuals,
and a stacked contact section.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

Deploy `dist/` anywhere static (Vercel, Netlify, GitHub Pages).

## Where to edit

Everything lives in `src/Portfolio.jsx`:

- **Content** — the data arrays near the top: `LINKS`, `PROJECTS`,
  `EXPERIENCE`, `SKILLS`, `CERTS`, `CONTACT_CARDS`, `DOMAINS`.
  Add a project's `liveUrl` to light up its "Live demo" button.
- **Resume** — replace `public/resume.pdf` with your real PDF
  (the Résumé button already points at `/resume.pdf`).
- **Styling** — the big `CSS` template string at the bottom of the file.
- **Reel pacing** — `TOTAL * 100vh` (wrapper height) is overall speed;
  the `2.1` / `2.35` exponents in the reel's animation loop control how
  fast domains fly toward the camera; `150` (ms) is the idle-snap delay.

## Notes

- `public/resume.pdf` here is a placeholder — swap in your own.
- Requires a modern browser (uses `backdrop-filter`, CSS `@property`,
  `overflow: clip`). Motion is disabled automatically for users with
  "reduce motion" enabled.
