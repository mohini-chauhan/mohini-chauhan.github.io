# 08 · Quality bar

## Accessibility

- **Keyboard**: every hotspot reachable through the hotspot menu (doc 05). Visible focus ring (3 px `#FFD27A`, offset 3 px, with a 3 px `--ink-dark` ring inside it so it shows on light surfaces too) on every control. Esc always backs out one level.
- **Focus management**: a panel opening moves focus to its heading; closing returns focus to the opener. The intro traps focus until dismissed.
- **Screen readers**: the canvas has an `aria-label` describing the room. Panels are `role="dialog"` with `aria-labelledby`. Status lines in panels are `aria-live="polite"`. The tour bar announces each step.
- **Reduced motion** (`prefers-reduced-motion: reduce`):
  - No camera flights: cut or crossfade instead
  - No intro drift, no orbit auto-rotate, no blinking LEDs or phone light
  - Mouse look still works, but without easing overshoot
  - Demo animations run, but slower and without flicker (the "network drop" uses a steady amber state instead of flicker)
- **Contrast**: all text meets WCAG AA (4.5:1 body, 3:1 large). Check text drawn on canvas textures too.
- **Skip link**: the first focusable element is "Skip to classic view".

## Performance budgets

| Metric | Budget |
|---|---|
| 3D entry JS, gzip (room + UI, excluding lazy dioramas) | ≤ 380 KB |
| Each diorama chunk, gzip | ≤ 40 KB |
| Classic view JS, gzip | ≤ 60 KB, and no three.js |
| Images and fonts on first load | ≤ 400 KB |
| Classic view Lighthouse | 95+ in all four categories |
| 3D page Lighthouse performance | 90+ (the intro card is HTML, so it paints before WebGL is ready) |
| Frame rate | 60 fps on a mid-range laptop; 30+ fps on a mid-range Android phone |

Enforce the JS budgets with size-limit in CI (doc 09).

## Browser and device support

- Current Chrome, Edge, Firefox and Safari (desktop and iOS), and Chrome on Android.
- Test at 1440 × 900, 1280 × 720, 768 × 1024 and 390 × 844.
- No WebGL2 → redirect to the Classic view.

## Testing

**Unit (Vitest)**
- `portfolio.ts` validation: unique ids; every `workProjectIds` and `roleId` resolves; no empty strings; accents are valid hex; `TODO` values are reported (warn in dev, fail in a `--launch` mode).
- Store: mode transitions, one panel at a time, visited areas, tour steps.
- Hotspot registry: builds one entry per screen, badge, skill group, side project and desk object.

**End to end (Playwright)**
- Chromium flags for WebGL in CI: `--use-angle=swiftshader --enable-unsafe-swiftshader --ignore-gpu-blocklist`.
- Smoke: page loads with no console errors; intro is visible; "Show me around" runs all 6 tour steps; "I'll explore myself" seats the camera.
- Keyboard: open the hotspot menu, open every panel type, enter and leave each diorama with Enter and Esc.
- Each diorama: every demo action changes its status line.
- Classic view: all sections render; no request for three.js; resume link present.
- Reduced motion: emulate `reduce` and check that no flight runs (mode goes straight to `diorama`).
- Phone viewport: panel renders as a bottom sheet.

**Manual before launch**
- A real mid-range Android phone and an iPhone.
- VoiceOver or NVDA pass through the Classic view and the hotspot menu.
