// @ts-check

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({
  testDir: './tests',

  testIgnore: ['**/._*'],

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail CI build if test.only is committed */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,

  /* Limit workers on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter */
  reporter: 'html',

  /* Shared settings */
  use: {
    headless: true,

    baseURL: 'https://www.saucedemo.com',

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',
  },

  /* Projects */
  projects: [
    {
      name: 'setup',

      testMatch: /.*auth\.setup\.spec\.js/,
    },

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],

        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    },

    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox'],

        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    },

    {
      name: 'webkit',

      use: {
        ...devices['Desktop Safari'],

        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    },

    /* Mobile testing (enable when needed) */

    // {
    //   name: 'Mobile Chrome',
    //
    //   use: {
    //     ...devices['Pixel 5'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'Mobile Safari',
    //
    //   use: {
    //     ...devices['iPhone 12'],
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //
    //   dependencies: ['setup'],
    // },
  ],

  /* Optional local dev server */

  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI',
  // },
});
