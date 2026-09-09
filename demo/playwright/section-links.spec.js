import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Section links (default)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("section_links/example"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `section-links-default-${viewport.label}.png`,
        { fullPage: true },
      );
    });
  }
});

describe("Section links (with additional content)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("section_links/with_additional_content"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `section-links-with-additional-content-${viewport.label}.png`,
        { fullPage: true },
      );
    });
  }
});
