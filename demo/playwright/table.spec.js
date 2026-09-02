import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Table (default)", async ({ page }) => {
  await page.goto(componentUrl("table/example"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(`table-default-${viewport.label}.png`, {
      fullPage: true,
    });
  }
});

test("Table (long)", async ({ page }) => {
  await page.goto(componentUrl("table/table/long_table"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(`table-long-${viewport.label}.png`, {
      fullPage: true,
    });
  }
});

test("Table (no caption)", async ({ page }) => {
  await page.goto(componentUrl("table/table/no_caption"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `table-no-caption-${viewport.label}.png`,
      { fullPage: true },
    );
  }
});

test("Table (no responsive headers)", async ({ page }) => {
  await page.goto(componentUrl("table/table/no_responsive_headers"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `table-no-responsive-headers-${viewport.label}.png`,
      { fullPage: true },
    );
  }
});
