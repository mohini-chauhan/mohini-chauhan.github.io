# Instructions for the coding agent

You are building Mohini Chauhan's new portfolio: a 3D "control room" that visitors explore in the browser, plus a fast, accessible Classic view. A working single-file prototype already exists. Your job is to rebuild it as a production codebase in React, TypeScript and React Three Fiber.

## Read these first, in this order

1. `docs/01-product-brief.md`: what the site is for and who it's for
2. `docs/10-implementation-plan.md`: the phases you will work through, with checklists
3. `docs/06-architecture.md`: stack, folder structure, state and conventions
4. `src/content/portfolio.ts`: all content. Never hard-code copy anywhere else.
5. `reference/prototype/control-room.html`: the working prototype. Open it in a browser. When a spec is unclear, match the prototype's behaviour.
6. `docs/13-learning-path.md`: how we build it, one lesson at a time
7. Then read the rest of `docs/` as each phase needs it.

## How to work

- Work one phase at a time from `docs/10-implementation-plan.md`. At the end of each step or lesson in `docs/13-learning-path.md`, stop. Summarise what changed, tick the boxes in the plan, and tell Mohini exactly how to check it in the browser. Wait for her go-ahead before starting the next step or lesson.
- Keep the docs true. If you change a decision, update the doc in the same change and note it in the "Decision log" at the bottom of `docs/06-architecture.md`.
- When something isn't decided, check `docs/11-open-questions.md`. Use the default listed there and carry on. Don't block on it.
- Prefer small, reviewable commits with clear messages.

## Stack (verified November 2026, re-check before installing)

- Node 22 LTS (Vite 8 needs Node 20.19+ or 22.12+)
- Vite 8, React 19.3, TypeScript 6.0 (not 7.x: typescript-eslint doesn't support 7 yet)
- three 0.187, @react-three/fiber 9.8 (needs React 19.0 to 19.3), @react-three/drei 10.7, @react-three/postprocessing 3.2
- zustand 5 for app state
- Vitest 5 and Playwright 1.65 for tests; knip and size-limit for PR checks
- Fonts: Albert Sans, self-hosted via `@fontsource-variable/albert-sans` or `@fontsource/albert-sans`

If a peer-dependency range has moved, pick versions that satisfy every peer range and record what you chose in the decision log.

## Commands (create these scripts in Phase 0)

```
npm run dev          # local dev server
npm run build        # production build to dist/
npm run preview      # serve the build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest
npm run test:e2e     # playwright
npm run check:size   # size-limit
npm run check:unused # knip + scripts/check-unused-assets.mjs
```

## Rules

**Content and honesty**
- All copy and numbers come from `src/content/portfolio.ts`. Don't invent stats, testimonials, company names, dates or links.
- Leave anything marked `TODO(mohini)` visible as a TODO in the code, and list it in your phase summary. Don't fill it with made-up values.
- Sample data in demos (PR numbers, bundle sizes, provider names A, B and C) must stay labelled as sample data.
- The three work projects are under NDA. Never name the real video SDKs, internal tools or clients, and never imitate a real company's UI.

**Writing style for any UI text you add**
- Sentence case everywhere. Plain, friendly English. Verb-first buttons ("Download resume", not "Resume download").
- No exclamation marks, no emoji, no "successfully", no "please".

**Code**
- TypeScript strict mode. No `any` without a comment explaining why.
- Panels, buttons, tooltips and menus are DOM (React) on top of the canvas, never drawn in 3D. This keeps them accessible.
- Every 3D hotspot must also be reachable from the keyboard through the hotspot menu (see `docs/05-ui-and-interaction.md`).
- Respect `prefers-reduced-motion` everywhere (see `docs/08-quality-bar.md`).
- Dispose of textures, geometries and materials you create by hand. Lazy-load the project dioramas.
- No third-party trackers or analytics unless Mohini asks.

## Definition of done for every phase

- `npm run lint`, `typecheck`, `test` and `build` pass with no warnings you introduced
- The phase's acceptance criteria in `docs/10-implementation-plan.md` are met and ticked
- It works at 1440 × 900 and at 390 × 844 (phone portrait)
- Keyboard-only and reduced-motion checks pass for anything you touched
- You've written the phase summary for Mohini
