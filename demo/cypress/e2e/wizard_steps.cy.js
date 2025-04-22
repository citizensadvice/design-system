describe('Wizard steps form', function () {
  context('when on the text area step', () => {
    beforeEach(() => {
      cy.visit('/wizard-steps-example');
      clickButton('Start');
    });

    it('validates the required textarea', function () {
      clickButton('Next');

      assertErrorMessages(["Required text area can't be blank"]);
    });
  });

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
