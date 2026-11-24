# 12 · Design tokens

Put these in `src/styles/tokens.css` as CSS variables, and mirror the 3D colours in a `src/room/scene/colors.ts` constant.

## Typography

- Family: **Albert Sans** (weights 400, 500, 600, 700, 800, 900), self-hosted
- Scale (UI): 12, 13, 14, 15, 17, 19, 24, 32, 44, 58 px
- Intro heading: 900, clamp(36px, 5.6vw, 58px), line-height 0.98, letter-spacing −0.035em
- Panel heading: 800, 25 px, line-height 1.1, letter-spacing −0.02em
- Panel section label: 700, 13 px, colour `--ink-muted`
- Body: 400 to 500, 14.5 to 17 px, line-height 1.5
- Big result: 900, 24 px

## Colours: UI

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0B1716` | Page background behind the canvas |
| `--ink` | `#F2F5F3` | Text on dark |
| `--ink-muted` (dark) | `#A9BDB8` | Secondary text on dark |
| `--ink-dark` | `#1A2A2A` | Text on light panels |
| `--ink-dark-muted` | `#4E625D` | Secondary text on light panels |
| `--glass-dark` | `rgba(12,26,26,.74)` + 18 px blur | Intro, tour, top chips, hint |
| `--glass-light` | `rgba(255,255,255,.88)` + 18 px blur | Panels |
| `--line-dark` | `rgba(255,255,255,.14)` | Borders on dark |
| `--line-light` | `rgba(0,0,0,.1)` | Dividers on light |
| `--gold` | `#FFD27A` | Primary buttons, tooltip, done chips, focus ring |
| `--on-gold` | `#2A1E00` | Text on gold |
| `--success` | `#1F8A5B` | Status lines, ticks |
| `--pending` | `#B7791F` | Pending status |
| `--fade` | `#F6F3EE` | Transition overlay |

## Colours: content accents

| Item | Accent | Strong / on-accent |
|---|---|---|
| Video package | `#FF7A59` | `#E0552F` |
| Provider onboarding | `#3FCF9E` | `#2FB386` |
| PR checks | `#7C8CFF` | `#5C6CF0` |
| IT company | `#F5C04A` | on `#3A2A00`, text-safe `#B98200` |
| HCL Technologies | `#F07A7A` | on `#FFFFFF` |
| Intellect | `#5CC9BA` | on `#063A33` |
| Open to work | `#4BE08A` | text `#E8FFF0` |
| Desk phone / scenic route | `#7CF0FF` | panel tag `#0E7C8C` |
| Toolbox tag | `#8E5BD0` | |
| Hello / contact | `#FFD27A` | tag `#C98B12` |

Skill group and side project accents are in `portfolio.ts`.

## Colours: room materials

| Part | Colour |
|---|---|
| Floor | `#14231F` |
| Walls | `#17302E` |
| Ceiling | `#0E1C1B` |
| Slats | `#2B4744` |
| Ceiling strips | `#FFE9C7` emissive `#FFE3B8` |
| Brass | `#C9A35B` (metalness 0.75, roughness 0.3) |
| Desk wood | `#5C3C27` (roughness 0.48) |
| Screen bezel | `#0A1212` |
| Screen background | `#0F1615` |
| Rack | `#0D1615` |
| Cork | `#B88B5B` in a `#2A1B10` frame |
| Diorama platform | `#E9E3DA` |

## Shape and spacing

- Radii: pills 999 px; panels 26 px; intro card 28 px; buttons 12 to 16 px; chips 999 px
- Panel padding 22 px; section gap 10 px with hairline dividers
- Top bar padding 16 × 20 px

## Motion

| Motion | Duration | Easing |
|---|---|---|
| Fly to seat | 1.1 s | ease-in-out cubic |
| Fly into screen | 0.95 s | ease-in-out cubic |
| Fade | 280 ms | linear |
| Panel slide | 500 ms | cubic-bezier(.2, .9, .2, 1) |
| Hover feedback | ~125 ms | exponential ease (rate 8/s) |
| Look easing | rate 3/s (tour 1.6/s) | exponential |
| Intro and tour bars | 300 to 600 ms | ease |

With reduced motion, all of the above become instant or a short crossfade.
