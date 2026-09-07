import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Breadcrumbs (collapsing)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("breadcrumbs/collapsing"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const element = await page.locator(".cads-breadcrumbs-wrapper");
      await expect(element).toHaveScreenshot(
        `breadcrumbs-collapsing-${viewport.label}.png`,
      );
    });
  }
});

describe("Breadcrumbs (long)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("breadcrumbs/long"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const element = await page.locator(".cads-breadcrumbs-wrapper");
      await expect(element).toHaveScreenshot(
        `breadcrumbs-long-${viewport.label}.png`,
      );
    });
  }
});

describe("Breadcrumbs (no collapse)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("breadcrumbs/not_collapsing"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      const element = await page.locator(".cads-breadcrumbs-wrapper");
      await expect(element).toHaveScreenshot(
        `breadcrumbs-no-collapse-${viewport.label}.png`,
      );
    });
  }
});

describe("Breadcrumbs (not full width)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("breadcrumbs/not_full_width"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  test("visual regression check", async ({ page }) => {
    // Set wide enough to capture expected behaviour
    await page.setViewportSize({ width: 1400, height: 200 });
    await expect(page).toHaveScreenshot("breadcrumbs-not-full-width-large.png");
  });
});
