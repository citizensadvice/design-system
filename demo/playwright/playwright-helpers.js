import { expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export const viewports = {
  small: { label: "small", width: 320, height: 480 },
  medium: { label: "medium", width: 800, height: 600 },
  large: { label: "large", width: 1024, height: 768 },
};

export const defaultViewports = [
  viewports.small,
  viewports.medium,
  viewports.large,
];

export function componentUrl(path) {
  return `/rails/view_components/${path}`;
}

export function buildAxeFor(page) {
  return new AxeBuilder({ page }).disableRules([
    "landmark-unique",
    "scrollable-region-focusable",
    "landmark-one-main",
    "page-has-heading-one",
    "region",
  ]);
}

export async function expectNoAxeViolations(page) {
  const a11yResults = await buildAxeFor(page).analyze();
  expect(a11yResults.violations).toEqual([]);
}

export async function expectScrolledIntoView(page, locator) {
  const offset = await page.locator(locator).evaluate((el) => el.offsetTop);
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThanOrEqual(offset - 1);
  expect(scrollY).toBeLessThanOrEqual(offset + 1);
}
