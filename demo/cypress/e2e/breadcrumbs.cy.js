describe("Breadcrumbs", () => {
  it("renders a breadcrumb trail", () => {
    cy.visitComponentUrl("breadcrumbs/collapsing");

    cy.findByRole("link", { name: "Home" }).should("be.visible");
    cy.findByRole("link", { name: "Immigration" }).should("be.visible");
    cy.findByText("Staying in the UK").should("be.visible");
  });

  it("only renders a single item on smalls screens", () => {
    cy.visitComponentUrl("breadcrumbs/collapsing");
    cy.viewport("iphone-6");

    cy.findByText("Home").should("not.be.visible");
    cy.findByRole("link", { name: /Immigration/ }).should("be.visible");
    cy.findByText("Staying in the UK").should("not.be.visible");
  });
});
