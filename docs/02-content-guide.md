# 02 · Content guide

All content lives in `src/content/portfolio.ts`. This doc explains where each piece shows up and the rules for using it.

## Where content appears

| Content | Control room | Classic view |
|---|---|---|
| `profile` (name, title, bio, photo) | Intro card, nameplate, photo frame, about panel, contact panel, career badges | Header and about section |
| `profile.availability` | Open to work sign above the screens | Status chips in the header |
| `links` | About, contact and resume panels | Header buttons and footer |
| `stats` | Stats display on the desk; stats panel | Numbers row |
| `roles` | Career badges on the right wall; role panels | Experience timeline |
| `workProjects` | The three big screens; dioramas; project panels | Work section, one case study each |
| `skillGroups` | Toolbox rack units; toolbox panels | Toolbox section (no ratings) |
| `sideProjects` | Boxes on the shelf; side project panels | Side projects grid |
| `lighthouse` | Dial on the desk; Lighthouse panel | Inside the Intellect role |
| `tour` | Guided tour steps | Not used |
| `ui` | All fixed UI text | Shared labels where relevant |

## Rules

- **Never hard-code copy in components.** Import from `portfolio.ts`. If you need new text, add it there first.
- **Don't change the meaning of any claim.** You can shorten for space only if the short version is still true. Ask before rewording a highlight.
- **No skill ratings.** The old site had "Testing 6/10" style scores. They are deliberately removed. Show tools and where they were used instead.
- **Sample data stays labelled.** The PR demo uses sample PR numbers and sizes. Providers are "Provider A, B and C", never real SDK names.
- **TODOs stay visible.** Placeholder links (`TODO@example.com`, `linkedin.com/in/TODO`, side project `url: null`) must render as obviously unfinished in development. In production builds, hide a link whose value still contains `TODO`, and hide "Open the project" when `url` is null.
- **Templated statuses.** Some action statuses contain `{provider}`. Replace it with the current provider letter.

## Copy style

- Sentence case for everything, including headings and buttons.
- Plain, friendly English. Short sentences. Mohini speaks in the first person ("I built…").
- Buttons start with a verb: "Download resume", "Email me", "Switch provider".
- No exclamation marks, emoji, "successfully" or "please".
- Use "→" for before/after results, as in "45 days → 15 days".

## Images

- `public/images/mohini-photo.jpg` is a **low-resolution placeholder** cropped from a screenshot of the old site. Mohini will supply an original. Design for a square image and crop it to a circle in the UI.
- The photo appears on the intro card, career badges, photo frame on the desk, and the about and contact panels. Load it once and reuse the same texture in 3D.

## Interview-proofing

Mohini should be able to explain every number on the site in one sentence. If a number is ever removed from `portfolio.ts`, remove it everywhere. Don't keep stale copies.
