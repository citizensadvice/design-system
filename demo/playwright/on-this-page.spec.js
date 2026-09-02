import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "./playwright-helpers";

test.describe("On this page (with nested links)", () => {
  test("visual regression check", async ({ page }) => {
    for (const viewport of defaultViewports) {
      // Load the page fresh each time to reset the open state
      await page.goto(componentUrl("on_this_page/with_nested_links"));
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `on-this-page-with-nested-links-${viewport.label}.png`,
      );

      await page
        .getByRole("button", { name: /Show sub-headings for Link 2/i })
        .click();

      await expect(page).toHaveScreenshot(
        `on-this-page-with-nested-links-${viewport.label}-open.png`,
        { fullPage: true },
      );
    }
  });

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

// Only visual test for column variant
test("On this page (with columns)", async ({ page }) => {
  await page.goto(componentUrl("on_this_page/with_columns"));

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `on-this-page-with-columns-${viewport.label}.png`,
    );
  }
});

// Only visual test for no column variant
test("On this page (with no columns)", async ({ page }) => {
  await page.goto(componentUrl("on_this_page/with_no_columns"));

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `on-this-page-with-no-columns-${viewport.label}.png`,
    );
  }
});
