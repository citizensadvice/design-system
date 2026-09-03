import { describe, expect, test } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Callout (standard)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("callout/standard"));
  })

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  })

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `callout-standard-${viewport.label}.png`
      );
    })
  }
});

describe("Callout (nested)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("callout/nested"));
  })

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  })

  test(`visual regression check`, async ({ page }) => {
    await expect(page).toHaveScreenshot(
      "callout-nested.png"
    );
  })
});

describe("Callout (example)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("callout/example"));
  })

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  })

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `callout-example-${viewport.label}.png`
      );
    })
  }
});

describe("Callout (important)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("callout/important"));
  })

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  })

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `callout-important-${viewport.label}.png`
      );
    })
  }
});

describe("Callout (adviser)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("callout/adviser"));
  })

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  })

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `callout-adviser-${viewport.label}.png`
      );
    })
  }
});
