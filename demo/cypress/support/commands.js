import '@testing-library/cypress/add-commands';
import 'cypress-axe';
import 'cypress-plugin-tab';

Cypress.Commands.add('visitComponentUrl', (urlPart) => {
  cy.visit(`/rails/view_components/citizens_advice_components/${urlPart}`);
});

Cypress.Commands.add('scrolledIntoView', (selector) => {
  // Assert scrolled into view
  // https://codewithhugo.com/cypress-scroll-assertions/
  cy.get(selector)
    .then((element) => element[0].offsetTop)
    .then((offset) =>
      cy
        .window()
        .its('scrollY')
        .should('be.gte', offset - 1)
        .should('be.lte', offset + 1)
    );
});

function terminalLog(violations) {
  const vl = violations.length;
  const xA11yViolations = `${vl} accessibility violation${vl === 1 ? '' : 's'}`;
  const wereDetected = ` ${vl === 1 ? 'was' : 'were'} detected`;
  cy.task('log', xA11yViolations + wereDetected);

  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    })
  );

  cy.task('table', violationData);
}

/**
 * A11y check with axe-core
 * @see https://github.com/avanslaars/cypress-axe
 */
Cypress.Commands.add('runAxe', () => {
  cy.injectAxe();

  cy.configureAxe({
    rules: [
      // Skip links are missing a unique landmark name
      { id: 'landmark-unique', enabled: false },

      // Table overflow needs to be focusable
      { id: 'scrollable-region-focusable', enabled: false },

      // Disable rules which need a full page.
      // We run axe checks against component previews.
      { id: 'landmark-one-main', enabled: false },
      { id: 'page-has-heading-one', enabled: false },
      { id: 'region', enabled: false },
    ],
  });

  cy.checkA11y(null, null, terminalLog);
});
