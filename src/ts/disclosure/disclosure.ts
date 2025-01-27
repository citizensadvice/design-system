function isExpanded(toggle: Element) {
  const ariaExpanded = toggle.getAttribute('aria-expanded');
  return ariaExpanded === 'true';
}

function setAriaExpanded(toggle: Element, expanded: boolean) {
  toggle.setAttribute('aria-expanded', expanded.toString());
}

function setAriaDescription(toggle: Element) {
  const ariaDescription = isExpanded(toggle)
    ? toggle.getAttribute('data-label-when-showing')
    : toggle.getAttribute('data-label-when-hiding');

  if (ariaDescription) {
    toggle.setAttribute('aria-label', ariaDescription);
  }
}

function setTargetState(toggle: Element) {
  const parentEl = toggle.parentElement;
  const state = isExpanded(toggle) ? 'open' : 'closed';
  parentEl?.setAttribute('data-disclosure-state', state);
}

function setIconClass(toggle: Element) {
  const icon = toggle.querySelector('.cads-icon--plus-minus');
  icon?.classList.toggle('show-minus');
}

function setSummaryText(toggle: Element) {
  const summary = toggle.querySelector('.js-cads-disclosure-summary');

  const newTextContent = isExpanded(toggle)
    ? toggle.getAttribute('data-open-summary')
    : toggle.getAttribute('data-closed-summary');

  if (summary && newTextContent) {
    summary.textContent = newTextContent;
  }
}

function initDisclosureFor(component: Element) {
  const toggles = component.querySelectorAll('.js-cads-disclosure-toggle');

  for (let i = 0; i < toggles.length; i++) {
    const toggle = toggles[i];

    // Set status to false on load (in case not already set)
    // Makes calculating the other states easier as we can rely on the default
    setAriaExpanded(toggle, false);
    setAriaDescription(toggle);
    setTargetState(toggle);

    toggle.addEventListener('click', () => {
      setAriaExpanded(toggle, !isExpanded(toggle));
      setAriaDescription(toggle);
      setIconClass(toggle);
      setSummaryText(toggle);
      setTargetState(toggle);
    });
  }
}

export default function initDisclosure() {
  const components = document.querySelectorAll('.js-cads-disclosure');
  for (let i = 0; i < components.length; i++) {
    initDisclosureFor(components[i]);
  }
}
