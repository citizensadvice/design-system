import { test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "./playwright-helpers";

test("Search", async ({ page }) => {
  await page.goto(componentUrl("search/example"));
  await page.setViewportSize(viewports.medium);
  await expect(page).toHaveScreenshot("search.png");

  await page.getByLabel(/Search through site content/).focus();
  await expect(page).toHaveScreenshot("search-focus.png");
});
