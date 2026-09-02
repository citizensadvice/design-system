import { test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  defaultViewports,
  expectScrolledIntoView,
} from "./playwright-helpers";

test.describe("Sample content page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/content-sample", { waitUntil: "networkidle" });
  });

  test("allows skipping to content", async ({ page }) => {
    const element = page.getByText("Skip to main content");
    await element.focus();
    await expect(element).toBeVisible();
    await element.click();
    await expectScrolledIntoView(page, "#cads-main-content");
  });

  test("visual regression check", async ({ page }) => {
    for (const viewport of defaultViewports) {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `sample-content-page-${viewport.label}.png`,
        { fullPage: true },
      );
    }
  });

  test("visual regression check (print)", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 1024 });
    await page.emulateMedia({ media: "print" });
    await expect(page).toHaveScreenshot(`sample-content-page-print.png`, {
      fullPage: true,
    });
  });
});
