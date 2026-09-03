import { describe, expect, test } from "@playwright/test";
import {
  componentUrl,
  viewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Button (primary)", async () => {
  buildButtonTestsFor("primary", "button/primary")
});

describe("Button (secondary)", async () => {
  buildButtonTestsFor("secondary", "button/secondary")
});

describe("Button (tertiary)", async () => {
  buildButtonTestsFor("tertiary", "button/tertiary")
});

describe("Button (with left icon)", () => {
  buildButtonTestsFor("with-left-icon", "button/with_left_icon")
});

describe("Button (with right icon)", () => {
  buildButtonTestsFor("with-right-icon", "button/with_right_icon")
});

function buildButtonTestsFor(type, urlPath) {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl(urlPath));
    await page.setViewportSize({ width: 400, height: 200 });
    await expectNoAxeViolations(page);
  });

  test("initial state", async ({ page }) => {
    await expect(page).toHaveScreenshot(`button-${type}.png`);
  });

  test("hover state", async ({ page }) => {
    const button = page.getByRole("button");

    await button.hover();
    await expect(page).toHaveScreenshot(`button-${type}-hover.png`);
  });

  test("focus state", async ({ page }) => {
    const button = page.getByRole("button");

    await button.focus();
    await expect(page).toHaveScreenshot(`button-${type}-focus.png`);
  });

  test("active state", async ({ page }) => {
    const button = page.getByRole("button");

    // Active state
    await button.hover();
    await page.mouse.down();
    await expect(page).toHaveScreenshot(`button-${type}-active.png`);
    await page.mouse.up();
  });
}
