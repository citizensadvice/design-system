describe('Sample form', function () {
  beforeEach(function () {
    cy.visit('/form-sample');
  });

  it('shows errors when submitting an empty form', function () {
    submitForm();

    assertErrorMessages([
      'Enter your first name',
      'Enter your last name',
      'Provide details of your complaint or enquiry',
      'Tell us the total amount paid for the goods or services',
      'Tell us the date you purchased the goods or services',
      'Tell us if you have contacted the trader about this complaint',
    ]);
  });

  it('validates date inputs', function () {
    cy.findByRole('group', {
      name: 'When did you purchase the goods or services?',
    }).within(() => {
      cy.findByLabelText('Day').type(12);
      cy.findByLabelText('Month').type(12);
      cy.findByLabelText('Year').type(2099);
    });

    submitForm();

    assertErrorMessages(['Date of purchase must be in the past']);
  });

  it('shows success message on completion', function () {
    cy.findByLabelText('First name').type('Example');

    cy.findByLabelText('Last name').type('Person');

    cy.findByLabelText('Your complaint or enquiry').type('Example enquiry');

    cy.findByLabelText(/What was the total amount paid/).type('£1500');

    cy.findByRole('group', {
      name: 'When did you purchase the goods or services?',
    }).within(() => {
      cy.findByLabelText('Day').type(1);
      cy.findByLabelText('Month').type(1);
      cy.findByLabelText('Year').type(2025);
    });

    cy.findByRole('group', {
      name: 'Have you contacted the trader about this complaint?',
    }).within(() => {
      cy.findByLabelText('Yes').click();
    });

    cy.findByLabelText(/Outline the trader's response/).type(
      'Example response',
    );

    submitForm();

    cy.findByRole('heading', { name: 'Thank you for your submission' }).should(
      'be.visible',
    );
  });

  function submitForm() {
    cy.findByRole('button', { name: 'Submit complaint' }).click();
  }

  function fillPurchaseDate(day, month, year) {
    cy.findByRole('group', {
      name: 'When did you purchase the goods or services?',
    }).within(() => {
      cy.findByLabelText('Day').type(day);
      cy.findByLabelText('Month').type(month);
      cy.findByLabelText('Year').type(year);
    });
  }

  function assertErrorMessages(messages) {
    cy.findByTestId('error-summary').within(() => {
      messages.forEach((message) => {
        cy.findByText(message).should('be.visible');
      });
    });
  }
});
