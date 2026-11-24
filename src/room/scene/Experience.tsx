import { OrbitControls } from '@react-three/drei';
import { colors } from './colors';

/** Everything inside the 3D world. Later lessons add the room here. */
export function Experience() {
  return (
    <>
      {/* The colour behind everything, like scene.background = new THREE.Color(...) */}
      <color attach="background" args={[colors.bg]} />

      {/* A mesh = a shape + a surface.
    position = the centre of the mesh: [x = right, y = up, z = toward you].
    The slab is 0.5 tall, so its centre is at 0.25.
    Then the bottom of the slab touches the floor. */}
      <mesh position={[0, 0.25, 0]}>
        {/* The shape: a box that is 2 wide, 0.5 tall and 1 deep. */}
        <boxGeometry args={[2, 0.5, 1]} />
        {/* The surface: one orange colour on every side.
    It does not use light, so the slab looks flat. */}
        <meshBasicMaterial color="#FF7A59" />
      </mesh>
      {/* A ball with a radius of 0.5.
    32 and 16 = the number of pieces around it and from top to bottom.
    More pieces make the ball smoother. */}
      <mesh position={[2, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 16]} />
        <meshNormalMaterial />
      </mesh>
      {/* Temporary: drag to orbit around the box. Lesson 6 replaces this
          with the seated look-around camera. */}
      <OrbitControls target={[0, 0.5, 0]} />
    </>
  );
}
