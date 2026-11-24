import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  // e2e always builds fresh and serves on its own port, so a `vite preview`
  // left running on 4173 is never tested by mistake.
  webServer: {
    command: 'npm run build && npm run preview -- --port 4317 --strictPort',
    url: 'http://localhost:4317',
    reuseExistingServer: false,
  },
  use: { baseURL: 'http://localhost:4317' },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Software WebGL so the 3D room renders on CI machines without a GPU (doc 08).
        launchOptions: {
          args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
        },
      },
    },
  ],
});
