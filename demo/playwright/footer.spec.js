import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Footer (default)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("footer/default"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page.getByRole("contentinfo")).toHaveScreenshot(
        `footer-default-${viewport.label}.png`,
      );
    });
  }
});

describe("Footer (feedback link only)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("footer/feedback_link_only"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page.getByRole("contentinfo")).toHaveScreenshot(
        `footer-feedback-link-only-${viewport.label}.png`,
      );
    });
  }
});

describe("Footer (minimal)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("footer/minimal"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page.getByRole("contentinfo")).toHaveScreenshot(
        `footer-minimal-${viewport.label}.png`,
      );
    });
  }
});

describe("Footer (with text column)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("footer/with_text_column"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page.getByRole("contentinfo")).toHaveScreenshot(
        `footer-with-text-column-${viewport.label}.png`,
      );
    });
  }
});

describe("Footer (with additional logo)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("footer/with_additional_logo"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page.getByRole("contentinfo")).toHaveScreenshot(
        `footer-with-additional-logo-${viewport.label}.png`,
      );
    });
  }
});
