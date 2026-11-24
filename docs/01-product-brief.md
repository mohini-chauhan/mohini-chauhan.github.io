# 01 · Product brief

## What we're building

A personal portfolio for **Mohini Chauhan, Senior Software Engineer (Frontend)**, presented as a 3D control room that visitors explore in the browser.

- You sit at Mohini's desk, facing three big screens. Each screen is one of her biggest work projects. Click a screen and the camera flies into a bright 3D model of that project, with something to try.
- Everything else in the room is real content from her career: career badges on the wall, a toolbox rack of skills, a shelf of side projects, a desk with her numbers, a resume printer, a phone and a hello button.
- A **Classic view** gives the same content as a fast, normal web page for recruiters in a hurry, screen readers, search engines and devices without WebGL.

The prototype at `reference/prototype/control-room.html` shows the target experience. Screenshots are in `reference/screenshots/`.

## Why this concept

Mohini's strongest work is under NDA, so she can't show the real screens or code. Her old portfolio (`reference/old-portfolio/old-portfolio-screenshot.png`) listed skills and side projects as cards, which read as a page of UI elements. The control room instead turns each piece of real experience into an object you can interact with, and the build itself proves her frontend skill.

## Audience and what they need

| Visitor | Time they give it | What they need |
|---|---|---|
| Recruiter or hiring manager | 30 to 90 seconds | Who she is, seniority, open to work, the 3 projects and their impact, resume, contact |
| Engineer on a hiring panel | 3 to 10 minutes | How she thinks: problem, what she built, results, and a site that is well engineered |
| Curious visitor | Any | Something delightful to explore |

So the room must explain itself in the first 5 seconds (intro card), offer a guided tour, and always offer the Classic view.

## Her message

"I build the tools product teams build on: shared packages, automation and checks that make everyone faster."

The three work projects carry this:
1. **One hook for every video SDK**: a private package, about a month → a few weeks to add video to an app. She did the same for chat.
2. **Provider onboarding that runs itself**: 45 days → 15 days.
3. **A check on every pull request**: bundle size and unused assets checked automatically.

## Principles

1. **Everything in the room is real.** No decorative content that isn't backed by `src/content/portfolio.ts`.
2. **Explain before you impress.** Intro card, map of the room, guided tour, tooltips and a persistent hint.
3. **Show, then tell.** Each project has an interactive demo next to Problem, What I built and Result.
4. **Never trap anyone.** Classic view link always visible. Esc and a Back button always work. Keyboard and screen reader access to every hotspot.
5. **Fast and calm.** It should load quickly, run smoothly on a mid-range laptop and phone, and avoid flashy effects that don't carry meaning.

## In scope for launch

- The control room with every object in `docs/03-control-room-scene.md`
- The three project dioramas in `docs/04-project-dioramas.md`
- Intro, guided tour, panels, tooltips, area chips and hotspot menu (`docs/05-ui-and-interaction.md`)
- Classic view (`docs/07-classic-view.md`)
- Accessibility, performance and tests (`docs/08-quality-bar.md`)
- CI with PR checks and deployment to GitHub Pages (`docs/09-deployment-and-ci.md`)

## Later (not for launch)

- **"Connect the call" flight.** Picking up the desk phone launches a 3D flight through her career. A prototype exists at `reference/prototype/connect-the-call.html`. For launch, the phone opens a panel saying the scenic route is coming soon, or links to the prototype if Mohini prefers (see open questions).
- Custom 3D models from Blender to replace the simple shapes
- Optional ambient sound with a mute toggle
- Deep links that open a specific panel, such as `/#project/video-package`

## Success measures

- A recruiter can find the resume and contact in under 15 seconds, from either view
- Lighthouse 95+ on the Classic view in all four categories; 90+ performance on the 3D page's first load
- 60 fps on a mid-range laptop, 30+ fps on a mid-range Android phone
- Zero console errors; works in current Chrome, Edge, Safari and Firefox
