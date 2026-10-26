# Witbit Labs — Website

Marketing website for [witbitlabs.com](https://witbitlabs.com), deployed on **Cloudflare Workers** using static assets.

## Stack

- Static HTML/CSS/JS in `public/`
- Cloudflare Worker in `src/index.js` (serves assets + `/api/contact`)
- Config: `wrangler.jsonc`

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
