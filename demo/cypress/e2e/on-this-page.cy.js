describe('On this page', () => {
  it('should allow toggling nested links', () => {
    cy.visitComponentUrl('on_this_page/with_nested_links');

    assertClosed();

    cy.findByRole('button', { name: /Show sub-headings for Link 2/i })
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    assertOpen();

    cy.findByRole('button', { name: /Hide sub-headings for Link 2/i })
      .click()
      .should('have.attr', 'aria-expanded', 'false');

    assertClosed();
  });

  function assertOpen() {
    cy.findByText('Link 2.1').should('be.visible');
  }

  function assertClosed() {
    cy.findByText('Link 2.1').should('not.be.visible');
  }
});
