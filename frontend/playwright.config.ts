
import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Use process.env.PORT by default and fall back to 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the PORT
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file
  testDir: 'tests',

  // The output directory for files created during test execution
  outputDir: 'test-results',

  // Whether to exit with an error if any tests failed
  retries: process.env.CI ? 2 : 0,

  // Forbid test.only on CI
  forbidOnly: !!process.env.CI,

  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  webServer: {
    command: 'npm run dev',
    url: baseURL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // All failed tests should create a trace file
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
