import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Summary list (default)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("summary_list/default"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `summary-list-default-${viewport.label}.png`,
        { fullPage: true },
      );
    });
  }
});

describe("Summary list (with paragraph content)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("summary_list/with_paragraph_content"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `summary-list-with-paragraph-content-${viewport.label}.png`,
        { fullPage: true },
      );
    });
  }
});
