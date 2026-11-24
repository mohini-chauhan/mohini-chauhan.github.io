import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

/**
 * The Classic view must never ship three.js (doc 06, decision 6). Fails the build
 * if any module from three or @react-three is in a chunk the classic page loads,
 * however the bundler splits the chunks.
 */
function noThreeInClassic(): Plugin {
  return {
    name: 'no-three-in-classic',
    apply: 'build',
    generateBundle(_, bundle) {
      const chunks = new Map(
        Object.values(bundle).flatMap((c) => (c.type === 'chunk' ? [[c.fileName, c] as const] : [])),
      );
      const entry = [...chunks.values()].find((c) => c.isEntry && c.name === 'classic');
      if (!entry) return this.error('no-three-in-classic: classic entry chunk not found');
      const todo = [entry.fileName];
      const seen = new Set<string>();
      while (todo.length) {
        const chunk = chunks.get(todo.pop()!);
        if (!chunk || seen.has(chunk.fileName)) continue;
        seen.add(chunk.fileName);
        const three = chunk.moduleIds.find((id) => /node_modules\/(three|@react-three)\//.test(id));
        if (three) this.error(`The Classic view must not include three.js, but ${chunk.fileName} contains ${three}`);
        todo.push(...chunk.imports, ...chunk.dynamicImports);
      }
    },
  };
}

export default defineConfig({
  // Served at / (the user site). VITE_BASE allows a sub-path build (doc 09).
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), noThreeInClassic()],
  build: {
    // three.js alone is over Vite's default 500 kB warning. 1400 kB minified is
    // roughly doc 08's real budget (380 KB gzip), which size-limit enforces later.
    chunkSizeWarningLimit: 1400,
    // Two pages: the 3D room and the Classic view (doc 06).
    rolldownOptions: { input: { main: 'index.html', classic: 'classic/index.html' } },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
