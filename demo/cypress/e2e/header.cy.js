describe('Header', () => {
  it('allows toggling search on small screens', () => {
    cy.visitComponentUrl('header/with_navigation');
    cy.viewport('iphone-6');

    assertSearchIsClosed();
    openSearch();
    assertSearchIsOpen();
    closeSearch();
    assertSearchIsClosed();
  });

  function openSearch() {
    cy.findByRole('button', { name: 'Open search' }).click();
  }

  function closeSearch() {
    cy.findByRole('button', { name: 'Close search' }).click();
  }

  function assertSearchIsOpen() {
    return cy
      .findByLabelText('Search through site content')
      .should('be.visible');
  }

  function assertSearchIsClosed() {
    return cy
      .findByLabelText('Search through site content')
      .should('not.be.visible');
  }
});
