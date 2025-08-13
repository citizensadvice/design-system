describe('Skip links', () => {
  beforeEach(() => {
    cy.visit('/content-sample');
  });

  it('allows skipping to content', () => {
    clickSkipLink('Skip to main content');
    cy.scrolledIntoView('#cads-main-content');
  });

  function clickSkipLink(name) {
    cy.findByText(name).focus().should('be.visible').click();
  }
});
