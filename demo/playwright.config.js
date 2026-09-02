import { defineConfig, devices } from "@playwright/test";

const playwrightTestHost =
  process.env.PLAYWRIGHT_TEST_HOST || "http://localhost:3000";

export default defineConfig({
  testDir: "./playwright",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    [process.env.CI ? "github" : "list"],
    ["html", { open: "never", host: "0.0.0.0", port: 9323 }],
  ],

  webServer: {
    command: "npm run start-test-server",
    url: playwrightTestHost,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  use: {
    baseURL: playwrightTestHost,
    reducedMotion: "reduce",
    trace: "on-first-retry",
    connectOptions: {
      // Required when connecting via run-server,
      // used for consistent rendering across platforms
      wsEndpoint: "ws://127.0.0.1:5000/",
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  expect: {
    toHaveScreenshot: {
      pathTemplate:
        "{testDir}/screenshots{/projectName}/{testFilePath}/{arg}{ext}",
      maxDiffPixelRatio: 0.1,
      animations: "disabled",
    },
  },
});
