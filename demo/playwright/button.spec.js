import { test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Button (primary)", async ({ page }) => {
  await page.goto(componentUrl("button/primary"));

  await expectNoAxeViolations(page);

  await expectButtonStates(page, "primary");
});

test("Button (secondary)", async ({ page }) => {
  await page.goto(componentUrl("button/secondary"));

  await expectNoAxeViolations(page);

  await expectButtonStates(page, "secondary");
});

test("Button (tertiary)", async ({ page }) => {
  await page.goto(componentUrl("button/tertiary"));

  await expectNoAxeViolations(page);

  await expectButtonStates(page, "tertiary");
});

test("Button (with left icon)", async ({ page }) => {
  await page.goto(componentUrl("button/with_left_icon"));

  await expectNoAxeViolations(page);

  await expectButtonStates(page, "with-left-icon");
});

test("Button (with right icon)", async ({ page }) => {
  await page.goto(componentUrl("button/with_right_icon"));

  await expectNoAxeViolations(page);

  await expectButtonStates(page, "with-right-icon");
});

async function expectButtonStates(page, type) {
  await page.setViewportSize({ width: 400, height: 200 });

  const button = page.getByRole("button");

  // Initial state
  await expect(page).toHaveScreenshot(`button-${type}.png`);

  // Hover state
  await button.hover();
  await expect(page).toHaveScreenshot(`button-${type}-hover.png`);

  // Focus state
  await button.focus();
  await expect(page).toHaveScreenshot(`button-${type}-focus.png`);

  // Active state
  await button.hover();
  await page.mouse.down();
  await expect(page).toHaveScreenshot(`button-${type}-active.png`);
  await page.mouse.up();
}
