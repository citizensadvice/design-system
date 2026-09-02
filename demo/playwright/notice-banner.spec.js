import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Notice banner", async ({ page }) => {
  await page.goto(componentUrl("notice_banner/example"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(`notice-banner-${viewport.label}.png`);
  }
});
