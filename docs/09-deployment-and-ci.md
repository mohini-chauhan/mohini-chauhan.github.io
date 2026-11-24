# 09 · Deployment and CI

## Hosting

GitHub Pages. Mohini's current site lives at `https://mohini-chauhan.github.io/` (the user-site repo `mohini-chauhan/mohini-chauhan.github.io`).

Decided (Q8, Mohini, 24 Nov 2026): the new site is built in this repo on branch `v2`. `v1` is a backup of the old `main`. Until launch, the old site is served from the `gh-pages` branch, so nothing on `v2` or `main` changes it. At launch, merge `v2` into `main` and switch the repo's Pages source from the `gh-pages` branch to GitHub Actions.

The site is served at `/`. Keep the base in an env variable anyway, so a sub-path build still works:

```ts
// vite.config.ts
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  build: { rollupOptions: { input: { main: 'index.html', classic: 'classic/index.html' } } },
});
```

All internal links and asset paths must use `import.meta.env.BASE_URL`.

## Workflows

GitHub Action major versions checked on 18 November 2026: `actions/checkout@v7`, `actions/setup-node@v7`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`. Re-check before use. For PR comments use `actions/github-script` at its current major.

### `.github/workflows/deploy.yml` (push to `main`)

- Permissions: `contents: read`, `pages: write`, `id-token: write`
- Steps: checkout → setup-node 22 with npm cache → `npm ci` → `npm run build` (with `VITE_BASE`) → configure-pages → upload-pages-artifact (`dist`) → deploy-pages
- Set the repo's Pages source to "GitHub Actions"

### `.github/workflows/pr-checks.yml` (pull requests)

This is Mohini's own project 3 in action, so make it good.

1. `npm ci`
2. `npm run lint` and `npm run typecheck`
3. `npm run test`
4. `npm run build`
5. `npm run check:size`: size-limit with the budgets from doc 08. Compare against `main` and report the difference.
6. `npm run check:unused`:
   - `knip` for unused files, exports and dependencies
   - `scripts/check-unused-assets.mjs`: lists every file in `public/` and `src/**/assets`, searches `src/`, `index.html` and `classic/index.html` for a reference to each, and fails if any file is unreferenced (with an allow-list for `favicon`, `og-image`, `robots.txt`, the resume PDF)
7. `npm run test:e2e` against `npm run preview`
8. Post or update **one** PR comment with a table: bundle sizes and change vs `main`, unused assets found, test results. Update the same comment on each push instead of adding new ones.

## Other files

- `public/robots.txt` and a generated `sitemap.xml` with `/` and `/classic/`
- `public/404.html` that links back to `/` and `/classic/`
- `README.md` for the repo: what it is, how to run it, a screenshot, and a short "How it's built" section. This README is part of the portfolio, so write it well.
