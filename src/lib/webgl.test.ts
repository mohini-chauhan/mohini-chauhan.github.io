import { afterEach, describe, expect, it, vi } from 'vitest';
import { classicFallbackUrl, hasWebGL2 } from './webgl';

describe('hasWebGL2', () => {
  afterEach(() => vi.restoreAllMocks());

  it('returns true when a webgl2 context is available', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({} as WebGL2RenderingContext);
    expect(hasWebGL2()).toBe(true);
  });

  it('returns false when getContext returns null', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
    expect(hasWebGL2()).toBe(false);
  });

  // Some browsers throw instead of returning null when the GPU is blocklisted.
  it('returns false when getContext throws', () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(hasWebGL2()).toBe(false);
  });
});

describe('classicFallbackUrl', () => {
  it('builds the URL for the root base', () => {
    expect(classicFallbackUrl('/')).toBe('/classic/?reason=no-webgl');
  });

  it('keeps a sub-path base', () => {
    expect(classicFallbackUrl('/portfolio/')).toBe('/portfolio/classic/?reason=no-webgl');
  });
});
