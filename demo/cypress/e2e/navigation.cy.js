describe('Navigation', () => {
  beforeEach(() => {
    cy.visitComponentUrl('header/with_navigation');
    cy.viewport('iphone-6');
  });

  it('navigation links can be viewed by opening/closing the dropdown', () => {
    openNavigation();
    assertNavigationOpen();
    closeNavigation();
    assertNavigationClosed();
  });

  it('tabbing into the dropdown toggle automatically opens the dropdown menu', () => {
    tabIntoNavigation();
    assertNavigationOpen();
  });

  // NP-1755
  it.skip('tabbing out of the dropdown menu automatically closes it');

  it('can close the dropdown menu using your keyboard', () => {
    openNavigation().type('{esc}');
    assertNavigationClosed();
  });

  it('can close the dropdown menu by clicking outside it', () => {
    openNavigation();
    assertNavigationOpen();
    cy.get('body').click();
    assertNavigationClosed();
  });

  function openNavigation() {
    return cy
      .findByText('More')
      .should('be.visible')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .should('have.attr', 'aria-controls', 'cads-greedy-nav-dropdown');
  }

  function closeNavigation() {
    return cy
      .findByText('Close')
      .should('be.visible')
      .click()
      .should('have.attr', 'aria-expanded', 'false');
  }

  function tabIntoNavigation() {
    cy.findByText('More').should('be.visible').focus().tab().tab();
  }

  function assertNavigationOpen() {
    cy.findByText('More from us').should('be.visible');
  }

  function assertNavigationClosed() {
    cy.findByText('More from us').should('not.be.visible');
  }
});
