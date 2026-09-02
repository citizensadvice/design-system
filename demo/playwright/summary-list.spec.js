import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Summary list (default)", async ({ page }) => {
  await page.goto(componentUrl("summary_list/default"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `summary-list-default-${viewport.label}.png`,
      { fullPage: true },
    );
  }
});

test("Summary list (with paragraph content)", async ({ page }) => {
  await page.goto(componentUrl("summary_list/with_paragraph_content"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `summary-list-with-paragraph-content-${viewport.label}.png`,
      { fullPage: true },
    );
  }
});
