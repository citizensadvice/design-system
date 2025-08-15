describe('Form builder', function () {
  it('can submit the form', function () {
    cy.visit('/form-builder-sample');
    stepStart();
    stepTextFields();
    stepTextAreas();
    stepDateField();
    stepRadioGroup();
    stepSuccess();
  });

  function stepStart() {
    cy.findByRole('heading', {
      name: 'Example form builder form',
    }).should('be.visible');

    cy.findByRole('button', { name: /Start/ }).click();
  }

  function stepTextFields() {
    submitStep();

    assertErrorMessages(["Default text field can't be blank"]);

    cy.findByLabelText('Default text field', { exact: false }).type(
      'Example response',
    );

    submitStep();
  }

  function stepTextAreas() {
    submitStep();

    assertErrorMessages(["Default text area can't be blank"]);

    cy.findByLabelText('Default text area', { exact: false }).type(
      'Example response',
    );

    submitStep();
  }

  function stepDateField() {
    cy.findByRole('heading', { name: 'Date of birth' }).should('be.visible');

    cy.findByRole('group', {
      name: 'Date of birth',
    }).within(() => {
      cy.findByLabelText('Day').type(12);
      cy.findByLabelText('Month').type(12);
      cy.findByLabelText('Year').type(2099);
    });

    submitStep();

    assertErrorMessages([/Date of birth must be less than/]);

    cy.findByRole('group', {
      name: 'Date of birth',
    }).within(() => {
      cy.findByLabelText('Day').clear().type(12);
      cy.findByLabelText('Month').clear().type(12);
      cy.findByLabelText('Year').clear().type(1980);
    });

    submitStep();
  }

  function stepRadioGroup() {
    cy.findByRole('heading', { name: 'Favourite drink' }).should('be.visible');
    cy.findByLabelText('Coffee').click();
    submitForm();
  }

  function stepSuccess() {
    cy.findByRole('heading', {
      name: 'Thank you for your submission',
    }).should('be.visible');
  }

  function submitStep() {
    cy.findByRole('button', { name: /Next/ }).click();
  }

  function submitForm() {
    cy.findByRole('button', { name: /Submit/ }).click();
  }

  function assertErrorMessages(messages) {
    cy.findByTestId('error-summary').within(() => {
      messages.forEach((message) => {
        cy.findByText(message).should('be.visible');
      });
    });
  }
});
