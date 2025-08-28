describe("Targeted content", () => {
  it("should allow toggling targeted content", () => {
    cy.visitComponentUrl("targeted_content/default");

    assertClosed();

    cy.findByRole("button", { name: /If you are/i })
      .should("have.attr", "aria-expanded", "false")
      .click()
      .should("have.attr", "aria-expanded", "true");

    assertOpen();

    cy.findByText("Close").click();
    assertClosed();
  });

  it("should open targeted content when anchoring", () => {
    cy.visitComponentUrl("targeted_content/anchor");

    cy.findByText("Jump to targeted content").click();

    assertOpen();
    cy.scrolledIntoView(".cads-targeted-content");
  });

  function assertOpen() {
    cy.findByText(/You should apply to the EU Settlement Scheme if/).should(
      "be.visible",
    );
  }

  function assertClosed() {
    cy.findByText(/You should apply to the EU Settlement Scheme if/).should(
      "not.be.visible",
    );
  }
});
