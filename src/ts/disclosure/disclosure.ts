import initShowHideWithToggle from '../utils/show-hide';

const selectors = {
  component: '.js-disclosure',
  toggle: '.js-disclosure-toggle',
};

const classes = {
  toggleWhenHidden: 'cads-icon_plus',
  toggleWhenShowing: 'cads-icon_minus',
  elementIsOpen: 'cads-disclosure__details--open',
};

const attributes = {
  labelWhenHidden: 'data-label-when-hiding',
  labelWhenShowing: 'data-label-when-showing',
  target: 'data-toggle-target-id',
};

const disclosureSelectors = {
  summary: '.js-disclosure-summary',
  details: '.js-disclosure-details',
};

const disclosureAttributes = {
  closedSummary: 'data-closed-summary',
  openSummary: 'data-open-summary',
};
function initDisclosureToggle(disclosure: Element) {
  const toggle = disclosure.querySelector(selectors.toggle);
  const summary = disclosure.querySelector(disclosureSelectors.summary);
  const details = disclosure.querySelector(disclosureSelectors.details);

  toggle?.addEventListener('click', () => {
    if (toggle && summary && details) {
      if (details.classList.contains(classes.elementIsOpen)) {
        summary.textContent = toggle.getAttribute(
          disclosureAttributes.openSummary,
        );
      } else {
        summary.textContent = toggle.getAttribute(
          disclosureAttributes.closedSummary,
        );
      }
    }
  });
}

const initDisclosure = (): void => {
  if (selectors.component) {
    initShowHideWithToggle(selectors, classes, attributes);
  }

  const disclosures = document.querySelectorAll(selectors.component);
  for (let i = 0; i < disclosures.length; i++) {
    const disclosure = disclosures[i];
    initDisclosureToggle(disclosure);
  }
};

export default initDisclosure;
