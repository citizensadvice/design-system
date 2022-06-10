context('Accessibility', () => {
  it('all component previews pass a basic accessibility and html validation check', () => {
    cy.visit('/rails/view_components');
    cy.get('li a').then((tags) => {
      Array.from(tags)
        .map((t) => t.href)
        .forEach((href) => {
          cy.visit(href);
          cy.runAxe();
          cy.get('#content').htmlvalidate();
        });
    });
  });
});
