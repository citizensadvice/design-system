describe('Navigation', () => {
  context('when on a large screen', () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(1440, 860);
    });

    it('renders navigation with no greedy navigation', () => {
      cy.findByRole('button', { name: /More/i }).should('not.exist');
    });
  });

  context('when greedy navigation is first triggered', () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(800, 600);
    });

    it('moves navigation items into the greedy navigation', () => {
      openNavigation();
      assertItemsInMainNavigation([
        'Benefits',
        'Work',
        'Debt and money',
        'Consumer',
        'Housing',
        'Family',
        'Law and courts',
      ]);
      assertItemsInGreedyNavigation(['Immigration', 'Health', 'More from us']);
    });
  });

  context('when on a small screen', () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(375, 667);
    });

    it('moves navigation items into the greedy navigation including header links', () => {
      openNavigation();
      assertItemsInMainNavigation(['Benefits', 'Work']);

      assertItemsInGreedyNavigation([
        'Debt and money',
        'Consumer',
        'Housing',
        'Family',
        'Law and courts',
        'Immigration',
        'Health',
        'More from us',
        'AdviserNet',
        'Cymraeg',
        'Sign in',
      ]);
    });
  });

  context('when interacting with the greedy navigation', () => {
    beforeEach(() => {
      loadComponentExample();
      cy.viewport(375, 667);
    });

    it('allows opening and closing the greedy navigation', () => {
      openNavigation();
      assertNavigationOpen();
      closeNavigation();
      assertNavigationClosed();
    });

    it('supports opening the greedy navigation with the tab key', () => {
      tabIntoNavigation();
      assertNavigationOpen();
    });

    it('closes the greedy navigation when tabbing out', () => {
      openNavigation();
      cy.findByTestId('cads-greedy-nav-dropdown').within(() => {
        cy.findByText('Sign in').focus().tab();
        assertNavigationClosed();
      });
    });

    it('closes the greedy navigation when pressing the escape key', () => {
      openNavigation().type('{esc}');
      assertNavigationClosed();
    });

    it('closes the greedy navigation when clicking outside it', () => {
      openNavigation();
      assertNavigationOpen();
      cy.get('body').click();
      assertNavigationClosed();
    });
  });

  context('when in welsh', () => {
    beforeEach(() => {
      loadComponentExample('cy');
      cy.viewport(375, 667);
    });

    it('has translated labels when viewing in welsh locale', () => {
      openNavigation(/Mwy/i);
      assertNavigationOpen();
      closeNavigation(/Cau/i);
      assertNavigationClosed();
    });
  });

  function loadComponentExample(locale = 'en') {
    cy.visitComponentUrl('header/with_navigation', locale);
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

  function assertItemsInMainNavigation(expected) {
    const items = [];
    cy.get('.cads-navigation > ul a:visible').each(($el) =>
      items.push($el.text()),
    );
    cy.wrap(items).should('deep.equal', expected);
  }

  function assertItemsInGreedyNavigation(expected) {
    const items = [];
    cy.get('.cads-greedy-nav > ul a:visible').each(($el) =>
      items.push($el.text()),
    );
    cy.wrap(items).should('deep.equal', expected);
  }
});
