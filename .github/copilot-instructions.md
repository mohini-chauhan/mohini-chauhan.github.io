All project instructions live in `AGENTS.md` at the repository root. Read it before doing anything, then follow `docs/10-implementation-plan.md` one phase at a time and stop for review after each phase.

Key rules, in short:
- All copy and numbers come from `src/content/portfolio.ts`. Never invent content.
- UI panels, buttons and menus are React DOM over the canvas, never drawn in 3D.
- Every 3D hotspot is also reachable from the keyboard via the hotspot menu.
- Respect `prefers-reduced-motion`.
- Stack: Vite 8, React 19.3, TypeScript 6.0, three 0.187, @react-three/fiber 9.8, @react-three/drei 10.7, zustand 5.
