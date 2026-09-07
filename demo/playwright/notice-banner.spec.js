import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Notice banner", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("notice_banner/example"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `notice-banner-${viewport.label}.png`,
      );
    });
  }
});
