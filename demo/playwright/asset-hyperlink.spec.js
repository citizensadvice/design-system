import { describe, test, expect } from "@playwright/test";
import { componentUrl, expectNoAxeViolations } from "./playwright-helpers";

describe("Asset hyperlink", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("asset_hyperlink/example"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  test("visual regression check", async ({ page }) => {
    await expect(page.getByText("Test PDF")).toHaveScreenshot(
      "asset-hyperlink.png",
    );
  });
});
