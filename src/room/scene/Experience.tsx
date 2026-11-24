import { OrbitControls } from '@react-three/drei';
import { colors } from './colors';

/** Everything inside the 3D world. Later lessons add the room here. */
export function Experience() {
  return (
    <>
      {/* The colour behind everything, like scene.background = new THREE.Color(...) */}
      <color attach="background" args={[colors.bg]} />

      {/* A mesh is geometry (the shape) + material (the surface).
          position is [x, y, z] in scene units (about metres). y = 0.5 lifts the
          1-unit box so its bottom sits on y = 0. */}
      <mesh position={[0, 0.5, 0]}>
        {/* new THREE.BoxGeometry(1, 1, 1): width, height, depth */}
        <boxGeometry args={[1, 1, 1]} />
        {/* Colours each face by the direction it points, so the box looks 3D
            without any lights. Real lights come in lesson 3. */}
        <meshNormalMaterial />
      </mesh>

      {/* Temporary: drag to orbit around the box. Lesson 6 replaces this
          with the seated look-around camera. */}
      <OrbitControls target={[0, 0.5, 0]} />
    </>
  );
}
