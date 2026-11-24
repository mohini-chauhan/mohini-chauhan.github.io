# 04 · Project dioramas

Clicking a screen flies the camera into it and opens a bright 3D model ("diorama") of that project, with the project panel beside it. Screenshots: `reference/screenshots/18-*`, `19-*`, `20-*`, `24-*`.

## Transition in and out

1. **Fly in**: 0.95 s ease-in-out cubic. Camera moves to 1.7 units in front of the screen centre, looking at the screen.
2. **Fade**: a full-screen fade to `#F6F3EE` over 280 ms. While covered, unmount or hide the room and show the diorama.
3. **Diorama**: orbit controls, panel opens, area chip "Projects" fills.
4. **Back** (button, Esc or browser back): fade, place the camera 1.9 units in front of the same screen, then fly back to the seat over 1.1 s.

With reduced motion: skip both flights and just crossfade.

## Shared diorama setup

| Part | Spec |
|---|---|
| Backdrop | Gradient sky sphere, radius 60, from the accent's light top colour to its mid colour |
| Floor | Circle in the mid colour |
| Platform | Cylinder, radius 7.2 top / 7.4 bottom, height 0.5, colour `#E9E3DA` |
| Rim | Thin emissive torus around the platform in the project accent |
| Light | Directional white 1.25 from (−8, 14, 8) relative to centre, soft shadows; hemisphere 0.55 |
| Rendering | Exposure 1.0, no bloom |
| Camera | Starts at centre + (8, 6.5, 10.5), target centre + (0, 1.6, 0). Orbit controls: no pan, damping on, distance 9 to 22, polar angle 0.15π to 0.46π, auto-rotate at 0.6 until the visitor drags. |
| Labels | Rounded pill sprites (or drei `<Text>` on a pill), sentence case |

Lazy-load each diorama so it isn't in the first bundle.

## Diorama 1: One hook for every video SDK

Colours: sky `#FFE8DF` → `#FFC3AE`, rim `#FF7A59`.

- **Three SDK pillars** (1.1 × 4.2 × 1.1, rounded) in an arc of radius 4.6 behind the centre, at angles −0.62, 0 and +0.62. Colours: SDK A `#5B8CFF`, SDK B `#3DD68C`, SDK C `#FFB547`. Each has a glowing cap and a label. The active provider's cap glows brightly (emissive 1.4 vs 0.15) and its pillar grows slightly (scale y 1.06).
- **The hook**: a white rounded cube (1.7) in the centre at y 2.8, slowly rotating and bobbing, labelled "one hook".
- **Two phones** (1.3 × 2.4 × 0.18) at (±2.4, 0.5, 3.2), angled toward the visitor. Their screens show a call tile and status: "Connected / via Provider A", or "Reconnecting… / Holding your place".
- **Tubes** from the top of the active pillar into the hook, and from the hook to each phone. Ten glowing pulses travel along them: from the active pillar into the hook, then out to the phones.
- **Actions**:
  - "Switch provider": cycles A → B → C. The active pillar changes and pulses re-route. Status: "Switched to Provider {provider}. The call stayed connected and the app code didn't change."
  - "Drop the network": for 2.2 s the pulses freeze and flicker and the phones show "Reconnecting…". Pending status in amber, then "Reconnected to the same room. Nobody had to rejoin."

## Diorama 2: Provider onboarding that runs itself

Colours: sky `#E3FAF1` → `#A9E9D1`, rim `#3FCF9E`.

- **Conveyor** 12.2 × 0.35 × 1.6, dark `#2A3A38`, across the platform.
- **Five gates** at x = −4.8, −2.4, 0, 2.4, 4.8, labelled "Documents", "Checks", "Approval", "Setup", "Live". Gates are white; "Live" is green.
- **A provider token** (green capsule with a white head) moves along the conveyor.
  - Manual mode: moves slowly and waits 2.2 s at each gate, with an orange "waiting" ring spinning above that gate.
  - Automated mode: moves about 2.7 times faster and barely pauses.
  - After "Live" it waits 2 s and starts again.
- **Board** behind the conveyor (6.4 × 2.6): "Day N" in large type (N climbs to 45 in manual mode or 15 in automated mode over one run), then "Manual: live in 45 days / Every step waits on a person" or "Automated: live in 15 days / Steps run on their own".
- **Action**: "Automate onboarding" toggles to "Back to manual". Statuses come from `portfolio.ts`.

## Diorama 3: A check on every pull request

Colours: sky `#E8EBFF` → `#BCC4FF`, rim `#7C8CFF`. Label above the gate: "Bundle size and unused assets".

- **Conveyor** from the left edge to the gate at x = 0, then on to the right.
- **Gate**: two white posts and a top bar that glows periwinkle; a scanner line moves up and down. While scanning a PR the gate turns green (pass) or red (fail).
- **PR boxes** with a floating label: clean PRs are 0.8 cubes in `#7C8CFF`, labelled "PR #41" and so on; big-bundle PRs are 1.25 cubes in `#FFB547`, labelled "PR #42 +42 KB".
- **Flow**: a PR rides to the gate, is scanned for 1.1 s, then:
  - Pass: continues right and drops into the green "Ready to merge" bin.
  - Fail: an orange arm swings and pushes it down a chute into the coral "Changes requested" bin.
- When idle, the diorama sends a PR on its own (about 1 in 3 are big).
- **Actions**: "Send a clean PR" and "Send a PR with a big bundle".
- Show `sampleDataNote` from `portfolio.ts` in the panel.

## Later: custom models

These are built from primitive shapes on purpose so the logic can ship first. Each diorama should keep its models in its own folder (`src/scene/dioramas/<name>/`), so simple shapes can be swapped for GLB models later without touching the logic.
