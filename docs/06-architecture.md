# 06 · Architecture

## Stack

| Concern | Choice | Notes |
|---|---|---|
| Build | Vite 8, multi-page | Two entries: `/` (3D room) and `/classic/` (no three.js at all) |
| UI | React 19.3, TypeScript 6.0 strict | TS 7 is out but typescript-eslint supports < 6.1 only (Nov 2026) |
| 3D | three 0.187, @react-three/fiber 9.8, @react-three/drei 10.7 | R3F 9 needs React 19.0 to 19.3 |
| Effects | @react-three/postprocessing 3.2 (Bloom, ToneMapping) | Bloom in the room only |
| State | zustand 5 | One store; see the model in doc 05 |
| Styles | Plain CSS with CSS variables from `src/styles/tokens.css` | CSS modules are fine. No UI kit needed. |
| Fonts | Albert Sans, self-hosted via Fontsource | Wait for `document.fonts.load` before painting canvas textures |
| Tests | Vitest 5, Testing Library, Playwright 1.65 | See doc 08 |
| Checks | ESLint 10 + typescript-eslint, knip, size-limit | See doc 09 |

Versions are what was current on 18 November 2026. Re-check with `npm view <pkg> version` and keep every peer range satisfied.

## Folder structure

```
index.html                     # 3D entry, includes <noscript> link to /classic/
classic/index.html             # Classic view entry
public/
  images/mohini-photo.jpg
  resume/                      # Mohini adds the PDF here
  og-image.png                 # social preview (make from a screenshot)
src/
  content/portfolio.ts         # all content (provided)
  styles/tokens.css            # design tokens from doc 12
  styles/global.css
  lib/
    webgl.ts                   # detect WebGL2, else redirect to /classic/
    motion.ts                  # usePrefersReducedMotion
    format.ts                  # template helpers, e.g. {provider}
  state/
    store.ts                   # zustand store
    selectors.ts
  room/                        # 3D entry
    main.tsx
    App.tsx                    # Canvas + DOM overlay
    scene/
      Experience.tsx           # Canvas contents: lights, env, post, mode switch
      Room.tsx
      shell/                   # Floor, Walls, Ceiling, Window
      screens/                 # ProjectScreen.tsx + painters per screen
      wall/                    # OpenToWorkSign, CareerBoard, Badge
      toolbox/                 # ToolboxRack, ToolboxUnit
      shelf/                   # SideProjectShelf, SideProjectBox
      desk/                    # Desk, StatsDisplay, LighthouseDial, PhotoFrame,
                               # Nameplate, DeskPhone, HelloButton, Printer, Props
      camera/                  # SeatCamera, useLook, flights.ts
      hotspots/                # Hotspot.tsx, registry.ts
      dioramas/
        Diorama.tsx            # shared stage: sky, platform, rim, lights, controls
        video/                 # VideoDiorama.tsx (lazy)
        onboarding/            # OnboardingDiorama.tsx (lazy)
        prChecks/              # PrChecksDiorama.tsx (lazy)
      textures/                # useCanvasTexture, label sprites
    ui/
      TopBar.tsx  AreaChips.tsx  HotspotMenu.tsx
      Intro.tsx   Tour.tsx       Hint.tsx  Tooltip.tsx
      Panel.tsx   panels/*.tsx   BackButton.tsx  Fade.tsx  Loader.tsx
  classic/
    main.tsx
    ClassicPage.tsx
    sections/*.tsx
scripts/
  check-unused-assets.mjs
tests/
  e2e/*.spec.ts
```

## Key decisions

1. **DOM over canvas for all UI.** Panels, tooltips, chips, menus and the tour are React DOM. Only world-space labels (badge text, screen content, diorama labels) are drawn in 3D.
2. **One hotspot registry.** `hotspots/registry.ts` builds the list of hotspots from `portfolio.ts` (id, area, tooltip, panel or diorama target, world position). Both `<Hotspot>` (3D) and `HotspotMenu` (DOM) read it, so they never drift apart.
3. **Mode-driven scene.** `Experience` renders the room when mode is `intro`, `flyingToSeat`, `seated`, `flyingIn` or `flyingOut`, and the active diorama when mode is `diorama`. Switch while the fade overlay covers the screen.
4. **Lazy dioramas.** `React.lazy` + `<Suspense>` inside the Canvas. Preload the next likely diorama on screen hover.
5. **Canvas textures for live screens.** Port the painters from the prototype into small pure functions `(ctx, time, state) => void`. Redraw at about 15 fps, not every frame. Use drei `<Text>` for static 3D labels where it's simpler.
6. **Classic view shares content, not components.** `/classic/` imports `portfolio.ts` and its own lightweight components. It must not import three, R3F or drei. A build check in `vite.config.ts` (`noThreeInClassic`) enforces this.
7. **No network assets at runtime** except the site's own files. Fonts are self-hosted; the environment map is generated in code.
8. **WebGL fallback.** `lib/webgl.ts` checks for WebGL2 before mounting. If it's missing, redirect to `/classic/?reason=no-webgl`, and the Classic view shows a short note.

## Performance practices

- Cap device pixel ratio at 2. Use drei `<PerformanceMonitor>` to drop to 1.5 or 1 and turn off bloom when frame rate falls.
- Pause rendering when the tab is hidden.
- Merge or instance repeated meshes (wall slats, shelf boxes, toolbox LEDs).
- Reuse one photo texture everywhere.
- Dispose of any texture, material or geometry created outside JSX.
- Keep the initial JS small: the room and its UI only. Dioramas, OrbitControls and post-processing load lazily where possible.

## Decision log

Record changes to any decision above here, with the date and the reason.

| Date | Decision | Reason |
|---|---|---|
| 2026-11-18 | Initial architecture as above | Handoff from prototype |
| 2026-11-24 | Build order follows `docs/13-learning-path.md`: small lessons, one PR each, stop after every lesson | Mohini is new to 3D and wants to understand every line of the 3D code |
| 2026-11-24 | Installed exactly: vite 8.3.8, react and react-dom 19.3.1, typescript 6.0.3, three 0.187.0, @react-three/fiber 9.8.2, @react-three/drei 10.7.9, @react-three/postprocessing 3.2.2, postprocessing 6.39.6, zustand 5.1.0, vitest 5.1.1, jsdom 29.1.1, @testing-library/react 16.3.3, @playwright/test 1.65.1, eslint 10.15.0, typescript-eslint 8.74.0, eslint-plugin-react-hooks 7.1.1, prettier 3.10.1, @vitejs/plugin-react 6.3.0, @fontsource-variable/albert-sans 5.3.0 | TypeScript 6.0.3 because typescript-eslint 8.74 needs `<6.1.0`. jsdom 29 because jsdom 30+ needs Node 22.22+ and the local Node is 22.19 |
| 2026-11-24 | `postprocessing` installed alongside `@react-three/postprocessing` | It's a required peer dependency |
| 2026-11-24 | knip and size-limit, and the `check:size` and `check:unused` scripts, deferred to Phases 5 and 6 | They arrive with their configs instead of as scripts that point at nothing |
| 2026-11-24 | Doc 08's `--launch` mode is `npm run test:launch` (sets `LAUNCH=1`) | Vitest has no custom CLI flags; an env var is the simplest switch |
| 2026-11-24 | Vite 8 uses `build.rolldownOptions` instead of doc 09's `rollupOptions` | `rollupOptions` is deprecated in Vite 8 |
| 2026-11-24 | Build in the user-site repo on branch `v2` instead of a new `portfolio` repo | Mohini's choice. Nothing to move at launch, and the live site deploys from `gh-pages`, so `v2` can't affect it |
| 2026-11-24 | `noThreeInClassic` build check instead of size-limit for "no three.js in Classic" | It checks the classic page's module graph, so it holds however chunks are split. The e2e string check missed tree-shaken imports (A1 review point 3) |
| 2026-11-24 | `build.chunkSizeWarningLimit` set to 1400 kB | three.js alone is over Vite's 500 kB default, so every build warned. 1400 kB minified is roughly doc 08's 380 KB gzip budget, so the warning now means something |
