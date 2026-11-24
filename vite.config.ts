import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Served at / (the user site). VITE_BASE allows a sub-path build (doc 09).
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    // Two pages: the 3D room and the Classic view (doc 06).
    rolldownOptions: { input: { main: 'index.html', classic: 'classic/index.html' } },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
