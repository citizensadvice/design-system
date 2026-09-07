import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "./playwright-helpers";

describe("Targeted content (default)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("targeted_content/default"), {
      waitUntil: "networkidle",
    });
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);

    await page
      .getByTestId("targeted-content-title")
      .getByRole("button", { name: /If you are/i })
      .click();

    // Recheck accessibility violations
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `targeted-content-default-${viewport.label}.png`,
      );
    });

    test(`visual regression check ${viewport.label} (open)`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page
        .getByTestId("targeted-content-title")
        .getByRole("button", { name: /If you are/i })
        .click();

      await expect(page).toHaveScreenshot(
        `targeted-content-default-${viewport.label}-open.png`,
        { fullPage: true },
      );
    });
  }

  test("interactivity check", async ({ page }) => {
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
  });
});

describe("Targeted content (anchor)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("targeted_content/anchor"), {
      waitUntil: "networkidle",
    });
  });

  test("anchors to content", async ({ page }) => {
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

describe("Targeted content (adviser)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("targeted_content/adviser"), {
      waitUntil: "networkidle",
    });
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);

    await page
      .getByTestId("targeted-content-title")
      .getByRole("button", { name: /Students or/i })
      .click();

    // Recheck accessibility violations
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `targeted-content-adviser-${viewport.label}.png`,
      );
    });

    test(`visual regression check ${viewport.label} (open)`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page
        .getByTestId("targeted-content-title")
        .getByRole("button", { name: /Students or/i })
        .click();

      await expect(page).toHaveScreenshot(
        `targeted-content-adviser-${viewport.label}-open.png`,
        { fullPage: true },
      );
    });
  }
});

describe("Targeted content (fallback)", () => {
  test.use({ javaScriptEnabled: false });

  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("targeted_content/default"));
  });

  test("visual regression check", async ({ page }) => {
    await expect(page).toHaveScreenshot("targeted-content-fallback.png");
  });
});
