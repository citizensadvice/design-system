import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  defaultViewports,
  expectNoAxeViolations,
} from "../playwright-helpers";

describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation"), {
      waitUntil: "networkidle",
    });
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(`header-${viewport.label}.png`);
    });
  }

  test("visual regression check (open)", async ({ page }) => {
    await page.setViewportSize(viewports.small);
    await page.getByRole("button", { name: /More/ }).click();
    await expect(page).toHaveScreenshot("header-navigation-open.png", {
      fullPage: true,
    });
  });
});
