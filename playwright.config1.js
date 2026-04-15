// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,  //This will override default timeout 
  expect: {
    timeout: 5000,  //This will overide default timeout of assertions
  },
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        slowMo: 5000,
        screenshot: 'only-on-failure',
        trace: 'on'
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        slowMo: 5000,
        screenshot: 'only-on-failure',
        trace: 'on'
      }
    }
  ]
});

