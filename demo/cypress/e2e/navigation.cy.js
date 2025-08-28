describe("Navigation", () => {
  context("when on a large screen", () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(1440, 860);
    });

    it("renders navigation with no greedy navigation", () => {
      cy.findByRole("button", { name: /More/i }).should("not.exist");
      cy.get(".cads-greedy-nav").should("have.attr", "aria-haspopup", "false");
    });
  });

  context("when greedy navigation is first triggered", () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(800, 600);
    });

    it("has expected aria attributes", () => {
      cy.get(".cads-greedy-nav").should("have.attr", "aria-haspopup", "true");
      cy.findByRole("button", { name: /More/i }).should(
        "have.attr",
        "aria-controls",
        "cads-greedy-nav-dropdown",
      );
    });

    it("moves navigation items into the greedy navigation", () => {
      cy.findByRole("button", { name: /More/i }).click();
      assertItemsInMainNavigation([
        "Benefits",
        "Work",
        "Debt and money",
        "Consumer",
        "Housing",
        "Family",
        "Law and courts",
      ]);
      assertItemsInGreedyNavigation(["Immigration", "Health", "More from us"]);
    });
  });

  context("when on a small screen", () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(375, 667);
    });

    it("moves navigation items into the greedy navigation including header links", () => {
      cy.findByRole("button", { name: /More/i }).click();
      assertItemsInMainNavigation(["Benefits", "Work"]);

      assertItemsInGreedyNavigation([
        "Debt and money",
        "Consumer",
        "Housing",
        "Family",
        "Law and courts",
        "Immigration",
        "Health",
        "More from us",
        "AdviserNet",
        "Cymraeg",
        "Sign in",
      ]);
    });
  });

  context("when on a small screen with a short nav", () => {
    beforeEach(() => {
      loadComponentExampleWithShortNav();
      cy.viewport(375, 667);
    });

    it("moves header navigation items into the greedy navigation even if no main nav items have been", () => {
      cy.findByRole("button", { name: /More/i }).click();
      assertItemsInMainNavigation(["Home"]);

      assertItemsInGreedyNavigation(["AdviserNet", "Cymraeg", "Sign in"]);
    });
  });

  context("when interacting with a mouse", () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(375, 667);
    });

    it("allows opening and closing the greedy navigation", () => {
      cy.findByRole("button", { name: /More/i }).click();
      assertNavigationOpen();
      cy.findByRole("button", { name: /Close/i }).click();
      assertNavigationClosed();
    });

    it("closes the greedy navigation when clicking outside it", () => {
      cy.findByRole("button", { name: /More/i }).click();
      assertNavigationOpen();
      cy.get("body").click();
      assertNavigationClosed();
    });
  });

  // Note: Tab interaction is a bit fraught to test in Cypress
  // We use https://github.com/dmtrKovalenko/cypress-real-events
  // to approximate this but full keyboard testing should still be
  // done manually when changing this behaviour.
  context("when interacting with a keyboard", () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(375, 667);
    });

    it("closes the greedy navigation when tabbing out", () => {
      cy.findByRole("button", { name: /More/i }).click();
      cy.findByTestId("cads-greedy-nav-dropdown").within(() => {
        cy.findByText("Sign in").focus().realPress("Tab");
        assertNavigationClosed();
      });
    });

    it("closes the greedy navigation when pressing the escape key", () => {
      cy.findByRole("button", { name: /More/i }).click().type("{esc}");
      assertNavigationClosed();
    });
  });

  context("when in english", () => {
    beforeEach(() => {
      loadComponentExample("en");
      cy.viewport(375, 667);
    });

    it("has translated labels when viewing in english locale", () => {
      cy.findByRole("button", { name: /More/i })
        .should("have.attr", "aria-label", "More navigation items")
        .click();
      cy.findByRole("button", { name: /Close/i }).click();
    });
  });

  context("when in welsh", () => {
    beforeEach(() => {
      loadComponentExample("cy");
      cy.viewport(375, 667);
    });

    it("has translated labels when viewing in welsh locale", () => {
      cy.findByRole("button", { name: /Mwy/i }).click();
      assertNavigationOpen();
      cy.findByRole("button", { name: /Cau/i }).click();
      assertNavigationClosed();
    });
  });

  function loadComponentExample(locale = "en") {
    cy.visitComponentUrl("header/with_navigation", locale);
  }

  function loadComponentExampleWithShortNav(locale = "en") {
    cy.visitComponentUrl("header/with_short_navigation", locale);
  }

  function assertNavigationOpen() {
    cy.findByText("More from us").should("be.visible");
  }

  function assertNavigationClosed() {
    cy.findByText("More from us").should("not.be.visible");
  }

  function assertItemsInMainNavigation(expected) {
    const items = [];
    cy.get(".cads-navigation > ul a:visible").each(($el) =>
      items.push($el.text()),
    );
    cy.wrap(items).should("deep.equal", expected);
  }

  function assertItemsInGreedyNavigation(expected) {
    const items = [];
    cy.get(".cads-greedy-nav > ul a:visible").each(($el) =>
      items.push($el.text()),
    );
    cy.wrap(items).should("deep.equal", expected);
  }
});
