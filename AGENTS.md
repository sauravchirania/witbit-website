# AGENTS.md

Guidance for agents working on the Witbit Labs marketing site.

## Project

Static marketing site for witbitlabs.com served by a Cloudflare Worker (static assets + contact API).

- `public/` — the site: `index.html`, `case-studies.html`, `styles.css`, `script.js`, `logos/`, `case-studies.pdf`
- `src/index.js` — Worker: serves assets, plus `POST /api/contact` and `/health`
- `tools/case-studies.html` — separate print-optimized source for the brochure PDF (NOT a copy of the web page; own layout/classes)
- `tools/generate-pdf.mjs` — renders `tools/case-studies.html` → `public/case-studies.pdf` via Playwright
- `wrangler.jsonc` — Worker config; custom domains `witbitlabs.com` / `www.witbitlabs.com`

## Commands

```bash
npm run dev      # local server at http://localhost:8787
npm run deploy   # wrangler deploy (public/ is uploaded as-is, no build step)
npm run pdf      # regenerate public/case-studies.pdf from tools/case-studies.html
```

`wrangler` may not be on PATH — use `./node_modules/.bin/wrangler` if needed.

No lint/typecheck/test suite (plain static HTML/CSS/JS). Sanity-check JS with `node --check public/script.js`.

## Deploy workflow (expected by maintainer)

1. Commit changes — include unrelated pending changes if the user says they are already deployed
2. `git push origin main`
3. `npm run deploy`
4. GitHub/Cloudflare network is occasionally flaky — retry pushes/deploys before reporting failure

## Gotchas

- **`script.js` is shared by both pages.** `index.html` has `.menu-toggle` and `#contact-form`; `case-studies.html` has neither. Always null-guard optional elements (`if (toggle)`, `if (form)`). An unguarded throw kills the rest of the script, the scroll-reveal observer never runs, and every `.reveal` element stays at `opacity: 0` (looks like "black on black" empty sections).
- **Two case-studies files must be kept in sync manually:** `public/case-studies.html` (web) and `tools/case-studies.html` (PDF source). Copy/content changes go in both; markup and classes differ per target.
- **PDF regeneration on this machine** needs the Chromium system-libs workaround (see README). Run:
  ```bash
  LD_LIBRARY_PATH=/tmp/opencode/pwlibs/root/usr/lib/x86_64-linux-gnu npm run pdf
  ```
  If `/tmp` was cleared, rebuild the lib folder: `apt-get download libasound2 libgbm1 libnspr4 libnss3 libwayland-server0` then `dpkg-deb -x <deb> root/` for each, and point `LD_LIBRARY_PATH` at `root/usr/lib/x86_64-linux-gnu`. No root/sudo required.
- **Logos** live in `public/logos/*.jpeg` — dark themed 1200×600 cards (white wordmark + corner brackets + `// label`), not transparent cutouts. Web refs: `/logos/<file>`; PDF source refs: `../public/logos/<file>` (URL-encode spaces: `tata%201mg.jpeg`). Grid style: flex, `justify-content: center`, item width `calc((100% - 28px) / 3)` → 3 per row with the last row (2 items) centered.
- **Design tokens** (`:root` in `styles.css`): bg `#111`, fg `#f5f5f5`, muted `#9a9a9a`, border `#2a2a2a`, card `#1a1a1a`; fonts Space Grotesk (sans) + Chivo Mono (mono labels). Single breakpoint `max-width: 860px` (hamburger overlay nav, stacked layouts). Match this monochrome editorial style for new UI.
- **Scroll reveal:** elements need class `reveal`; `script.js` adds `visible` via IntersectionObserver (threshold 0.15). New sections that should animate in must include `reveal` — and remember gotcha #1.
- **Nav:** fixed header, `.scrolled` class adds blurred background after 40px. Mobile menu toggles `.menu-open` on `#nav` and locks `body` scroll.
