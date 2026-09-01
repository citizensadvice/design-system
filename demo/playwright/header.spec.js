import { test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation"), {
      waitUntil: "networkidle",
    });
  });

  test("visual regression check (viewports)", async ({ page }) => {
    for (const viewport of defaultViewports) {
      await page.setViewportSize(viewport);
      await expectNoAxeViolations(page);

      await expect(page).toHaveScreenshot(`header-${viewport.label}.png`);
    }
  });

  test("allows toggling search on small screens", async ({ page }) => {
    await page.setViewportSize(viewports.small);

    const searchField = page.getByLabel("Search through site content");
    await expect(searchField).not.toBeVisible();

    await page.getByRole("button", { name: "Open search" }).click();
    await expect(searchField).toBeVisible();

    await expect(page).toHaveScreenshot("header-search-open.png");

    await page.getByRole("button", { name: "Close search" }).click();
    await expect(searchField).not.toBeVisible();
  });

  test("shows header links in navigation", async ({ page }) => {
    await page.setViewportSize(viewports.small);

    const exampleHeaderLink = await page
      .getByTestId("cads-greedy-nav-dropdown")
      .getByTestId("account-link");

    await expect(exampleHeaderLink).not.toBeVisible();

    await page.getByRole("button", { name: /More/ }).click();

    await expect(exampleHeaderLink).toBeVisible();

    await expect(page).toHaveScreenshot("header-navigation-open.png", {
      fullPage: true,
    });
  });
});
