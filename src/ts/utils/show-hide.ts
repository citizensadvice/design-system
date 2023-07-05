type ShowHideSelectors = {
  /** a class selector for the component as a whole (the thing that contains the toggles) */
  component: string;
  /** a class selector for the toggle element (the thing that controls whether the element is shown or hidden */
  toggle: string;
};

type ShowHideClasses = {
  /** styling class for the toggle when the target is hidden */
  toggleWhenHidden: string;
  /** styling class for the toggle when the target is showing */
  toggleWhenShowing: string;
  /** styling class for the target when is it showing */
  elementIsOpen: string;
};

type ShowHideAttributes = {
  /** data attribute name for the aria description label when the target is hidden */
  labelWhenHidden: string;
  /** data attribute name for the aria description label when the target is showing */
  labelWhenShowing: string;
  /** data attribute containing the id of the target to show / hide */
  target: string;
};

/**
 * Adds show / hide functionality to a component, with the following criteria:
 *  - show / hide is controlled by a single element, this is refered to as `toggle` throughout the code
 *  - the element that is being shown or hidden (the target) is closed by default and has a single styleing class
 *    that shows it when added
 *
 * @param selectors     functional class selectors for the component that uses show / hide
 * @param classes       styling classes for the toggle and target
 * @param attributes    data attribute names that contain the target id and the aria descriptions
 */
const initShowHideWithToggle = (
  selectors: ShowHideSelectors,
  classes: ShowHideClasses,
  attributes: ShowHideAttributes,
): void => {
  function toggleElementState(
    toggle: Element,
    ariaDescriptionSelector: string,
  ): void {
    const targetSelector = toggle.getAttribute(attributes.target);
    if (targetSelector) {
      const target = document.getElementById(targetSelector);
      target?.classList.toggle(classes.elementIsOpen);
      toggle.classList.toggle(classes.toggleWhenHidden);
      toggle.classList.toggle(classes.toggleWhenShowing);

      const ariaDescription = toggle.getAttribute(ariaDescriptionSelector);
      if (ariaDescription) {
        toggle.setAttribute('aria-label', ariaDescription);
      }

      const ariaExpanded = toggle.getAttribute('aria-expanded');
      const isExpanded = ariaExpanded === 'true';
      toggle.setAttribute('aria-expanded', (!isExpanded).toString());
    }
  }

  // Used during setup - logic is inverse of toggle
  function initAriaDescription(toggle: Element) {
    const ariaDescriptionSelector = toggle.classList.contains(
      classes.toggleWhenHidden,
    )
      ? attributes.labelWhenHidden
      : attributes.labelWhenShowing;

    const ariaDescription = toggle.getAttribute(ariaDescriptionSelector);
    if (ariaDescription) {
      toggle.setAttribute('aria-label', ariaDescription);
    }
  }

  const init = (component: Element): void => {
    const toggles = component.querySelectorAll(selectors.toggle);

    for (let i = 0; i < toggles.length; i++) {
      const toggle = toggles[i];
      toggle.addEventListener('click', () => {
        let ariaDescriptionSelector = attributes.labelWhenHidden;
        if (toggle.classList.contains(classes.toggleWhenHidden)) {
          ariaDescriptionSelector = attributes.labelWhenShowing;
        }
        toggleElementState(toggle, ariaDescriptionSelector);
      });

      initAriaDescription(toggle);
    }
  };

  const components = document.querySelectorAll(selectors.component);

  for (let i = 0; i < components.length; i++) {
    init(components[i]);
  }
};

export default initShowHideWithToggle;
