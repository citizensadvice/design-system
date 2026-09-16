import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  defaultViewports,
  expectNoAxeViolations,
  expectScrolledIntoView,
} from "../playwright-helpers";

describe("Targeted content (default)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("targeted_content/default"), {
      waitUntil: "networkidle",
    });
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
    await getTitleButton(page).click();
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

  test("initial state", async ({ page }) => {
    await expect(getTitleButton(page)).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(
      page.getByText(/You should apply to the EU Settlement Scheme if/),
    ).not.toBeVisible();
  });

  test("toggle open", async ({ page }) => {
    const titleButton = await getTitleButton(page);
    await titleButton.click();
    await expect(titleButton).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByText(/You should apply to the EU Settlement Scheme if/),
    ).toBeVisible();
  });

  test("toggle closed", async ({ page }) => {
    const titleButton = await getTitleButton(page);
    await titleButton.click();
    await titleButton.click();
    await expect(
      page.getByText(/You should apply to the EU Settlement Scheme if/),
    ).not.toBeVisible();
  });
});

describe("Targeted content (anchor)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("targeted_content/anchor"), {
      waitUntil: "networkidle",
    });
  });

  test("anchors to content", async ({ page }) => {
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
    await getTitleButton(page).click();
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
      await getTitleButton(page).click();

      await expect(page).toHaveScreenshot(
        `targeted-content-adviser-${viewport.label}-open.png`,
        { fullPage: true },
      );
    });
  }
});

function getTitleButton(page) {
  return page.getByTestId("targeted-content-title").getByRole("button");
}

describe("Targeted content (fallback)", () => {
  test.use({ javaScriptEnabled: false });

  test.beforeEach(async ({ page }) => {
    await page.goto(componentUrl("targeted_content/default"));
  });

  test("visual regression check", async ({ page }) => {
    await expect(page).toHaveScreenshot("targeted-content-fallback.png");
  });
});
