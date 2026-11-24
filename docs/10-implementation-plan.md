# 10 · Implementation plan

Work through the phases in order, in the steps and lessons from `docs/13-learning-path.md`. At the end of each step or lesson: tick the boxes, run the checks in `AGENTS.md`, write a short summary for Mohini with how to check it in the browser, and **wait for her go-ahead**.

## Phase 0 · Project setup

- [x] Scaffold Vite + React + TypeScript in this folder without overwriting `AGENTS.md`, `CLAUDE.md`, `docs/`, `reference/`, `src/content/portfolio.ts` or `public/images/`
- [x] Install the stack from doc 06; record exact versions in the decision log
- [x] Multi-page Vite config with `index.html` and `classic/index.html`; `base` from `VITE_BASE`
- [x] TypeScript strict, ESLint with typescript-eslint, Prettier
- [x] Scripts from `AGENTS.md`; Vitest and Playwright configured; one passing test each (`check:size` and `check:unused` arrive with their configs in Phases 5 and 6)
- [x] `src/styles/tokens.css` from doc 12; Albert Sans self-hosted
- [x] Content validation test for `portfolio.ts` (doc 08)
- [x] Repo `README.md` stub, `.gitignore`, `.nvmrc` (22)

**Done when**: `npm run dev` serves a blank page at `/` and `/classic/`, and lint, typecheck, test and build all pass.

## Phase 1 · Classic view

Doc 13 steps A2 (content fix) and A3 (Classic view).

- [ ] All sections in doc 07, built from `portfolio.ts`
- [ ] Responsive, light and dark themes, print styles
- [ ] Meta tags, Open Graph, JSON-LD
- [ ] `?reason=no-webgl` note

**Done when**: Lighthouse 95+ in all four categories on a production build, and nothing from three.js is in the classic bundle.

## Phase 2 · Room shell and camera

Doc 13 lessons 1 to 7.

- [ ] Canvas, `RoomEnvironment`, lights, tone mapping, bloom (doc 03)
- [ ] Floor, walls, ceiling strips, slats, rail, window
- [ ] Desk segments and non-interactive props (keyboard, nameplate, mug, plant)
- [ ] Camera states: intro drift, fly to seat, seated mouse look and touch look, portrait settings
- [ ] Zustand store with the mode model (doc 05)
- [ ] WebGL check and redirect

**Done when**: the room matches screenshot `02-tour-step-1.png` closely at 1440 × 900, looking around feels like the prototype, and phones get the portrait camera.

## Phase 3 · Hotspots, panels and UI

Doc 13 lessons 8 to 13.

- [ ] Hotspot registry and `<Hotspot>` with hover feedback (doc 03) and tooltip
- [ ] Open to work sign, career board and badges, toolbox rack and units, side project shelf and boxes
- [ ] Desk hotspots: stats display, photo frame, Lighthouse dial (with sweep), desk phone, hello button, resume printer (with animation)
- [ ] Panel component and every panel type except Project (doc 05)
- [ ] Top bar with area chips and Classic view link
- [ ] Hotspot menu with full keyboard support
- [ ] Intro card, hint, guided tour
- [ ] Focus management, Esc behaviour

**Done when**: every object in doc 03 opens the right panel by mouse, touch and keyboard; the tour runs; chips fill; matches screenshots `09` to `17`.

## Phase 4 · Live screens and dioramas

Doc 13 lessons 14 to 18.

- [ ] Three screens with live canvas content (doc 03)
- [ ] Fly-in, fade, diorama, back (doc 04), including reduced-motion crossfade
- [ ] Shared diorama stage
- [ ] Video diorama with both actions
- [ ] Onboarding diorama with the toggle
- [ ] PR checks diorama with both actions and idle auto-send
- [ ] Project panels with demo actions and status lines
- [ ] Role panel "Projects from this role" buttons fly into the right diorama
- [ ] Dioramas lazy-loaded

**Done when**: all three match screenshots `18` to `20` and `24`, every action works, and Back or Esc always returns to the seat.

## Phase 5 · Phones, accessibility and performance

- [ ] Phone layout checks at 390 × 844 for intro, room, panels (bottom sheet) and dioramas
- [ ] Reduced-motion pass (doc 08)
- [ ] Screen reader pass on panels, menu and tour
- [ ] PerformanceMonitor, DPR cap, pause when hidden, instancing, disposal
- [ ] Budgets met (doc 08); size-limit config committed
- [ ] Playwright suite from doc 08

**Done when**: all budgets and the whole e2e suite pass, and manual checks on a real phone feel smooth.

## Phase 6 · CI and launch

- [ ] `deploy.yml` and `pr-checks.yml` (doc 09), including the sticky PR comment
- [ ] `check-unused-assets.mjs`
- [ ] robots, sitemap, 404, OG image
- [ ] Repo README with screenshots and "How it's built"
- [ ] Every `TODO(mohini)` resolved or explicitly accepted by Mohini
- [ ] Deployed to the project-site URL and checked

**Done when**: a test PR shows the bot comment with sizes and unused assets, `main` deploys automatically, and Mohini signs off.

### Deferred from the A1 code review (24 Nov 2026)

Mohini chose to handle these at the end.

- [ ] `npm run test:launch` also fails on `TODO(mohini)` code comments, not only on string values
- [ ] Darken `--success` and `--pending` so status text passes AA on `--glass-light`
- [ ] `.prettierignore`: add `mohini-prototypes-v2`, `.claude` and `public`; format `playwright.config.ts` and `portfolio.test.ts`; run `prettier --check` in CI
- [ ] Content test: check that `lighthouse.roleId` resolves
- [ ] Compute `durationLabel` from `start` and `end` (also planned in A2)
- [ ] Add a `sampleDataNote` to the video package demo (providers A, B and C are sample names)
- [ ] Split `tsconfig.json` into browser (`vite/client`) and Node configs
- [ ] Bring `CLAUDE.md`, `.github/copilot-instructions.md`, `START-HERE.md` and doc 13 in line with stopping per lesson and the gitignored `reference/`

## Later

- [ ] "Connect the call" flight from the desk phone (`reference/prototype/connect-the-call.html`)
- [ ] Custom GLB models for room and dioramas (compressed with meshopt or Draco, KTX2 textures)
- [ ] Ambient sound with a mute toggle
- [ ] Deep links such as `/#project/video-package`
