import { test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "./playwright-helpers";

test.describe("Targeted content (default)", () => {
  test("visual regression check", async ({ page }) => {
    for (const viewport of defaultViewports) {
      // Load the page fresh each time to reset the open state
      await page.goto(componentUrl("targeted_content/default"));
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `targeted-content-default-${viewport.label}.png`,
      );

      await page
        .getByTestId("targeted-content-title")
        .getByRole("button", { name: /If you are/i })
        .click();

      await expect(page).toHaveScreenshot(
        `targeted-content-default-${viewport.label}-open.png`,
        { fullPage: true },
      );
    }
  });

  test("interactivity check", async ({ page }) => {
    await page.goto(componentUrl("targeted_content/default"), {
      waitUntil: "networkidle",
    });

    await expectNoAxeViolations(page);

    const headingButton = page
      .getByTestId("targeted-content-title")
      .getByRole("button", { name: /If you are/i });

    const openText = page.getByText(
      /You should apply to the EU Settlement Scheme if/,
    );

    expect(openText).not.toBeVisible();

    await expect(headingButton).toHaveAttribute("aria-expanded", "false");
    await headingButton.click();
    await expect(openText).toBeVisible();
    await expect(headingButton).toHaveAttribute("aria-expanded", "true");

    // Recheck accessibility violations
    await expectNoAxeViolations(page);
  });

  test("anchors to content", async ({ page }) => {
    await page.goto(componentUrl("targeted_content/anchor"), {
      waitUntil: "networkidle",
    });

    const headingButton = page
      .getByTestId("targeted-content-title")
      .getByRole("button", { name: /If you are/i });

    await page.getByText("Jump to targeted content").click();

    const openText = page.getByText(
      /You should apply to the EU Settlement Scheme if/,
    );

    await expect(openText).toBeVisible();

    await expectScrolledIntoView(page, ".cads-targeted-content");
  });
});

// Only visual test for adviser variant
test("Targeted content (adviser)", async ({ page }) => {
  for (const viewport of defaultViewports) {
    // Load the page fresh each time to reset the open state
    await page.goto(componentUrl("targeted_content/default"));
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(
      `targeted-content-default-${viewport.label}.png`,
    );

    await page
      .getByTestId("targeted-content-title")
      .getByRole("button", { name: /If you are/i })
      .click();

    await expect(page).toHaveScreenshot(
      `targeted-content-default-${viewport.label}-open.png`,
      { fullPage: true },
    );
  }
});

test.describe("Targeted content (fallback)", () => {
  test.use({ javaScriptEnabled: false });

  test("visual regression check", async ({ page }) => {
    await page.goto(componentUrl("targeted_content/default"));
    await expect(page).toHaveScreenshot("targeted-content-fallback.png");
  });
});
