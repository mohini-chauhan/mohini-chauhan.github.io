# 03 · Control room scene

This is the spec for the room. Numbers are starting values taken from the prototype (`reference/prototype/control-room.html`), in scene units (roughly metres). Match the prototype first, then refine by eye. Screenshots: `reference/screenshots/02-*` to `08-*`.

Axes: +X is right, +Y is up, −Z is toward the screens (away from the visitor).

## Shell

| Part | Spec |
|---|---|
| Floor | 18 × 16 plane, centre (0, 0, 1), colour `#14231F`, roughness 0.42, metalness 0.1 |
| Back wall | 18 × 7 at z = −6.6, colour `#17302E` |
| Side walls | 16 × 7 at x = ±9, same colour |
| Ceiling | at y = 7, colour `#0E1C1B`, three light strips (0.16 × 10) at x = −4, 0, 4, emissive `#FFE3B8` |
| Wall slats | vertical 0.08 × 6.4 × 0.28 slats every 0.62 along both side walls, colour `#2B4744`. Leave a gap on the left wall for the window (z from −3.4 to 4.6). |
| Brass rail | along the back wall at y = 0.7, colour `#C9A35B`, metalness 0.7 |
| Window | left wall, centre (−8.85, 3.75, 1.6), 5.6 × 2.6, dark frame with two mullions. Shows a night city at dusk (a painted canvas texture in the prototype). |

## Lighting and rendering

- Hemisphere light `#BFE3DA` / `#1A1410`, intensity 0.5
- Key directional light `#FFE3C2`, intensity 0.9, from (3, 6, 6), soft shadows, 1024 map
- A point light in front of each screen in the screen's accent colour, intensity 14 (24 on hover), distance 10
- Warm desk lamp point light `#FFD8A8` at desk-local (−2.4, 2.2, 3.6)
- Environment: `RoomEnvironment` through a PMREM generator at blur 0.04. No external HDR files.
- Tone mapping ACES Filmic, exposure 1.3 in the room
- Bloom only in the room: strength about 0.42, radius 0.5, threshold 0.82

## Objects

Every object below is a **hotspot** unless marked otherwise. Hotspot behaviour (hover, tooltip, click, keyboard) is in `docs/05-ui-and-interaction.md`. The "area" column decides which top chip fills in when the visitor opens it.

| Object | Position and size | Area | Opens | Tooltip |
|---|---|---|---|---|
| **Screen 1: video package** | centre (−5.3, 3.1, −5.2), rotated y +0.5, bezel 5.1 × 3.05 × 0.18, display 4.8 × 2.7 | projects | Flies into diorama 1 | "Step inside: Video and chat package" |
| **Screen 2: onboarding** | (0, 3.1, −6.1), no rotation | projects | Diorama 2 | "Step inside: Provider onboarding" |
| **Screen 3: PR checks** | (5.3, 3.1, −5.2), rotated y −0.5 | projects | Diorama 3 | "Step inside: PR checks" |
| **Open to work sign** | (0, 5.4, −6.48), 5.5 × 0.98 panel, green glow light | desk | About panel | "Open to work" |
| **Career board** (not a hotspot) | right wall, centre (8.8, 3.35, −0.2), facing −X, cork 5.1 × 3.0 in a dark frame, sticky note "My career, 2019 to now" | — | — | — |
| **Career badges × 3** | pinned on the board at local x = −1.55, 0, 1.55, hanging on two lanyard straps. Badge 1.12 × 1.56: accent header with company, round photo, name, role title, years label. | career | Role panel | "Career: {company}" |
| **Toolbox rack** | floor-standing at (−7.6, 0, −2.6), rotated y +0.8, 1.9 × 4.5 × 1.15, dark metal. Label "Toolbox". | — | — | — |
| **Toolbox units × 8** | one per `skillGroups` entry, stacked from y = 0.5, 0.44 apart, each 1.6 × 0.38 with a coloured stripe, the group name and three blinking LEDs in its accent | toolbox | Skill panel | "Toolbox: {name}" |
| **Side project shelf** | under the window, (−8.4, 0, 1.6), facing +X, 5.3 × 1.05 × 0.8 wood. Label "Side projects". | — | — | — |
| **Side project boxes × 6** | on the shelf, 0.84 apart, each 0.64 × 0.86 × 0.22 in the project's accent with its name and tags on the front | side | Side project panel | "Side project: {name}" |

### Desk

The desk group sits at z offset −0.6. It has three wooden segments (top 3.1 × 0.1 × 1.15 at y 0.98, colour `#5C3C27`, brass edge trim): centre at (0, 0, 3.2); left at (−2.45, 0, 3.7) rotated y +0.55; right at (2.45, 0, 3.7) rotated y −0.55. Positions below are desk-local.

| Object | Position | Area | Opens | Tooltip |
|---|---|---|---|---|
| Keyboard (not a hotspot) | (0, 1.06, 3.4) | — | — | — |
| **Stats display** | (0, 1.03, 2.8), 2.2 × 0.4 panel on a stand, tilted back 0.22. Shows the four `stats` in their accents. | desk | Stats panel | "My numbers" |
| Nameplate (not a hotspot) | (−1.15, 1.12, 3.25), "Mohini Chauhan" in gold, "Senior Software Engineer" below | — | — | — |
| **Photo frame** | (−1.95, 1.03, 3.55), rotated y 0.45, 0.5 × 0.5 wooden frame | desk | About panel | "About me" |
| **Lighthouse dial** | (−2.75, 1.03, 3.85), round gauge facing the visitor. Red, yellow and green arc; needle sweeps from 50 to 90 when the room loads and again when opened. | desk | Lighthouse panel | "Lighthouse score" |
| Mug, plant (not hotspots) | mug at (−3.2, 1.03, 4.2); plant at (3.55, 1.03, 4.6) | — | — | — |
| **Desk phone** | (1.0, 1.03, 3.25), small screen reads "Scenic route", cyan light blinks every second | desk | Phone panel | "Take the scenic route" |
| **Hello button** | (1.8, 1.03, 3.25), big yellow button `#FFD27A`, glowing, "Say hello" printed on the desk in front | desk | Contact panel | "Say hello" |
| **Resume printer** | (2.55, 1.03, 3.95), rotated y −0.55. Clicking slides out a printed page with her name and title over 1.2 s. | desk | Resume panel | "Print my resume" |

## Live screen content

Each screen is a 1024 × 576 canvas texture redrawn about 15 times a second (or a drei `<Html>`-free equivalent). Dark background `#0F1615`. Title in the project accent, "Intellect" underneath, and a footer line.

1. **Video package**: two call tiles ("Teammate" T and "You" Y). Status dot and line "Connected via Provider A". Every 5 seconds it shows "Switching provider…" for 0.8 s, then the next provider (A → B → C). Footer: "Same hook, same UI. Click to step inside."
2. **Onboarding**: a large day counter that animates from 45 down to 15 on a ~10 s loop, with "days" after it. Two progress bars: "Manual, 45 days" (fills to a third) and "Automated, 15 days" (fills completely). Footer: "Click to step inside."
3. **PR checks**: three sample rows ("PR #41 Add chat reactions / Bundle +0.8 KB", "PR #42 New onboarding step / No unused assets", "PR #43 Refactor call states / Tests passing"). Each shows a spinner, then a green check, one after another every 2 s. Footer: "Sample PRs. Click to step inside."

Below each screen, a thin glowing bar in its accent.

## Camera

| State | Spec |
|---|---|
| Intro | Slow drift: position (sin(a) × 1.6, 2.6, 6.2 + cos(a) × 0.6), a += 0.12 rad/s, looking at (0, 2.8, −5) |
| Seated, landscape | Seat at (0, 1.95, 5.2), looking at (0, 1.7, −5), FOV 52 |
| Seated, portrait (aspect < 1) | Seat at (0, 2.4, 6.6), looking at (0, 2.5, −5), FOV 68 |
| Mouse look | Pointer position mapped to −1…1 from the centre. Target yaw = −(x × 0.55 + x³ × 0.6); target pitch = −(y × 0.18 + y³ × 0.25). Ease toward the target at rate 3/s (1.6/s during the tour). Shift the camera slightly with yaw: position += (−yaw × 0.3, pitch × 0.2, 0). Look direction = (look − seat) rotated by yaw around Y, with y += pitch × 10. |
| Touch look | Drag horizontally to change yaw within −1.2…1.3, vertically for pitch within −0.45…0.35. A tap (moved less than 8 px) is a click. |
| Panel open on wide screens (> 760 px) | Shift the view left with `camera.setViewOffset` by min(220 px, 16% of the width), eased, so the object isn't hidden behind the panel |
| Fly to seat | 1.1 s, ease-in-out cubic |

The guided tour steps set target yaw and pitch from `tour` in `portfolio.ts`.

## Hover feedback per object

- Screens: scale to 1.03, glow bar intensity 1.6 → 3.6, point light 14 → 24
- Badges: swing slightly (rotation z up to 0.05)
- Toolbox units: slide out toward the visitor by 0.14
- Everything else: lift by 0.05
- Cursor becomes a pointer; tooltip pill follows the cursor (see doc 05)
