import { describe, test, expect } from "@playwright/test";
import { componentUrl, expectNoAxeViolations } from "./playwright-helpers";

describe("Contact details", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("contact_details/example"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  test("visual regression check", async ({ page }) => {
    await expect(page).toHaveScreenshot("contact-details.png");
  });
});
