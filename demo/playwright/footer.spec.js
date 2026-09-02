import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Footer (default)", async ({ page }) => {
  await page.goto(componentUrl("footer/default"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole("contentinfo")).toHaveScreenshot(
      `footer-default-${viewport.label}.png`,
    );
  }
});

test("Footer (feedback link only)", async ({ page }) => {
  await page.goto(componentUrl("footer/feedback_link_only"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole("contentinfo")).toHaveScreenshot(
      `footer-feedback-link-only-${viewport.label}.png`,
    );
  }
});

test("Footer (minimal)", async ({ page }) => {
  await page.goto(componentUrl("footer/minimal"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole("contentinfo")).toHaveScreenshot(
      `footer-minimal-${viewport.label}.png`,
    );
  }
});

test("Footer (with text column)", async ({ page }) => {
  await page.goto(componentUrl("footer/with_text_column"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole("contentinfo")).toHaveScreenshot(
      `footer-with-text-column-${viewport.label}.png`,
    );
  }
});

test("Footer (with additional logo)", async ({ page }) => {
  await page.goto(componentUrl("footer/with_additional_logo"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page.getByRole("contentinfo")).toHaveScreenshot(
      `footer-with-additional-logo-${viewport.label}.png`,
    );
  }
});
