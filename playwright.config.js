// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  //retries: 1, //How many times a test will run if failed
  //workers: 3,  //How many workers will execute the test suite at a time. Default is 5 and 1 will disable parallel execution
  timeout: 30*1000,  //This will override default timeout 
  expect: {
    timeout: 5000,  //This will overide default timeout of assertions
  },
  reporter: 'html',
  
  use: {
  
    browserName: 'chromium',
    headless: false,
    slowMo: 5000,
    screenshot : 'only-on-failure',
    trace : 'on'
  },

  
});

