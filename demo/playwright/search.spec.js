import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "./playwright-helpers";

describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("search/example"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  test("visual regression check", async ({ page }) => {
    await page.setViewportSize(viewports.medium);
    await expect(page).toHaveScreenshot("search.png");
  });

  test("visual regression check (focus)", async ({ page }) => {
    await page.setViewportSize(viewports.medium);
    await page.getByLabel(/Search through site content/).focus();
    await expect(page).toHaveScreenshot("search-focus.png");
  });
});
