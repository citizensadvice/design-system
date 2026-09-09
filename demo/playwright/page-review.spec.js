import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Page review", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("page_review/example"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  test("visual regression check", async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 100 });
    await expect(page).toHaveScreenshot("page-review.png");
  });
});
