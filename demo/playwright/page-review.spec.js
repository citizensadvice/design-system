import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Page review", async ({ page }) => {
  await page.goto(componentUrl("page_review/example"));

  await expectNoAxeViolations(page);

  await page.setViewportSize({ width: 600, height: 100 });
  await expect(page).toHaveScreenshot("page-review.png");
});
