import { test, expect } from "@playwright/test";
import { componentUrl, expectNoAxeViolations } from "./playwright-helpers";

test("Links", async ({ page }) => {
  await page.goto(componentUrl("links/example_links"));

  await expectNoAxeViolations(page);

  await expect(page).toHaveScreenshot("links.png");
});
