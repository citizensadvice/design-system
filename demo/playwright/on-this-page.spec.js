import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "./playwright-helpers";

describe("On this page (with nested links)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("on_this_page/with_nested_links"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `on-this-page-with-nested-links-${viewport.label}.png`,
      );
    });

    test(`visual regression check ${viewport.label} (open)`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);

      await page
        .getByRole("button", { name: /Show sub-headings for Link 2/i })
        .click();

      await expect(page).toHaveScreenshot(
        `on-this-page-with-nested-links-${viewport.label}-open.png`,
        { fullPage: true },
      );
    });
  }

  test("interactivity check", async ({ page }) => {
    await page.goto(componentUrl("on_this_page/with_nested_links"), {
      waitUntil: "networkidle",
    });

    await expectNoAxeViolations(page);

    const openButton = await page.getByRole("button", {
      name: /Show sub-headings for Link 2/i,
    });

    const openText = page.getByText("Link 2.1");

    await expect(openText).not.toBeVisible();

    await expect(openButton).toHaveAttribute("aria-expanded", "false");
    await openButton.click();

    await expect(openText).toBeVisible();

    const closeButton = await page.getByRole("button", {
      name: /Hide sub-headings for Link 2/i,
    });

    await expect(closeButton).toHaveAttribute("aria-expanded", "true");

    // Recheck accessibility violations
    await expectNoAxeViolations(page);
  });
});

describe("On this page (with columns)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("on_this_page/with_columns"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `on-this-page-with-columns-${viewport.label}.png`,
      );
    });
  }
});

describe("On this page (with no columns)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("on_this_page/with_no_columns"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `on-this-page-with-no-columns-${viewport.label}.png`,
      );
    });
  }
});
