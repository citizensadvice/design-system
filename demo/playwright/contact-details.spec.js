import { test, expect } from "@playwright/test";
import { componentUrl, expectNoAxeViolations } from "./playwright-helpers";

test("Contact details", async ({ page }) => {
  await page.goto(componentUrl("contact_details/example"));

  await expectNoAxeViolations(page);

  await expect(page).toHaveScreenshot("contact-details.png");
});
