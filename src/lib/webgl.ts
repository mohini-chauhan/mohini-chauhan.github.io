/**
 * Can this browser draw the 3D room? The room needs WebGL2 (doc 06, decision 8).
 * We ask a throwaway canvas for a 'webgl2' context. Some browsers return null,
 * others throw (for example when the GPU is blocklisted), so both mean "no".
 */
export function hasWebGL2(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return false;
    // Free the test context straight away; browsers allow only a few at once.
    gl.getExtension?.('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Where to send browsers without WebGL2. `base` is import.meta.env.BASE_URL, e.g. '/' or '/portfolio/'. */
export function classicFallbackUrl(base: string): string {
  return `${base}classic/?reason=no-webgl`;
}
