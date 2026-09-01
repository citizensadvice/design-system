import { test, expect } from "@playwright/test";

test("Sample multi page form", async ({ page }) => {
  await page.goto("/form-builder-sample");

  await stepStart(page);
  await stepTextField(page);
  await stepTextFieldPageHeading(page);
  await stepTextArea(page);
  await stepDateField(page);
  await stepRadioGroup(page);
  await stepSuccess(page);
});

async function stepStart(page) {
  await expectScreenshotFor(page, "start");
  await expect(
    page.getByRole("heading", { name: "Example form builder form" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Start/ }).click();
}

async function stepTextField(page) {
  await expectScreenshotFor(page, "text-field");
  await submitStep(page);
  await expectErrorMessagesFor(page, ["Default text field can't be blank"]);
  await page.getByLabel("Default text field").fill("Example response");
  await submitStep(page);
}

async function stepTextFieldPageHeading(page) {
  await expectScreenshotFor(page, "text-field-page-heading");
  await page.getByLabel("Text field page heading").fill("Example response");
  await submitStep(page);
}

async function stepTextArea(page) {
  await expectScreenshotFor(page, "text-area");
  await submitStep(page);
  await expectErrorMessagesFor(page, ["Default text area can't be blank"]);
  await page.getByLabel("Default text area").fill("Example response");
  await submitStep(page);
}

async function stepDateField(page) {
  await expectScreenshotFor(page, "date-field");

  await expect(
    page.getByRole("heading", { name: "Date of birth" }),
  ).toBeVisible();

  const dobGroup = page.getByRole("group", { name: "Date of birth" });
  await dobGroup.getByLabel("Day").fill("12");
  await dobGroup.getByLabel("Month").fill("12");
  await dobGroup.getByLabel("Year").fill("2099");

  await submitStep(page);

  await expectErrorMessagesFor(page, [/Date of birth must be less than/]);

  await dobGroup.getByLabel("Day").fill("12");
  await dobGroup.getByLabel("Month").fill("12");
  await dobGroup.getByLabel("Year").fill("1980");

  await submitStep(page);
}

async function stepRadioGroup(page) {
  await expectScreenshotFor(page, "radio-group");
  await expect(
    page.getByRole("heading", { name: "Favourite drink" }),
  ).toBeVisible();
  await page.getByLabel("Coffee").check();
  await submitForm(page);
}

async function stepSuccess(page) {
  await expectScreenshotFor(page, "success");
  await expect(
    page.getByRole("heading", { name: "Thank you for your submission" }),
  ).toBeVisible();
}

async function submitStep(page) {
  await page.getByRole("button", { name: /Next/ }).click();
}

async function submitForm(page) {
  await page.getByRole("button", { name: /Submit/ }).click();
}

async function expectErrorMessagesFor(page, messages) {
  const errorSummary = page.getByTestId("error-summary");

  for (const message of messages) {
    await expect(errorSummary.getByText(message)).toBeVisible();
  }
}

async function expectScreenshotFor(page, stepName) {
  await expect(page).toHaveScreenshot(
    `sample-form-builder-step-${stepName}.png`,
    { fullPage: true },
  );
}
