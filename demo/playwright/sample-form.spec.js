import { test, expect } from "@playwright/test";
import {
  componentUrl,
  expectNoAxeViolations,
  defaultViewports,
} from "./playwright-helpers";

test.describe("Sample form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/form-sample", { waitUntil: "networkidle" });
  });

  test("visual regression check", async ({ page }) => {
    for (const viewport of defaultViewports) {
      await page.setViewportSize(viewport);
      await expect(page).toHaveScreenshot(`sample-form-${viewport.label}.png`, {
        fullPage: true,
      });
    }
  });

  test("visual regression check (with errors)", async ({ page }) => {
    await submitForm(page);
    await expect(page).toHaveScreenshot(`sample-form-with-errors.png`, {
      fullPage: true,
    });
  });

  test("shows and anchors to errors", async ({ page }) => {
    await submitForm(page);

    await expectErrorMessagesFor(page, [
      "Enter your first name",
      "Enter your last name",
      "Provide details of your complaint or enquiry",
      "Tell us the total amount paid for the goods or services",
      "Tell us the date you purchased the goods or services",
      "Tell us if you have contacted the trader about this complaint",
    ]);

    // Test anchoring to errors
    await page.getByRole("link", { name: "Enter your first name" }).click();
    await expect(
      page.locator('input[name="example_form[first_name]"]'),
    ).toBeFocused();
  });

  test("validates date inputs", async ({ page }) => {
    const group = page.getByRole("group", {
      name: "When did you purchase the goods or services?",
    });
    await group.getByLabel("Day").fill("12");
    await group.getByLabel("Month").fill("12");
    await group.getByLabel("Year").fill("2099");

    await submitForm(page);

    await expectErrorMessagesFor(page, [
      "Date of purchase must be in the past",
    ]);
  });

  test("renders hidden input for checkboxes", async ({ page }) => {
    await expect(
      page.locator('input[type=hidden][name="example_form[confirmation]"]'),
    ).toHaveValue("0");
  });

  test("shows success message on completion", async ({ page }) => {
    await page.getByLabel("First name").fill("Example");
    await page.getByLabel("Last name").fill("Person");
    await page.getByLabel("Your complaint or enquiry").fill("Example enquiry");

    await page.getByLabel("Currency").selectOption({ label: "£ GBP" });
    await page.getByLabel(/What was the total amount paid/).fill("£1500");

    const purchaseGroup = page.getByRole("group", {
      name: "When did you purchase the goods or services?",
    });

    await purchaseGroup.getByLabel("Day").fill("1");
    await purchaseGroup.getByLabel("Month").fill("1");
    await purchaseGroup.getByLabel("Year").fill("2025");

    const contactGroup = page.getByRole("group", {
      name: "Have you contacted the trader about this complaint?",
    });

    await contactGroup.getByLabel("Yes").check();

    await page
      .getByLabel(/Outline the trader's response/)
      .fill("Example response");

    const contactConsentCheckbox = page.getByLabel(
      "Happy for us to contact you?",
    );

    await contactConsentCheckbox.check();
    await expect(contactConsentCheckbox).toBeChecked();

    await submitForm(page);

    const successMessage = page.getByRole("heading", {
      name: "Thank you for your submission",
    });
    await expect(successMessage).toBeVisible();
  });
});

async function submitForm(page) {
  await page.getByRole("button", { name: "Submit complaint" }).click();
}

async function expectErrorMessagesFor(page, messages) {
  const errorSummary = page.getByTestId("error-summary");

  for (const message of messages) {
    await expect(errorSummary.getByText(message)).toBeVisible();
  }
}
