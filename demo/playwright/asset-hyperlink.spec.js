import { test, expect } from "@playwright/test";
import { componentUrl, expectNoAxeViolations } from "./playwright-helpers";

test("Asset hyperlink", async ({ page }) => {
  await page.goto(componentUrl("asset_hyperlink/example"));

  await expectNoAxeViolations(page);

  await expect(page.getByText("Test PDF")).toHaveScreenshot(
    "asset-hyperlink.png",
  );
});
