# 05 · UI and interaction

All UI on this page is React DOM layered over the canvas. Screenshots: `reference/screenshots/`.

## Layers (bottom to top)

1. Canvas (3D)
2. Top bar, hint, back button, tour bar
3. Tooltip
4. Panel
5. Fade overlay
6. Intro

## Top bar

- Left: "Mohini Chauhan" (bold). In a diorama it turns dark to suit the bright background.
- Centre: **area chips** in a pill: Projects, Career, Toolbox, Side projects, Desk (from `ui.areas`). A chip fills gold `#FFD27A` with dark text once the visitor opens anything in that area. On narrow screens the chips move to a second row and the dots hide.
- Right: "Classic view" link (goes to `/classic/`).

## Intro (first screen)

Screenshot `01-intro.png` and `21-phone-intro.png`.

- Dark glass card over the drifting room: round photo, name and title; heading; body; a two-column map of the room with a coloured square per area (from `ui.intro.map`); buttons "Show me around" (gold, primary) and "I'll explore myself" (outline); footnote.
- Either button hides the intro and flies the camera to the seat. "Show me around" then starts the tour.
- On phones the card scrolls if needed and the map becomes one column.

## Guided tour

Screenshots `02` to `07`.

- A dark glass bar at the bottom centre: "1 of 6", the step text, "Next" (gold; "Done" on the last step) and "Explore on my own".
- Each step eases the camera to the step's yaw and pitch.
- While the tour runs, mouse look is paused and the hint is hidden. Clicking a hotspot or a screen ends the tour.

## Hint

Bottom centre pill: `ui.hint.mouse` on mouse devices, `ui.hint.touch` on touch devices, `ui.hint.diorama` in a diorama. Hidden on phones while in a diorama.

## Tooltip

Gold pill (`#FFD27A`, text `#2A1E00`, 14 px bold) offset 14 px from the cursor, showing the hotspot's tooltip. Mouse only.

## Panels

Screenshots `09` to `17`, `23`.

- **Desktop**: glass card on the right, vertically centred, width min(420 px, 100vw − 32 px), max height 100vh − 140 px, scrolls inside. Slides in from the right over 0.5 s.
- **Phone (≤ 760 px)**: bottom sheet, 16 px from the edges, max height 56vh.
- **Structure**: coloured tag pill; heading; optional subheading; sections separated by hairlines, each with a small grey label; a status line (green, or amber while pending); and a sticky action bar at the bottom.
- Light glass (`rgba(255,255,255,.88)`, dark text) everywhere except the contact panel, which can use the dark glass.

### Panel types

| Panel | Tag | Heading | Sections | Actions |
|---|---|---|---|---|
| Project | "Work project at Intellect" in accent | project title | Problem, What I built, Result (large, bold) | Demo actions from `workProjects[].actions` (first filled, rest outline) |
| Role | years label in role accent | role title; sub "{company}, {duration}" | Highlights (green tick list); for Intellect, "Projects from this role" with buttons that fly into each diorama | Close |
| Toolbox | "Toolbox" violet | group name | Tools (chips); Where I used it (tick list, only if any) | Close |
| Side project | "Side project" in accent | project name | Built with (chips); What it does (tick list) | Open the project (only if `url`), Close |
| Stats | "My numbers" | "Seven years in numbers" (match the stat) | 2 × 2 grid of stats in their accents; one line pointing to the badges | Close |
| Lighthouse | "At Intellect" green | "Lighthouse score 50 → 90" | One line telling them to watch the dial; Performance tools chips | Close. Opening it restarts the dial sweep. |
| About | "About me" | name; sub title | Photo + bio; status chips (Open to work, Remote, Full-time) | Email me, LinkedIn |
| Contact | "Say hello" amber | `ui.contact.heading` | Photo + `ui.contact.body` | Email me, LinkedIn, Download resume |
| Resume | "Resume" | `ui.resume.heading` | `ui.resume.body` | Download resume, Close. Opening it triggers the printer animation. |
| Phone | "Scenic route" teal | `ui.phone.heading` | `ui.phone.body` | See open question Q6 for the launch behaviour |

## Hotspot menu (keyboard and screen readers)

The canvas can't be tabbed through, so add a visible "Jump to" button in the top bar (or reveal it on first Tab). It opens a menu listing every hotspot grouped by area: Projects (3 screens), Career (3 badges), Toolbox (9 units), Side projects (6), Desk (stats, Lighthouse, photo, resume, phone, hello, open to work).

- Choosing an item turns the camera to face the object (ease to a yaw and pitch you compute from its position), then opens its panel or diorama.
- The menu is a real list of buttons with arrow-key navigation and Esc to close.

## Keyboard

| Key | Action |
|---|---|
| Tab / Shift+Tab | Move through top bar, hotspot menu button, panel and its buttons |
| Enter / Space | Activate the focused control |
| Esc | Close the panel; in a diorama, go back to the room; close the hotspot menu |
| Arrow keys (seated, nothing focused) | Nudge yaw and pitch, so keyboard users can look around |

Focus moves to the panel heading when a panel opens and returns to the element that opened it when it closes.

## State model (zustand)

```ts
type Mode = 'intro' | 'flyingToSeat' | 'seated' | 'flyingIn' | 'diorama' | 'flyingOut';
type PanelRef =
  | { kind: 'project'; id: WorkProject['id'] }
  | { kind: 'role' | 'skill' | 'side'; id: string }
  | { kind: 'stats' | 'lighthouse' | 'about' | 'contact' | 'resume' | 'phone' };

interface AppState {
  mode: Mode;
  activeDiorama: WorkProject['id'] | null;
  panel: PanelRef | null;
  tourStep: number | null;
  visitedAreas: Set<'projects' | 'career' | 'toolbox' | 'side' | 'desk'>;
  hoveredHotspot: string | null;
  lookTarget: { yaw: number; pitch: number };
  demo: { provider: 0 | 1 | 2; networkDownUntil: number; onboardingAutomated: boolean; prQueue: PrItem[] };
}
```

Only one panel at a time. Opening a hotspot while a panel is open replaces it.
