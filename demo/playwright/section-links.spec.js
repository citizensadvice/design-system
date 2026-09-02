import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Section links (default)", async ({ page }) => {
  await page.goto(componentUrl("section_links/example"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `section-links-default-${viewport.label}.png`,
      { fullPage: true },
    );
  }
});

test("Section links (with additional content)", async ({ page }) => {
  await page.goto(componentUrl("section_links/with_additional_content"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `section-links-with-additional-content-${viewport.label}.png`,
      { fullPage: true },
    );
  }
});
