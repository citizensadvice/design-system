import { describe, test, expect } from "@playwright/test";
import { componentUrl, expectNoAxeViolations } from "./playwright-helpers";

describe("Links", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("links/example_links"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  test("visual regression check", async ({ page }) => {
    await expect(page).toHaveScreenshot("links.png");
  });
});
