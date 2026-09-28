# Bhutan Trekking Services

Website for Bhutan Trekking Services (Thimphu): home page, seven featured trek pages, Snowman II–IV variant pages, About, Contact and an old-URL archive. Every page is prerendered to static HTML at build time.

## Tech Stack

- TanStack Start v1 (React 19, TanStack Router) on Vite
- Tailwind CSS v4 (configured in `src/styles.css`)
- TypeScript, Zod (validates content at build time)
- Nitro (build output; auto-detects Vercel)

Content lives in `src/data/*.json` and is validated in `src/lib/content.ts`, so invalid data fails the build. Photos are in `public/media/`. When you add a trek, also add its path to `pages` in `vite.config.ts`.

## Local Setup

Requires Node.js 20.19+.

```sh
npm install
npm run dev        # http://localhost:8080
```

## Production Build

```sh
npm run build
npm run start      # preview the production build locally
```

Other scripts: `npm run lint`, `npm run format`. The data tests use Bun: `bun test tests`.

## Deployment (Vercel)

1. Push this folder to GitHub (it is the repository root).
2. In Vercel: Add New → Project → import the repository.
3. Keep the defaults (Install `npm install`, Build `npm run build`). Nitro writes Vercel's output format automatically, so no `vercel.json` is needed.
4. No environment variables are required.
5. Deploy.

Switching the domain and adding 301 redirects from the old `/treks/show/{slug}` URLs is a separate step that hasn't been approved yet (see `src/data/urlMap.json`).
