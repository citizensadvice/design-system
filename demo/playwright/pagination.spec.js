import { describe, test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

describe("Pagination", () => {
  test.beforeEach(async ({ page }) => {
    // Uses the with_dynamic_query_parameters preview which is a
    // working pagination example to test interaction states.
    await page.goto(componentUrl("pagination/with_dynamic_query_parameters"));
  });

  test("accessibility check", async ({ page }) => {
    await expectNoAxeViolations(page);
  });

  for (const viewport of defaultViewports) {
    test(`visual regression check ${viewport.label} (first page)`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(
        `pagination-page-1-${viewport.label}.png`,
      );
    });

    test(`visual regression check ${viewport.label} (second page)`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.getByText("Next").click();
      await expect(page).toHaveScreenshot(
        `pagination-page-2-${viewport.label}.png`,
      );
    });

    test(`visual regression check ${viewport.label} (last page)`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.getByText("Last").click();
      await expect(page).toHaveScreenshot(
        `pagination-page-last-${viewport.label}.png`,
      );
    });
  }

  test("interaction check", async ({ page }) => {
    await expectCurrentPage(page, 1);

    await page.getByText("Next").click();
    await expectCurrentPage(page, 2);

    await page.getByText("Last").click();
    await expectCurrentPage(page, 100);

    await page.getByText("Previous").click();
    await expectCurrentPage(page, 99);

    await page.getByText("First").click();
    await expectCurrentPage(page, 1);
  });
});

async function expectCurrentPage(page, pageNum) {
  const pageLink = page.getByRole("link", { name: `Go to page ${pageNum}` });
  await expect(pageLink).toHaveAttribute("aria-current", "page");
}
