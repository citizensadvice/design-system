import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Callout (standard)", async ({ page }) => {
  await page.goto(componentUrl("callout/standard"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `callout-standard-${viewport.label}.png`,
    );
  }
});

test("Callout (nested)", async ({ page }) => {
  await page.goto(componentUrl("callout/nested"));

  await expectNoAxeViolations(page);

  await expect(page).toHaveScreenshot(`callout-nested.png`, { fullPage: true });
});

test("Callout (example)", async ({ page }) => {
  await page.goto(componentUrl("callout/example"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `callout-example-${viewport.label}.png`,
    );
  }
});

test("Callout (important)", async ({ page }) => {
  await page.goto(componentUrl("callout/important"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `callout-important-${viewport.label}.png`,
    );
  }
});

test("Callout (adviser)", async ({ page }) => {
  await page.goto(componentUrl("callout/adviser"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `callout-adviser-${viewport.label}.png`,
    );
  }
});
