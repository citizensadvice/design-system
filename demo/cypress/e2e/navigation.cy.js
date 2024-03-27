describe('Navigation', () => {
  it('allows opening and closing the greedy navigation', () => {
    setupComponent();
    openNavigation();
    assertNavigationOpen();
    closeNavigation();
    assertNavigationClosed();
  });

  it('supports opening the greedy navigation with the tab key', () => {
    setupComponent();
    tabIntoNavigation();
    assertNavigationOpen();
  });

  it('closes the greedy navigation when tabbing out', () => {
    setupComponent();
    openNavigation();
    cy.findByTestId('cads-greedy-nav-dropdown').within(() => {
      cy.findByText('Sign in').focus().tab();
      assertNavigationClosed();
    });
  });

  it('closes the greedy navigation when pressing the escape key', () => {
    setupComponent();
    openNavigation().type('{esc}');
    assertNavigationClosed();
  });

  it('closes the greedy navigation when clicking outside it', () => {
    setupComponent();
    openNavigation();
    assertNavigationOpen();
    cy.get('body').click();
    assertNavigationClosed();
  });

  it('has translated labels when viewing in welsh locale', () => {
    setupComponent('cy');
    openNavigation(/Mwy/i);
    assertNavigationOpen();
    closeNavigation(/Cau/i);
    assertNavigationClosed();
  });

  function setupComponent(locale = 'en') {
    cy.visitComponentUrl('header/with_navigation', locale);
    cy.viewport('iphone-6');
  }

  function openNavigation(name = /More/i) {
    return cy
      .findByRole('button', { name: name })
      .should('be.visible')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .should('have.attr', 'aria-controls', 'cads-greedy-nav-dropdown');
  }

  function closeNavigation(name = /Close/i) {
    return cy
      .findByRole('button', { name: name })
      .should('be.visible')
      .click()
      .should('have.attr', 'aria-expanded', 'false');
  }

  function tabIntoNavigation(name = /More/i) {
    return cy
      .findByRole('button', { name: name })
      .should('be.visible')
      .focus()
      .tab()
      .tab();
  }

  function assertNavigationOpen() {
    cy.findByText('More from us').should('be.visible');
  }

  function assertNavigationClosed() {
    cy.findByText('More from us').should('not.be.visible');
  }
});
