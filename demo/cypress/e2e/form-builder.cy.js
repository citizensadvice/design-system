describe('Form builder', function () {
  it('can submit the form', function () {
    cy.visit('/wizard-steps-example');
    stepStart();
    stepTextAreas();
    stepSuccess();
  });

  function stepStart() {
    cy.findByRole('heading', {
      name: 'Example wizard steps form',
    }).should('be.visible');

    clickButton('Start');
  }

  function stepTextAreas() {
    clickButton('Submit');

    assertErrorMessages(["Required text area can't be blank"]);

    cy.findByLabelText(/Required/).type('Example response');

    clickButton('Submit');
  }

  function stepSuccess() {
    cy.findByRole('heading', {
      name: 'Thank you for your submission',
    }).should('be.visible');
  }

  function clickButton(name) {
    cy.findByRole('button', { name: name }).click();
  }

  function assertErrorMessages(messages) {
    cy.findByTestId('error-summary').within(() => {
      messages.forEach((message) => {
        cy.findByText(message).should('be.visible');
      });
    });
  }
});
