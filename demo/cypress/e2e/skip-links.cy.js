describe('Skip links', () => {
  beforeEach(() => {
    cy.visit('/content-sample');
  });

  it('allows skipping to navigation', () => {
    clickSkipLink('Skip to navigation');
    cy.scrolledIntoView('#cads-navigation');
  });

  it('allows skipping to content', () => {
    clickSkipLink('Skip to main content');
    cy.scrolledIntoView('#cads-main-content');
  });

  it('allows skipping to footer', () => {
    // Test at a smaller viewport to make scroll test simpler.
    cy.viewport('iphone-8', 'portrait');
    clickSkipLink('Skip to footer');
    cy.scrolledIntoView('#cads-footer');
  });

  function clickSkipLink(name) {
    cy.findByText(name).focus().should('be.visible').click();
  }
});
