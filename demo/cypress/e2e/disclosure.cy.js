describe("Disclosure", () => {
  it("should allow toggling disclosure", () => {
    cy.visitComponentUrl("disclosure/example");

    assertClosed();

    cy.findByRole("button", { name: /View/i })
      .click()
      .should("have.attr", "aria-expanded", "true");

    assertOpen();

    cy.findByRole("button", { name: /Hide/i })
      .click()
      .should("have.attr", "aria-expanded", "false");

    assertClosed();
  });

  function assertOpen() {
    cy.findByText("Example content").should("be.visible");
  }

  function assertClosed() {
    cy.findByText("Example content").should("not.be.visible");
  }
});
