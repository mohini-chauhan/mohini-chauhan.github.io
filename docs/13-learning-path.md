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
- **F2 · "How this site was built".** A notebook on the desk opens a panel that shows the spec → plan → lessons → PRs story and links to `docs/` in the repo. It backs the "AI-first, spec-driven" line on her resume. Needs the repo to be public (Q12).

## Content changes (step A2)

`portfolio.ts` disagrees with Mohini's May 2026 resume (`~/Documents/Personal/bun_test/Mohini_Chauhan_Resume.md`):

| Item | `portfolio.ts` | Resume |
|---|---|---|
| Onboarding result | 45 days → 15 days | nearly a month → about 2 weeks (≈50%). **Settled 24 Nov 2026: 45 → 15 is correct.** The site keeps it as is; the resume line should be updated to match (45 → 15 is a 67% cut, not ≈50%). |
| Video package result | about a month → a few weeks | integration time cut by 80%, used in 5+ repos |
| First company | IT company, Jan 2019 to Oct 2021 | Confidential (NDA), Jan 2019 to Dec 2021 |
| HCL | Software Engineer, Oct 2021 to Mar 2023 | Senior Software Engineer, Dec 2021 to Apr 2023 |
| Intellect start | Mar 2023 | Apr 2023 |
| Apps built | 20+ | 10+ |
| Component library | 60% faster dev cycles | 2 weeks → 5 days |
| LinkedIn | TODO | linkedin.com/in/mohinii |
| Years of experience (Q3) | 6+ | 6+, but Jan 2019 to now is nearly 8 years. **Settled 24 Nov 2026: 7+.** Also change the stats panel heading to "Seven years in numbers" (doc 05) and Q3's answer in doc 11. |
| People led | 5+ people led | mentored 5 (HCL) and mentored juniors (Intellect). **Settled 24 Nov 2026: "5+ people mentored".** |
| "Ship 15+ enterprise features a year" (Intellect) | present | not on the resume. **Settled 24 Nov 2026: drop it.** |
| PR checks: what they do | bundle size, unused assets | also dead code and build time, posted as PR comments |

A2 is a full line-by-line check of `portfolio.ts` against the resume. The table above is what that check found on 24 November 2026; any row found later goes to Mohini the same way. `durationLabel` is computed from `start` and `end` instead of hard-coded, so it never goes stale. *(My call.)*

Mohini decides which value is true for each row. Then `portfolio.ts`, the diorama copy (onboarding board "Day N" and "45/15" labels, doc 04) and the screen painters (doc 03) are updated to match, and `docs/11-open-questions.md` is updated for Q2, Q4 and Q5.

Gaps to fill, wording to be approved by Mohini (doc 02 says ask before rewording):
- Testing group `usedIn`: Playwright end-to-end suites, 85% coverage. Add Playwright to its tools.
- A new skill group "Observability": Sentry, Core Web Vitals, Mixpanel. This adds a 9th toolbox unit. The rack in doc 03 fits 8 (a 9th at y 4.02 would hit the "Toolbox" label at y 4.2), so the builder adjusts unit spacing or rack height in lesson 11 and updates doc 03.
- State management tools: add TanStack Query and Redux-Saga, which are on the resume.
- Billing and account setup automation, folded into the onboarding project (its "Setup" gate).
- Design system adopted across teams, +25% delivery speed, as an Intellect highlight.
- End-to-end ownership of whole journeys, which her resume leads with, reflected in the bio or tagline.

## Open decisions for Mohini

Until answered, use the default (AGENTS.md: don't block).

| # | Decision | Default until answered |
|---|---|---|
| 1 | Which value is true for each remaining row in the content table (onboarding is settled). Asked again at the start of A2, row by row, since the onboarding answer shows the resume isn't right everywhere. | Keep `portfolio.ts` as is, rows stay `TODO(mohini)` |
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
