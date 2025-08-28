describe("Pagination", () => {
  it("should allow paginating", () => {
    /**
     * Uses the with_dynamic_query_parameters preview which is a
     * working pagination example to test interaction states.
     */
    cy.visitComponentUrl("pagination/with_dynamic_query_parameters");

    assertCurrentPage(1);
    cy.findByText("Next").click();
    assertCurrentPage(2);

    cy.findByText("Last").click();
    assertCurrentPage(100);

    cy.findByText("Previous").click();
    assertCurrentPage(99);

    cy.findByText("First").click();
    assertCurrentPage(1);
  });

  function assertCurrentPage(pageNum) {
    cy.findByRole("link", { current: "page" }).should("have.text", pageNum);
  }
});
