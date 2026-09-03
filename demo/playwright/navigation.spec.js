import { test, expect } from "@playwright/test";
import { componentUrl, expectNoAxeViolations } from "./playwright-helpers";

// Visual regression tests handled in header.spec.js,
// these tests focus on header interaction and greedy nav behaviour
test.describe("Header", () => {
  test("no greed navigation on large screens", async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation"));
    await page.setViewportSize({ width: 1440, height: 860 });

    const moreButton = await page.getByRole("button", { name: /More/i });
    await expect(moreButton).not.toBeVisible();
    await expect(page.locator(".cads-greedy-nav")).toHaveAttribute(
      "aria-haspopup",
      "false",
    );
  });

  test("when greedy navigation is first triggered", async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation"));
    await page.setViewportSize({ width: 800, height: 600 });

    const greedyNav = page.locator(".cads-greedy-nav");

    await expect(greedyNav).toHaveAttribute("aria-haspopup", "true");

    const moreButton = page.getByRole("button", { name: /More/i });

    await expect(moreButton).toHaveAttribute(
      "aria-controls",
      "cads-greedy-nav-dropdown",
    );

    await moreButton.click();

    await expectItemsInMainNavigation(page, [
      "Benefits",
      "Work",
      "Debt and money",
      "Consumer",
      "Housing",
      "Family",
      "Law and courts",
    ]);

    await expectItemsInGreedyNavigation(page, [
      "Immigration",
      "Health",
      "More from us",
    ]);
  });

  test("when on a small screen", async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation"));
    await page.setViewportSize({ width: 375, height: 667 });
    const moreButton = page.getByRole("button", { name: /More/i });
    await moreButton.click();
    await expectItemsInMainNavigation(page, ["Benefits", "Work"]);
    await expectItemsInGreedyNavigation(page, [
      "Debt and money",
      "Consumer",
      "Housing",
      "Family",
      "Law and courts",
      "Immigration",
      "Health",
      "More from us",
      "AdviserNet",
      "Cymraeg",
      "Sign in",
    ]);
  });

  test("when on a small screen with a short nav", async ({ page }) => {
    await page.goto(componentUrl("header/with_short_navigation"));
    await page.setViewportSize({ width: 375, height: 667 });
    const moreButton = page.getByRole("button", { name: /More/i });
    await moreButton.click();
    await expectItemsInMainNavigation(page, ["Home"]);
    await expectItemsInGreedyNavigation(page, [
      "AdviserNet",
      "Cymraeg",
      "Sign in",
    ]);
  });

  test("when interacting with a mouse", async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation"));
    await page.setViewportSize({ width: 375, height: 667 });

    const moreButton = page.getByRole("button", { name: /More/i });
    const closeButton = page.getByRole("button", { name: /Close/i });

    await moreButton.click();
    await expectNavigationOpen(page);

    await closeButton.click();
    await expectNavigationClosed(page);
    await moreButton.click();
    await expectNavigationOpen(page);

    // Simulate an outside click
    await page.locator("body").click();
    await expectNavigationClosed(page);
  });

  test("when interacting with a keyboard", async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation"));
    await page.setViewportSize({ width: 375, height: 667 });

    const moreButton = page.getByRole("button", { name: /More/i });

    await moreButton.click();

    const dropdown = page.getByTestId("cads-greedy-nav-dropdown");
    await dropdown.getByText("Sign in").focus();
    await page.keyboard.press("Tab");

    await expectNavigationClosed(page);

    await moreButton.click();
    await page.keyboard.press("Escape");

    await expectNavigationClosed(page);
  });

  test("when in welsh", async ({ page }) => {
    await page.goto(componentUrl("header/with_navigation?locale=cy"));
    await page.setViewportSize({ width: 375, height: 667 });
    await page.getByRole("button", { name: /Mwy/i }).click();
    await page.getByRole("button", { name: /Cau/i }).click();
  });
});

async function expectNavigationOpen(page) {
  await expect(page.getByText("More from us")).toBeVisible();
}

async function expectNavigationClosed(page) {
  await expect(page.getByText("More from us")).not.toBeVisible();
}

async function expectItemsInMainNavigation(page, expected) {
  const items = page.locator(".cads-navigation > ul a:visible");
  await expect(items).toHaveText(expected);
}

async function expectItemsInGreedyNavigation(page, expected) {
  const items = page.locator(".cads-greedy-nav > ul a:visible");
  await expect(items).toHaveText(expected);
}
