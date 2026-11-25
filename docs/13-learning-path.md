# 13 · Learning path

How we build the control room so that Mohini ends up understanding every line of the 3D code. This doc changes the *order and pace* of `docs/10-implementation-plan.md`. It doesn't change what gets built, except for the content fixes and the extras marked below.

## Why

Mohini hasn't worked with 3D before and wants to understand the 3D code herself, not end up with a site an agent built that she can't explain. Engineers on a hiring panel are one of the three audiences (doc 01). They may ask "how does the camera fly in?" or "why is this instanced?", and she should be able to answer.

## Goals

- Mohini can read, change and explain every 3D file in the repo.
- The finished site matches the handoff spec (docs 01 to 12).
- Every session ends with something visible in the browser and something she can explain.
- The site's content matches her current resume.

## Non-goals

- Becoming a general 3D or graphics expert. We learn what this room needs.
- Speed. This takes more sessions than building it all in one go, and that's accepted.
- The items under "Later" in doc 01: the connect-the-call flight, GLB models, sound and deep links.

## Anti-goals (failure even if the site works)

- 3D code she can't explain line by line.
- Copying the prototype into React without understanding it.
- Numbers on the site that disagree with her resume.
- Lessons that pile on too many new ideas at once. Aim for no more than three new 3D ideas per lesson.

## Approaches considered

| | Approach | Trade-off |
|---|---|---|
| A | Follow doc 10's phases as written, with explanations | Least extra work, but Phase 2 alone brings in lights, environment maps, tone mapping, bloom, 20+ meshes, camera math and the store all at once. Too much for a first 3D project. |
| B | Learn in a throwaway sandbox first, then build | Clean learning, but the sandbox work gets thrown away and the real room still has to be built. |
| **C** | **Grow the real room one idea at a time** | **Chosen.** Same end result as the spec, split into small lessons inside the real project. It takes more sessions, and every one moves the portfolio forward. |

Mohini picked C: "create the room, then add the different elements".

## How each lesson works

1. **Idea first.** A short explanation of the new 3D ideas in chat, with a small diagram where it helps. Each idea is shown both ways: how the prototype does it in plain three.js (`reference/prototype/control-room.html`) and how it looks in React Three Fiber. Knowing both is what makes the R3F code explainable.
2. **Build.** Lessons 1 to 4: I write the code in small, commented pieces. From lesson 5: Mohini writes first, I review. For repeated objects (badges, toolbox units, shelf boxes) she writes and I review.
3. **Your turn.** One small change she makes herself, e.g. "add the mug at desk-local (−3.2, 1.03, 4.2)" or "make the key light come from the left and see what happens to the shadows".
4. **Explain it back.** Two or three interview-style questions about what we just built, answered in her own words.
5. **Learning note.** A short `docs/learning/NN-<topic>.md`: what the ideas are, which files use them, and her explain-back answers. Together these become her interview prep for the 3D side. `docs/learning/` is gitignored, because the repo is public (Q12) and her interview answers shouldn't be readable by interviewers. Publishing them later is a deliberate choice; un-publishing isn't possible once they're in git history. *(My call.)*
6. **Stop.** The lesson's PR passes its checks. I say how to check it in the browser and wait for her go-ahead before merging and starting the next lesson. This is stricter than AGENTS.md's stop-per-phase, on purpose.

## Where the work happens

- **This repo**, `mohini-chauhan/mohini-chauhan.github.io`, under Mohini's personal account `mohini-chauhan` *(Mohini, 24 Nov 2026)*. The handoff was copied in without `reference/`. `reference/` stays on disk but is gitignored, and `mohini-prototypes-v2/` is never committed or pushed *(Mohini, 24 Nov 2026)*.
- **Branches.** `v1` is a backup of the old site's `main`. `v2` holds the new site. Each step and lesson is one branch and one pull request into `v2`. At launch, `v2` merges into `main` *(Mohini, 24 Nov 2026)*.
- **The old site stays live until launch.** It's served from the `gh-pages` branch and only changes when `npm run deploy` runs, so nothing new is deployed before Phase 6 *(Mohini, 24 Nov 2026)*.
- **Public from the first push**, because this repo is public. Commits use the repo-local author `mohini <chauhanmohini18@gmail.com>` *(Mohini, 24 Nov 2026)*, never the work email from the global git config. A1 adds a minimal `pr-checks.yml` (lint, typecheck, unit tests, build, e2e tests). The sticky PR comment with sizes and unused assets comes in Phase 6, as doc 09 says. Reason: a real PR history can't be rebuilt later, and it keeps Part F possible. It also lets Mohini see her own project 3 working on her own code from week one. *(My call.)*
- `profile/` (the older Bun rewrite) is left untouched and not reused. Nothing from `profile/public/resume/` is carried over, because it holds someone else's resume.

## The path

### Part A · Foundations (I build, Mohini reviews)

Normal React that Mohini already knows, so we keep it quick and save the slow, careful time for 3D.

| Step | What | Maps to |
|---|---|---|
| A1 | Project setup | Phase 0 |
| A2 | **Content fix**: make `portfolio.ts` agree with the resume (see "Content changes" below) | New |
| A3 | Classic view | Phase 1 |

### Part B · The room (Phase 2)

| Lesson | You'll see | New ideas |
|---|---|---|
| 1 · First scene | One box on screen that you can orbit around | Scene, camera, renderer; a mesh is geometry + material; how R3F JSX maps to three.js classes. Also canvas setup basics: DPR cap, WebGL check and redirect. |
| 2 · Floor, walls, ceiling | An empty room | Scene units and axes (doc 03), position and rotation in radians, planes only face one way, colours from `colors.ts` |
| 3 · Light and look | The room looks warm and real instead of flat or black | Hemisphere and directional lights, shadows, `RoomEnvironment` + PMREM, tone mapping and exposure, roughness and metalness |
| 4 · Details and glow | Slats, brass rail, glowing ceiling strips, the night-city window | Instancing (slats), emissive materials, bloom, a first canvas texture (window) and disposing of it |
| 5 · The desk *(Mohini writes first)* | Desk segments, keyboard, nameplate, mug, plant | Groups and local coordinates (doc 03's "desk-local" positions), 3D text |
| 6 · Looking around | Seated view; mouse and touch look; portrait camera on phones | `useFrame`, delta time, exponential easing, yaw and pitch maths, FOV and aspect |
| 7 · Arriving | Intro drift, fly to the seat | Zustand store and the `mode` model (doc 05), animating over time with easing curves, reduced motion |

### Part C · Things you can click (Phase 3)

| Lesson | You'll see | New ideas |
|---|---|---|
| 8 · First hotspot, end to end | The hello button glows on hover and opens the contact panel | Pointer events and raycasting, hover feedback, cursor and tooltip, the hotspot registry, panel state in the store, DOM over canvas, focus and Esc |
| 9 · Desk hotspots | Stats display, photo frame, Lighthouse dial sweep, blinking phone, resume printer | Reusing one photo texture, animating a single value (needle, paper), canvas-drawn displays |
| 10 · The wall | Open to work sign, career board, three swinging badges, role panels | Turning data into objects (`roles.map`), per-badge canvas textures |
| 11 · Toolbox | Rack and 8 sliding units with blinking LEDs, skill panels | Instancing for LEDs, slide-out hover |
| 12 · Shelf | 6 side project boxes, side project panels | Practice: same patterns, Mohini on her own |
| 13 · UI around the room | Top bar, area chips, hotspot menu, intro card, tour, hint | Mostly React, so I build more. The 3D part for Mohini: working out the yaw and pitch that face a given object |

### Part D · Screens and dioramas (Phase 4)

| Lesson | You'll see | New ideas |
|---|---|---|
| 14 · Live screens | The three big screens animate | Canvas painters redrawn about 15 times a second, `texture.needsUpdate`, porting `drawScreens()` |
| 15 · Into the screen and back | Fly in, fade, the shared diorama stage, Back and Esc | Switching scenes by mode, lazy loading, gradient sky sphere, OrbitControls with limits, reduced-motion crossfade |
| 16 · Video diorama | Pillars, hook, phones, pulses; both demo actions; project panel | Curves and tubes, moving objects along a path |
| 17 · Onboarding diorama *(Mohini writes most)* | Conveyor, gates, token, day board, toggle | Moving along a line with stops, a small state machine driven by time |
| 18 · PR checks diorama *(Mohini writes most)* | Gate, PR boxes, pass and fail paths, idle auto-send; role panel buttons that fly into dioramas | A queue of moving objects, branching animations |

### Part E · Polish and ship (Phases 5 and 6)

Most of Phase 5's performance and accessibility work is already built into the lessons above: instancing in 4 and 11, disposal in 4, DPR in 1, reduced motion in 7 and 15. So Phase 5 becomes a check-and-fix pass plus the Playwright suite. Phase 6 is unchanged.

### Part F · Extras *(my proposal, after Part E)*

These make the site prove its own claims. Both depend on Phase 6's CI being in place. Whether to do them is decided after Part E. The PR-per-lesson setup keeps them possible either way.

- **F1 · Real numbers from this repo.** Shown **next to** the Intellect claims, never in place of them. The dial keeps "At Intellect, 50 → 90", and the PR-checks diorama keeps modelling her Intellect project with its buttons and sample data. A separate, clearly labelled "This site's own checks" readout (in the Lighthouse and PR-checks panels) shows this repo's real bundle size and Lighthouse score. Data is written to a JSON file at build time, so there are no runtime network calls (doc 06, decision 7). *(My call, so the meaning of no claim changes, per doc 02.)*
- **F3 · "Check your own PR"** *(Mohini's idea, 25 Nov 2026)*. Visitors give a PR and see its metrics. To be brainstormed on its own after A2. Limits: a browser can't build someone else's code, doc 06 decision 7 forbids runtime network calls, and GitHub limits anonymous requests. A reusable GitHub Action, written from scratch, is one option.
- **F2 · "How this site was built".** A notebook on the desk opens a panel that shows the spec → plan → lessons → PRs story and links to `docs/` in the repo. It backs the "AI-first, spec-driven" line on her resume. Needs the repo to be public (Q12).

## Content changes (step A2)

A2 checked `portfolio.ts` line by line against Mohini's latest resume (the PDF in `public/resume/`, updated 24 Nov 2026). Mohini decided each row on 24 and 25 Nov 2026:

| Item | Was | Now |
|---|---|---|
| Email, LinkedIn, GitHub (Q5) | TODO | `chauhanmohinii18@gmail.com`, `linkedin.com/in/mohinii`, `github.com/mohini-chauhan` |
| Years of experience (Q3) | 6+ | 7+. The stats panel heading is "Seven years in numbers" (doc 05). |
| Apps built | 20+ | 10+ (stat and first-company highlight) |
| People | 5+ people led | 5+ people mentored |
| First company (Q4) | IT company | Still "IT company" |
| Dates (Q2) | to Oct 2021; Oct 2021 to Mar 2023; from Mar 2023 | Jan 2019 to Dec 2021; Dec 2021 to Apr 2023; from Apr 2023 |
| HCL title | Software Engineer | Senior Software Engineer |
| Component library | 60% faster dev cycles | New features in 5 days, not 2 weeks |
| Intellect highlights | 2 to 3 projects; Lighthouse; 15+ features a year | Tech lead on 3+ projects serving 100K+ users; Lighthouse 50 to 90; whole platform moved to Tailwind CSS; automated test coverage 50% to 80%+; design system adopted across teams, 25% faster delivery. "15+ features a year" is dropped (a 2025 number). |
| Video package result | About a month → a few weeks | Integration time cut by 80%, used in 5+ repos |
| Onboarding result | 45 days → 15 days | Unchanged (settled 24 Nov 2026) |
| PR checks | Bundle size and unused assets; "Every PR, checked automatically" | Bundle size, build time, unused files and dead code (knip), posted as a PR comment. Result: "Unused files: 400+ → 12". |
| Toolbox | 8 groups | Adds Playwright (Testing), Redux-Saga and TanStack Query (State), knip (Build tools) and a 9th group, Observability (Sentry, Mixpanel, Core Web Vitals). Lesson 11 makes room for the 9th unit on the rack (doc 03). Tools not on the resume stay: Mohini can explain them. |

- Role durations are computed from `start` and `end` by `formatDuration` (`src/lib/format.ts`), so they never go stale.
- Never name Mohini's Intellect projects or internal tools.
- Dropped from the earlier gap list, because the latest resume doesn't have them: billing and account setup automation, and "end-to-end ownership" in the bio.

**Resume follow-ups for Mohini** (the site is now ahead of the resume): 7+ years, the onboarding project (45 → 15 days), and the 2026 work (Tailwind migration, test coverage 50% to 80%+, unused files 400+ to 12).

## Open decisions for Mohini

Until answered, use the default (AGENTS.md: don't block).

| # | Decision | Default until answered |
|---|---|---|
| 1 | ~~Which value is true for each content row.~~ **Settled 24 and 25 Nov 2026** (see "Content changes"). | — |
| 2 | ~~Whether to name the internal tools.~~ **Settled 24 Nov 2026:** never name them. Call them the video SDK package and the chat SDK package. | — |
| 3 | ~~Whether there's a date something must be live by.~~ **Settled 24 Nov 2026:** keep the old site live until the new one launches. No early release. | — |
| 4 | After Part E: whether to do the extras in Part F. | Decide then |

## Left to the builder

- Exact lesson boundaries can flex if a lesson runs long or short. Keep the order.
- The wording of explanations, diagrams and the "your turn" exercises.
- Tests follow doc 08, and each lesson adds tests for any logic it introduces (store transitions, camera maths helpers, the registry).
- Re-check package versions at install time (doc 06).

## Docs to update when building starts

- `docs/10-implementation-plan.md`: add the lessons under each phase.
- `AGENTS.md`: point to this doc and change "stop at the end of each phase" to "stop at the end of each lesson".
- `docs/06-architecture.md` decision log: one entry for this learning path.
