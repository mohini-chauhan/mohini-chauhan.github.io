# Setup and lesson 1 implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the handoff folder into a working, checked repo (Part A1 / Phase 0), then put the first 3D scene on screen as a lesson Mohini understands (lesson 1).

**Architecture:** Vite multi-page app with two entries: `/` is the 3D room (React Three Fiber) and `/classic/` is plain React with no three.js. Lesson 1 adds a WebGL2 check that redirects to the Classic view, and a full-screen R3F canvas with one box and temporary orbit controls.

**Tech stack:** Node 22, Vite 8.3.8, React 19.3.1, TypeScript 6.0.3, three 0.187.0, @react-three/fiber 9.8.2, @react-three/drei 10.7.9, Vitest 5.1.1 + jsdom, Playwright 1.65.1, ESLint 10 + typescript-eslint 8.74.0, Prettier 3. All versions checked with `npm view` on 24 November 2026.

**Spec:** `docs/13-learning-path.md` (Part A1 and lesson 1), which sits on top of `docs/06`, `docs/08`, `docs/09`, `docs/10` and `docs/12`. Read `AGENTS.md` first.

## Global constraints

- Node 22 LTS (Vite 8 needs Node 20.19+ or 22.12+). This machine has v22.19.0 installed through nvm. nvm's default is 18 and stays 18. The repo selects 22 through `.nvmrc`.
- TypeScript 6.0, not 7.x (typescript-eslint 8.74.0 has a peer range of `typescript >=4.8.4 <6.1.0`).
- R3F 9 needs React 19.0 to 19.3 (peer range `>=19 <19.4`).
- `@react-three/postprocessing` needs `postprocessing ^6.36.0` installed alongside it.
- Phase 0 must not overwrite `AGENTS.md`, `CLAUDE.md`, `docs/`, `reference/`, `src/content/portfolio.ts` or `public/images/`. Adding a key to `portfolio.ts` is fine.
- "Never hard-code copy in components. Import from `portfolio.ts`. If you need new text, add it there first."
- UI text: sentence case, plain English. No exclamation marks, emoji, "successfully" or "please".
- TypeScript strict. No `any` without a comment explaining why.
- `base: process.env.VITE_BASE ?? '/'`. All internal links and asset paths use `import.meta.env.BASE_URL` or relative paths.
- `/classic/` must not import three, R3F or drei.
- No network assets at runtime. Albert Sans is self-hosted via `@fontsource-variable/albert-sans`.
- Cap device pixel ratio at 2.
- `docs/learning/` is gitignored.
- One branch and one pull request per step or lesson. Stop for Mohini's go-ahead before merging.
- No trackers or analytics.

## Review focus

1. **Site served under a sub-path** (`VITE_BASE=/portfolio/`, the project-site URL from Q8). Asset URLs and the no-WebGL redirect must include the base. Pinned by the `classicFallbackUrl` sub-path test (Task 6) and the sub-path build check (Task 2).
2. **Browser without WebGL2.** The visitor must land on `/classic/?reason=no-webgl`, not a blank page or a console error. Pinned by the e2e redirect test (Task 7).
3. **`getContext` throws instead of returning null** (some browsers do this when the GPU is blocklisted). `hasWebGL2` must return false, not crash. Pinned by a unit test (Task 6).
4. **three.js leaking into the Classic bundle** through a shared import. Pinned by the e2e "classic loads no three.js" test (Task 4). It passes trivially at first and guards every later lesson.
5. **Phone portrait (390 × 844).** The canvas fills the screen with no page scroll. Pinned by an e2e test (Task 7).

---

## Part A1 · Project setup (branch `a1-setup`)

### Task 1: Project folder, Node 22, git and GitHub

> **Changed 24 Nov 2026:** Mohini moved the work into this repo, `mohini-chauhan.github.io`. Steps 1 to 7 ran in `~/Documents/Personal/portfolio`, and their result was copied onto branch `a1-setup` (off `v2`) without `reference/`. Step 8 is replaced: the remote is the existing `origin` over SSH (`github.com-moh`, with `IdentitiesOnly yes`), and every pull request targets `v2`. Commits use this repo's local author.

**Files:**
- Create: `~/Documents/Personal/portfolio/` (a copy of `mohini-prototypes-v2/mohini-portfolio-handoff/`, including `.github/`)
- Create: `.gitignore`, `.nvmrc`

**Interfaces:**
- Produces: a git repo at `~/Documents/Personal/portfolio` with `main` pushed to a private GitHub repo named `portfolio`. Every later task runs inside this folder.

- [ ] **Step 1: Switch to Node 22.** It's already installed through nvm (v22.19.0). Don't install anything, and don't change nvm's default (18), which her other projects use. Once `.nvmrc` exists (Step 3), `nvm use` in the repo picks 22. In agent shells, state doesn't persist between commands, so start each command with `source ~/.nvm/nvm.sh && nvm use >/dev/null &&`. Expected: `node -v` prints `v22.19.0`.
- [ ] **Step 2: Copy the handoff.** Run `cp -R ~/Documents/Personal/mohini-prototypes-v2/mohini-portfolio-handoff/. ~/Documents/Personal/portfolio/`. Do not touch `~/Documents/Personal/profile/`, and copy nothing from it.
- [ ] **Step 3: Add `.nvmrc`** containing `22`.
- [ ] **Step 4: Add `.gitignore`** with these entries: `node_modules`, `dist`, `playwright-report`, `test-results`, `docs/learning/`, `.DS_Store`, `*.local`.
- [ ] **Step 5: Sign in to the personal GitHub account.** Mohini confirmed on 24 November 2026 that this repo uses her personal account, `mohini-chauhan`. GitHub CLI is currently signed in only to the work account. Mohini runs `gh auth login` herself (in Claude Code: `! gh auth login`), signs in as `mohini-chauhan`, then runs `gh auth switch --user mohini-chauhan`. Signing in to a second account doesn't sign out the work one. Expected: `gh auth status` shows `mohini-chauhan` as the active account.
- [ ] **Step 6: Set this repo's author to the personal account.** The global git identity uses the work email. Commits in this repo would carry it, and the repo goes public at launch. Run `git init -b main`, then set **repo-local** `git config user.name "Mohini Chauhan"` and `git config user.email "<id>+mohini-chauhan@users.noreply.github.com"`, taking `<id>` from `gh api users/mohini-chauhan --jq .id`. Expected: `git config user.email` inside the repo prints the noreply address, and the global config is unchanged.
- [ ] **Step 7: Make the first commit.** Run `git add -A && git commit -m "Add portfolio handoff"`. Expected: `git status` is clean, and `git log -1 --format=%ae` prints the noreply address.
- [ ] **Step 8: Create the GitHub repo, after asking.** **Never use anything from the work account for this repo** (Mohini, 24 Nov 2026).
  - Pin every `gh` call to the personal account with `GH_TOKEN=$(gh auth token --user mohini-chauhan)`. First check that `GH_TOKEN=… gh api user --jq .login` prints `mohini-chauhan`. If it doesn't, stop.
  - Confirm with Mohini, then run `GH_TOKEN=… gh repo create mohini-chauhan/portfolio --private`.
  - Remote: `git remote add origin https://github.com/mohini-chauhan/portfolio.git`, over HTTPS and not SSH (SSH would pick the default key).
  - Add a **repo-local** credential helper: first `credential.helper` set to an empty value, which clears inherited helpers such as the macOS keychain, then a helper that returns `username=x-access-token` and `password=$(gh auth token --user mohini-chauhan)`.
  - `git push -u origin main`.
  - Expected: `git log origin/main` shows the handoff commit, and the global git and gh config are unchanged.
  - The same `GH_TOKEN` pin applies to every later `gh` command in this plan (`gh pr create`, `gh api …`).
- **Not touched:** the live site repo `mohini-chauhan.github.io` (local copy at `~/Documents/Personal/mohini-chauhan.github.io`). The old site stays live until the new one launches in Phase 6.

### Task 2: Vite, TypeScript, lint and two blank pages

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `.prettierrc`, `.prettierignore`
- Create: `index.html`, `classic/index.html`, `src/room/main.tsx`, `src/classic/main.tsx`
- Create: `src/styles/tokens.css`, `src/styles/global.css`

**Interfaces:**
- Produces: these npm scripts, used by every later task and by CI:
  - `dev`: `vite`
  - `build`: `vite build`
  - `preview`: `vite preview`
  - `lint`: `eslint .`
  - `typecheck`: `tsc --noEmit`
  - `test`: `vitest run`
  - `test:launch`: `LAUNCH=1 vitest run src/content`
  - `test:e2e`: `playwright test`
  - `format`: `prettier --write .`
- Produces: entry modules `src/room/main.tsx` and `src/classic/main.tsx`. Both import `src/styles/global.css`, which imports `tokens.css`.

- [ ] **Step 1: Branch.** Run `git switch -c a1-setup`.
- [ ] **Step 2: Install exact versions.**
  - Dependencies: `react@19.3.1 react-dom@19.3.1 three@0.187.0 @react-three/fiber@9.8.2 @react-three/drei@10.7.9 @react-three/postprocessing@3.2.2 postprocessing zustand@5.1.0 @fontsource-variable/albert-sans@5.3.0`
  - Dev dependencies: `vite@8.3.8 @vitejs/plugin-react@6.3.0 typescript@6.0.3 @types/react @types/react-dom @types/three @types/node@22 vitest@5.1.1 jsdom@31.0.1 @testing-library/react@16.3.3 @playwright/test@1.65.1 eslint@10.15.0 typescript-eslint@8.74.0 eslint-plugin-react-hooks@7.1.1 prettier@3.10.1`
  - Use `--save-exact`.
  - knip and size-limit are left out on purpose. They arrive with their configs in Phases 5 and 6.
  - Expected: `npm ls` reports no peer-dependency errors.
- [ ] **Step 3: `vite.config.ts`.**
  - `base: process.env.VITE_BASE ?? '/'`
  - The React plugin
  - Build inputs `{ main: 'index.html', classic: 'classic/index.html' }`. Use `build.rolldownOptions` if Vite 8 warns that `rollupOptions` is deprecated.
  - A Vitest `test` block with `environment: 'jsdom'` and `include: ['src/**/*.test.{ts,tsx}']`
- [ ] **Step 4: `tsconfig.json`.** One config covering `src`, `tests` and the root config files. Settings: `strict`, `noUncheckedIndexedAccess`, `jsx: react-jsx`, `moduleResolution: bundler`, `types: ["vite/client", "node"]`, `noEmit`.
- [ ] **Step 5: ESLint and Prettier.**
  - `eslint.config.js`: flat config with typescript-eslint `recommended` and react-hooks `recommended`. Ignore `dist`, `reference`, `playwright-report` and `test-results`.
  - `.prettierrc`: `{ "singleQuote": true, "printWidth": 100 }`.
  - `.prettierignore`: `docs`, `reference`, `*.md`, `src/content/portfolio.ts`, so the handoff files aren't reformatted.
- [ ] **Step 6: The two HTML entries.**
  - Each has `<html lang="en">`, the viewport meta, `<title>Mohini Chauhan, Senior Software Engineer (Frontend)</title>` (doc 07), `<div id="root">` and a module script pointing at its `main.tsx`.
  - `index.html` also has `<noscript><a href="./classic/">Open the classic view</a></noscript>` (doc 06).
- [ ] **Step 7: Styles.**
  - `tokens.css`: every token in doc 12's "Colours: UI" table as a CSS variable, plus `--font: 'Albert Sans Variable', system-ui, sans-serif` and the radii from "Shape and spacing".
  - `global.css`: imports the tokens, sets `margin: 0`, `font-family: var(--font)` and `:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }` (doc 08).
  - Both `main.tsx` files import `@fontsource-variable/albert-sans` and `../styles/global.css`, and render nothing yet.
- [ ] **Step 8: Verify.** Run `npm run lint && npm run typecheck && npm run build`.
  - Expected: all pass.
  - `dist/index.html` and `dist/classic/index.html` exist.
  - `npm run dev` serves blank pages at `/` and `/classic/` with no console errors.
- [ ] **Step 9: Verify the sub-path build.** Run `VITE_BASE=/portfolio/ npm run build && grep -o 'src="/portfolio/assets/[^"]*"' dist/index.html`. Expected: one match. Then run `npm run build` again to restore the default output.
- [ ] **Step 10: Commit.** Run `git add -A && git commit -m "Set up Vite, TypeScript, lint and two entries"`.

### Task 3: Content validation test

**Files:**
- Test: `src/content/portfolio.test.ts`

**Interfaces:**
- Consumes: every export of `src/content/portfolio.ts`.
- Produces: `npm run test:launch`, which fails while any content value still contains `TODO`.

- [ ] **Step 1: Write the tests** (doc 08, "portfolio.ts validation"). Put a small recursive string walker inside the test file.

```ts
describe('portfolio content', () => {
  it('has unique ids in every collection', ...);
  // stats, roles, workProjects, skillGroups, sideProjects: new Set(ids).size === ids.length
  it('links every role to real work projects', ...);
  // every roles[].workProjectIds[] is a workProjects id
  it('links every work project to a real role', ...);
  // every workProjects[].roleId is a roles id
  it('has no empty strings', ...);
  // walk every export; each string has .trim() !== ''
  it('uses valid hex for every colour', ...);
  // every value under a key named accent, onAccent, accentStrong or colour matches /^#[0-9A-F]{6}$/i
  it('has six tour steps', () => expect(tour).toHaveLength(6));
  it('reports TODO values', ...);
  // collect the paths of strings containing 'TODO'
  // if process.env.LAUNCH === '1': expect(todos).toEqual([])
  // otherwise: console.warn the list and pass
});
```

- [ ] **Step 2: Run it.** Run `npm run test`. Expected: 7 tests pass, with a warning that lists `links.email` and `links.linkedin`. If a test fails, the content has a real problem: report it to Mohini instead of changing `portfolio.ts`.
- [ ] **Step 3: Check launch mode.** Run `npm run test:launch`. Expected: FAIL on "reports TODO values", listing the same two paths.
- [ ] **Step 4: Commit.** Run `git add src/content/portfolio.test.ts && git commit -m "Add content validation test"`.

### Task 4: Playwright smoke test, PR checks, docs and the A1 pull request

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/smoke.spec.ts`, `.github/workflows/pr-checks.yml`, `README.md`
- Modify: `AGENTS.md`, `docs/10-implementation-plan.md`, `docs/06-architecture.md` (decision log)

**Interfaces:**
- Produces: a `collectConsoleErrors(page): string[]` helper exported from `tests/e2e/helpers.ts`. Task 7 reuses it.

- [ ] **Step 1: `playwright.config.ts`.**
  - `testDir: 'tests/e2e'`
  - `webServer: { command: 'npm run build && npm run preview -- --port 4173 --strictPort', url: 'http://localhost:4173', reuseExistingServer: !process.env.CI }`
  - `baseURL: 'http://localhost:4173'`
  - One Chromium project with `launchOptions.args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']` (doc 08)
  - Run `npx playwright install chromium`.
- [ ] **Step 2: Write the smoke tests.**

```ts
test('room page loads without console errors', async ({ page }) => {
  const errors = collectConsoleErrors(page); // console 'error' messages + pageerror
  await page.goto('/');
  expect(errors).toEqual([]);
});
test('classic page loads without console errors', ...); // same for '/classic/'
test('classic page loads no three.js', async ({ page }) => {
  // record the body text of every JS response while loading '/classic/'
  // expect none of them to contain 'WebGLRenderer'
});
```

- [ ] **Step 3: Run them.** Run `npm run test:e2e`. Expected: 3 passed.
- [ ] **Step 4: `pr-checks.yml`.**
  - Triggers on `pull_request`.
  - One job on `ubuntu-latest`: `actions/checkout`, then `actions/setup-node` with `node-version-file: .nvmrc` and `cache: npm`, then `npm ci`, `npm run lint`, `npm run typecheck`, `npm run test` and `npm run build`.
  - Use the action major versions from doc 09 (`@v7`), after confirming each with `gh api repos/actions/<name>/releases/latest --jq .tag_name`.
  - E2E and the size comment are added in Phases 5 and 6.
- [ ] **Step 5: Update the docs.**
  - `AGENTS.md`: under "Read these first", add `docs/13-learning-path.md: how we build it, one lesson at a time`. Change "At the end of each phase, stop" to "At the end of each step or lesson in `docs/13-learning-path.md`, stop".
  - `docs/10-implementation-plan.md`: tick Phase 0's boxes. Note that `check:size` and `check:unused` come in Phases 5 and 6. Under Phases 1 to 4, add one line saying which steps or lessons from doc 13 cover them: A2 and A3 cover Phase 1, lessons 1–7 cover Phase 2, lessons 8–13 cover Phase 3, lessons 14–18 cover Phase 4.
  - `docs/06-architecture.md` decision log: add 2026-11-24 rows for these decisions:
    - The learning path (doc 13).
    - The exact versions installed, with TypeScript 6.0.3 chosen because of typescript-eslint's `<6.1.0` peer range.
    - `postprocessing` added as a peer of `@react-three/postprocessing`.
    - knip and size-limit deferred to Phases 5 and 6.
    - Doc 08's `--launch` mode implemented as `LAUNCH=1` via `npm run test:launch`.
  - `README.md`: a title, one line on what the site is, and how to run it (`nvm use`, `npm ci`, `npm run dev`). Leave a note that the full README is written in Phase 6.
- [ ] **Step 6: Verify.** Run `npm run lint && npm run typecheck && npm run test && npm run build && npm run test:e2e`. Expected: all pass.
- [ ] **Step 7: Commit, push and open the PR.** Run `git add -A && git commit -m "Add e2e smoke tests, PR checks and docs for the learning path"`, then `git push -u origin a1-setup`, then `gh pr create --base v2 --title "A1: project setup" --body "<what changed, how to check it>"`. Expected: the PR checks go green.
- [ ] **Step 8: Stop.** Write Mohini a short summary covering what changed, how to check it (`npm run dev`, then open `/` and `/classic/`) and the TODOs found by the content test. Wait for her go-ahead, merge, then `git switch v2 && git pull`.

---

## Lesson 1 · First scene (branch `lesson-01-first-scene`)

### Task 5: Explain the ideas (before any code)

No files. This runs in chat with Mohini, following "How each lesson works" in doc 13.

- [ ] **Step 1: The three things every scene needs.**
  - A **scene**: the container for all the objects.
  - A **camera**: where you look from. A `PerspectiveCamera` has a field of view (52 in our seated view), an aspect ratio, and near and far limits.
  - A **renderer**: draws the scene from the camera into a `<canvas>`, every frame.
  - Show the prototype's plain three.js version: `reference/prototype/control-room.html` lines 163–169 (renderer, scene, camera) and 504–505 (the frame loop).
- [ ] **Step 2: A mesh is geometry plus material.**
  - Geometry is the shape, e.g. `BoxGeometry(w, h, d)`. Material is how the surface looks.
  - Show the prototype's `mesh()` and `M()` helpers (lines 171–172).
- [ ] **Step 3: How R3F maps to three.js.**
  - `<Canvas>` creates the scene, camera, renderer and frame loop for you.
  - `<mesh position={[x, y, z]}>` does `new THREE.Mesh()`, then `position.set(...)`, then `scene.add(...)`.
  - `<boxGeometry args={[1, 1, 1]} />` does `new THREE.BoxGeometry(1, 1, 1)`. `args` are the constructor arguments.
- [ ] **Step 4: Canvas setup basics.**
  - Device pixel ratio: a phone at ratio 3 draws 9× the pixels, so we cap it at 2. The prototype does the same on line 164.
  - Why we check for WebGL2 and send browsers without it to the Classic view.
  - OrbitControls are temporary and are removed in lesson 6.

### Task 6: WebGL2 check

**Files:**
- Create: `src/lib/webgl.ts`
- Test: `src/lib/webgl.test.ts`

**Interfaces:**
- Produces: `hasWebGL2(): boolean` and `classicFallbackUrl(base: string): string`, both exported from `src/lib/webgl.ts`.

- [ ] **Step 1: Branch.** Run `git switch -c lesson-01-first-scene`.
- [ ] **Step 2: Write the failing tests.**

```ts
describe('hasWebGL2', () => {
  afterEach(() => vi.restoreAllMocks());
  it('returns true when a webgl2 context is available', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as WebGL2RenderingContext);
    expect(hasWebGL2()).toBe(true);
  });
  it('returns false when getContext returns null', ...);   // mockReturnValue(null)
  it('returns false when getContext throws', ...);         // mockImplementation(() => { throw new Error('blocked'); })
});
describe('classicFallbackUrl', () => {
  it('builds the URL for the root base', () =>
    expect(classicFallbackUrl('/')).toBe('/classic/?reason=no-webgl'));
  it('keeps a sub-path base', () =>
    expect(classicFallbackUrl('/portfolio/')).toBe('/portfolio/classic/?reason=no-webgl'));
});
```

- [ ] **Step 3: Run them.** Run `npm run test -- src/lib`. Expected: FAIL, because the module isn't found.
- [ ] **Step 4: Implement both functions.** `hasWebGL2` creates a canvas, asks for `'webgl2'` inside a try/catch, and frees the test context with `gl.getExtension?.('WEBGL_lose_context')?.loseContext()`.
- [ ] **Step 5: Run them again.** Run `npm run test -- src/lib`. Expected: 5 passed.
- [ ] **Step 6: Commit.** Run `git add src/lib && git commit -m "Add WebGL2 check and classic fallback URL"`.

### Task 7: First scene on screen

**Files:**
- Create: `src/room/App.tsx`, `src/room/scene/Experience.tsx`, `src/room/scene/colors.ts`, `src/room/room.css`
- Modify: `src/room/main.tsx`, `src/content/portfolio.ts` (add `ui.canvasLabel`)
- Test: `tests/e2e/room.spec.ts`

**Interfaces:**
- Consumes: `hasWebGL2` and `classicFallbackUrl` (Task 6), `collectConsoleErrors` (Task 4).
- Produces:
  - `App(): JSX.Element` in `src/room/App.tsx`.
  - `Experience(): JSX.Element` in `src/room/scene/Experience.tsx`. Later lessons put all scene contents here.
  - `colors` in `src/room/scene/colors.ts`, `as const`, starting with `{ bg: '#0B1716' }`. Lesson 2 adds the doc 12 room colours.

- [ ] **Step 1: Write the failing e2e tests** in `tests/e2e/room.spec.ts`.

```ts
test('shows the 3D canvas', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto('/');
  await expect(page.getByRole('img', { name: ui.canvasLabel })).toBeVisible();
  await expect(page.locator('canvas')).toBeVisible();
  expect(errors).toEqual([]);
});
test('sends browsers without WebGL2 to the classic view', async ({ page }) => {
  // addInitScript: patch HTMLCanvasElement.prototype.getContext to return null for 'webgl2'
  // and call through to the original for every other context type
  await page.goto('/');
  await expect(page).toHaveURL(/\/classic\/\?reason=no-webgl$/);
});
test('fills a phone screen without scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  // canvas boundingBox is 390 × 844
  // document.documentElement.scrollWidth <= 390 and scrollHeight <= 844
});
```

- [ ] **Step 2: Run them.** Run `npm run test:e2e -- room`. Expected: FAIL. `ui.canvasLabel` doesn't exist and no canvas is rendered.
- [ ] **Step 3: Add the copy.** In `portfolio.ts`, add `canvasLabel: 'A 3D control room you can look around. Everything in it is something I’ve built or done.'` to `ui` (doc 08: the canvas has an `aria-label`).
- [ ] **Step 4: `colors.ts` and `Experience`.**
  - `<color attach="background" args={[colors.bg]} />`
  - A `<mesh position={[0, 0.5, 0]}>` with `<boxGeometry args={[1, 1, 1]} />` and `<meshNormalMaterial />`. The normal material colours each face by the direction it faces, so the shape reads in 3D without any lights. Lights come in lesson 3.
  - drei `<OrbitControls target={[0, 0.5, 0]} />`, commented as temporary until lesson 6.
  - Comment each line for a reader new to 3D.
- [ ] **Step 5: `App`.** Render `<Canvas dpr={[1, 2]} camera={{ fov: 52, position: [3, 2.5, 5], near: 0.05, far: 600 }} role="img" aria-label={ui.canvasLabel}>` containing `<Experience />`.
- [ ] **Step 6: Wire it up.**
  - `room.css`: `html, body, #root { height: 100%; }` and `body { background: var(--bg); overflow: hidden; }`.
  - `src/room/main.tsx`: if `!hasWebGL2()`, call `location.replace(classicFallbackUrl(import.meta.env.BASE_URL))`. Otherwise import `room.css` and render `<StrictMode><App /></StrictMode>`.
- [ ] **Step 7: Run all the checks.** Run `npm run lint && npm run typecheck && npm run test && npm run test:e2e`. Expected: all pass, including the 3 new room tests and the classic "no three.js" test.
- [ ] **Step 8: Commit.** Run `git add -A && git commit -m "Lesson 1: first scene with WebGL2 fallback"`.

### Task 8: Your turn, explain it back, note, pull request

- [ ] **Step 1: Mohini's turn.** She makes these changes herself while `npm run dev` is running, and watches what happens.
  1. Change the box to a slab: `args={[2, 0.5, 1]}` at `position={[0, 0.25, 0]}`.
  2. Swap `meshNormalMaterial` for `<meshBasicMaterial color="#FF7A59" />`. It goes flat. Ask her why. The answer: there's no light or shading yet, which is what lesson 3 is about.
  3. Optional: add a second mesh, a `<sphereGeometry args={[0.5, 32, 16]} />` at `x = 2`.
  Review her diff. Keep her changes. The box is replaced by the room in lesson 2 anyway.
- [ ] **Step 2: Explain it back.** Ask these one at a time and let her answer in her own words:
  1. What three things does every three.js scene need before anything shows on screen, and which part of our code creates each?
  2. A mesh is made of two things. What are they, and what would you change to turn the box into a ball?
  3. Why do we cap the device pixel ratio at 2, and what happens on a browser without WebGL2?
- [ ] **Step 3: Learning note.** Write `docs/learning/01-first-scene.md`. It is gitignored. It covers the ideas from Task 5 in a few lines each, the files that use them (`src/room/main.tsx`, `src/room/App.tsx`, `src/room/scene/Experience.tsx`, `src/lib/webgl.ts`) and her answers from Step 2.
- [ ] **Step 4: Push and open the PR.** Commit her Step 1 changes, then `git push -u origin lesson-01-first-scene` and `gh pr create --base v2 --title "Lesson 1: first scene" --body "<what changed, how to check it>"`. Expected: the PR checks go green.
- [ ] **Step 5: Stop.** Tell Mohini how to check it:
  - `npm run dev`, open `http://localhost:5173/`, drag to orbit the box.
  - `npm run test:e2e -- room` shows the no-WebGL redirect working.
  Wait for her go-ahead, merge, and stop. Lesson 2 gets its own plan.
