import { test, expect } from "@playwright/test";
import {
  componentUrl,
  viewports,
  defaultViewports,
  expectNoAxeViolations,
} from "./playwright-helpers";

test("Pagination", async ({ page }) => {
  // Uses the with_dynamic_query_parameters preview which is a
  // working pagination example to test interaction states.
  await page.goto(componentUrl("pagination/with_dynamic_query_parameters"));

  await expectNoAxeViolations(page);

  for (const viewport of defaultViewports) {
    await page.setViewportSize(viewport);
    await expect(page).toHaveScreenshot(`pagination-${viewport.label}.png`);
  }

  await expectCurrentPage(page, 1);

  await expect(page).toHaveScreenshot("pagination-page-1.png");

  await page.getByText("Next").click();
  await expectCurrentPage(page, 2);

  await expect(page).toHaveScreenshot("pagination-page-2.png");

  await page.getByText("Last").click();
  await expectCurrentPage(page, 100);

  await expect(page).toHaveScreenshot("pagination-page-last.png");

  await page.getByText("Previous").click();
  await expectCurrentPage(page, 99);

  await page.getByText("First").click();
  await expectCurrentPage(page, 1);
});

async function expectCurrentPage(page, pageNum) {
  const pageLink = page.getByRole("link", { name: `Go to page ${pageNum}` });
  await expect(pageLink).toHaveAttribute("aria-current", "page");
}
