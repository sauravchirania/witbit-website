# Witbit Labs — Website

Marketing website for [witbitlabs.com](https://witbitlabs.com), deployed on **Cloudflare Workers** using static assets.

## Stack

- Static HTML/CSS/JS in `public/`
- Cloudflare Worker in `src/index.js` (serves assets + `/api/contact`)
- Config: `wrangler.jsonc`
- Case-studies brochure PDF served at `/case-studies.pdf` (generated, see below)

## Case studies PDF

The brochure at [witbitlabs.com/case-studies.pdf](https://witbitlabs.com/case-studies.pdf) is generated
from `tools/case-studies.html` (styled like the site — Space Grotesk + Chivo Mono, monochrome):

```bash
npm run pdf    # regenerates public/case-studies.pdf via Playwright/Chromium
```

Requires Playwright's Chromium (`npx playwright install chromium`). On machines without system libs
for Chromium (no sudo), unpack the needed debs locally and run with `LD_LIBRARY_PATH` set:
`libasound2 libgbm1 libnspr4 libnss3 libwayland-server0`.

## Local development

```bash
npm install
npm run dev      # http://localhost:8787
```

## Deploy

```bash
npx wrangler login   # one-time auth
npm run deploy
```

Then add the `witbitlabs.com` custom domain to the Worker (Workers & Pages → witbit-labs → Settings → Domains & Routes).

> Note: `witbitlabs.com` is on Cloudflare, so DNS just needs to point at the Worker (Worker Routes / custom domain), no extra DNS records needed.
