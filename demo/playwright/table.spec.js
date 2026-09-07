import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Table (default)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("table/example"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `table-default-${viewport.label}.png`,
        {
          fullPage: true,
        },
      );
    });
  }
});

describe("Table (long)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("table/long_table"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(`table-long-${viewport.label}.png`, {
        fullPage: true,
      });
    });
  }
});

describe("Table (no caption)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("table/no_caption"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `table-no-caption-${viewport.label}.png`,
        { fullPage: true },
      );
    });
  }
});

describe("Table (no responsive headers)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("table/table/no_responsive_headers"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `table-no-responsive-headers-${viewport.label}.png`,
        { fullPage: true },
      );
    });
  }
});
