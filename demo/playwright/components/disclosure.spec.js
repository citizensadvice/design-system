import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  expectNoAxeViolations,
} from "../playwright-helpers";

describe("Disclosure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("disclosure/example"), {
      waitUntil: "networkidle",
    });
  });

  test("visual regression check", async ({ page }) => {
    await page.setViewportSize(viewports.small);
    await expect(page).toHaveScreenshot(`disclosure.png`);

    await getOpenButton(page).click();

    await expect(page).toHaveScreenshot(`disclosure-open.png`, {
      fullPage: true,
    });
  });

  test("initial state", async ({ page }) => {
    const openButton = await getOpenButton(page);
    await expect(openButton).toBeVisible();
    await expect(page.getByText("Example content")).not.toBeVisible();
    await expectNoAxeViolations(page);
  });

  test("toggle open", async ({ page }) => {
    const openButton = await getOpenButton(page);
    await openButton.click();
    await expect(page.getByText("Example content")).toBeVisible();
    await expect(openButton).not.toBeVisible();
    await expectNoAxeViolations(page);
  });

  test("toggle closed", async ({ page }) => {
    const openButton = await getOpenButton(page);
    await openButton.click();
    const closeButton = await page.getByRole("button", { name: /Hide/i });
    await expect(closeButton).toBeVisible();
    await expect(closeButton).toHaveAttribute("aria-expanded", "true");
    await expectNoAxeViolations(page);
  });
});

describe("Disclosure (fallback)", () => {
  test.use({ javaScriptEnabled: false });

  test("visual regression check", async ({ page }) => {
    await page.goto(componentUrl("disclosure/example"));
    await expect(page).toHaveScreenshot("disclosure-fallback.png");
  });
});

function getOpenButton(page) {
  return page.getByRole("button", { name: /View/i });
}
