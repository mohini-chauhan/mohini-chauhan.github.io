import { Canvas } from '@react-three/fiber';
import { ui } from '../content/portfolio';
import { Experience } from './scene/Experience';

export function App() {
  return (
    // <Canvas> creates the three things every scene needs: the scene, the
    // camera and the renderer, plus the frame loop that redraws every frame.
    <Canvas
      // Device pixel ratio between 1 and 2. A phone at 3 would draw 9x the
      // pixels of a ratio-1 screen, so we cap it (doc 06).
      dpr={[1, 2]}
      // A PerspectiveCamera: 52° field of view, sees from 0.05 to 600 units away.
      camera={{ fov: 52, position: [3, 2.5, 5], near: 0.05, far: 600 }}
      // Screen readers can't see inside a canvas, so describe it (doc 08).
      role="img"
      aria-label={ui.canvasLabel}
    >
      <Experience />
    </Canvas>
  );
}
