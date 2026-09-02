import { test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Breadcrumbs (collapsing)", async ({ page }) => {
  await page.goto(componentUrl("breadcrumbs/collapsing"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    const element = await page.locator(".cads-breadcrumbs-wrapper");
    await expect(element).toHaveScreenshot(
      `breadcrumbs-collapsing-${viewport.label}.png`,
    );
  }
});

test("Breadcrumbs (long)", async ({ page }) => {
  await page.goto(componentUrl("breadcrumbs/long"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    const element = await page.locator(".cads-breadcrumbs-wrapper");
    await expect(element).toHaveScreenshot(
      `breadcrumbs-long-${viewport.label}.png`,
    );
  }
});

test("Breadcrumbs (no collapse)", async ({ page }) => {
  await page.goto(componentUrl("breadcrumbs/not_collapsing"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    const element = await page.locator(".cads-breadcrumbs-wrapper");
    await expect(element).toHaveScreenshot(
      `breadcrumbs-no-collapse-${viewport.label}.png`,
    );
  }
});

test("Breadcrumbs (not full width)", async ({ page }) => {
  await page.goto(componentUrl("breadcrumbs/not_full_width"));

  await expectNoAxeViolations(page);

  // Set wide enough to capture expected behaviour
  await page.setViewportSize({ width: 1400, height: 200 });
  await expect(page).toHaveScreenshot("breadcrumbs-not-full-width-large.png");
});
