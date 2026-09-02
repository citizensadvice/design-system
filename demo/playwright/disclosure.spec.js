import { test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "./playwright-helpers";

test.describe("Disclosure", () => {
  test("visual regression check", async ({ page }) => {
    await page.goto(componentUrl("disclosure/example"), {
      waitUntil: "networkidle",
    });

    await page.setViewportSize(viewports.small);
    await expect(page).toHaveScreenshot(`disclosure.png`);

    await page.getByRole("button", { name: /View/i }).click();

    await expect(page).toHaveScreenshot(`disclosure-open.png`, {
      fullPage: true,
    });
  });

  test("interactivity check", async ({ page }) => {
    // Load the page fresh each time to reset the open state
    await page.goto(componentUrl("disclosure/example"), {
      waitUntil: "networkidle",
    });

    const openButton = await page.getByRole("button", { name: /View/i });

    const openText = page.getByText("Example content");

    await expect(openText).not.toBeVisible();

    await expect(openButton).toHaveAttribute("aria-expanded", "false");
    await openButton.click();

    await expect(openText).toBeVisible();

    const closeButton = await page.getByRole("button", { name: /Hide/i });

    await expect(closeButton).toHaveAttribute("aria-expanded", "true");

    // Recheck accessibility violations
    await expectNoAxeViolations(page);
  });
});

test.describe("Disclosure (fallback)", () => {
  test.use({ javaScriptEnabled: false });

  test("visual regression check", async ({ page }) => {
    await page.goto(componentUrl("disclosure/example"));
    await expect(page).toHaveScreenshot("disclosure-fallback.png");
  });
});
