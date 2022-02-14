import initShowHideWithToggle from '../utils/show-hide';

const selectors = {
  component: '.js-disclosure',
  toggle: '.js-disclosure-toggle',
  summary: '.js-disclosure-summary',
  details: '.js-disclosure-details',
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

function initDisclosureToggle(disclosure: Element) {
  console.log(disclosure,'disclosure');
  const toggle = disclosure.querySelector(selectors.toggle);
  const summary = disclosure.querySelector(selectors.summary);
  const details = disclosure.querySelector(selectors.details);

  toggle?.addEventListener('click', () => {
    if (toggle && summary && details) {
      if (details.classList.contains(classes.elementIsOpen)) {
        summary.textContent = toggle.getAttribute(attributes.labelWhenShowing);
      } else {
        summary.textContent = toggle.getAttribute(attributes.labelWhenHidden);
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
    console.log('disclosure');
    const disclosure = disclosures[i];
    initDisclosureToggle(disclosure);
  }
};

export default initDisclosure;
