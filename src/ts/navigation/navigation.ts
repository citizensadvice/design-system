/**
 * The global navigation uses a "greedy" navigation pattern to allow as many
 * links to be visible as possible. As the width of the viewport is restricted,
 * navigation links fall into a collapsible section. On smaller viewports any links
 * that appear in the header links section in the header are also copied into the navigation.
 *
 * import { initNavigation } from '@citizensadvice/design-system/lib';
 * initNavigation();
 *
 * There is no configuration for the component. Labels are translated through
 * data attributes on the the container element. Translations are provided by
 * the ViewComponent and bundled as part of the Rails engine.
 *
 * This component uses an inline SVG icon for the toggle icon which a
 * version of the ArrowDown component HTML. The icon is rotated in CSS when
 * active rather than inlining two dedicated icons.
 */
function isExpanded(toggle: Element) {
  const ariaExpanded = toggle.getAttribute('aria-expanded');
  return ariaExpanded === 'true';
}

function getToggleEl(containerEl: HTMLElement) {
  return containerEl.querySelector(
    `button[aria-controls='cads-greedy-nav-dropdown']`,
  ) as HTMLButtonElement;
}

function getDropdownEl(containerEl: HTMLElement) {
  // The dropdown has a unique ID but query against the container for consistency
  return containerEl.querySelector('#cads-greedy-nav-dropdown') as HTMLElement;
}

function getMainNavEl(containerEl: HTMLElement) {
  // The menu is just the first element child of the container
  return containerEl.firstElementChild as HTMLElement;
}

function extractDataAttributes(containerEl: HTMLElement) {
  const getData = (name: string) =>
    containerEl.getAttribute(`data-dropdown-${name}`);

  return {
    label: getData('label') || 'More',
    labelClose: getData('label-close') || 'Close',
    ariaLabel: getData('aria-label') || 'More navigation options',
    ariaLabelClose: getData('aria-label-close') || 'Close navigation',
  };
}

function buildToggle(containerEl: HTMLElement, dropdownId: string) {
  const data = extractDataAttributes(containerEl);

  const toggleId = 'cads-greedy-nav-toggle';

  return `<button type="button"
    class="cads-greedy-nav__toggle"
    id="${toggleId}"
    data-testid="${toggleId}"
    aria-controls="${dropdownId}"
    aria-expanded="false"
    aria-label="${data.ariaLabel}"
  >
    <span class="cads-greedy-nav__toggle-label">${data.label}</span>
    <svg class="cads-greedy-nav__toggle-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="m8 8.73 4.06-4.005a.57.57 0 0 1 .804 0l.97.956a.561.561 0 0 1 0 .794l-5.43 5.36a.567.567 0 0 1-.806 0l-5.43-5.36a.56.56 0 0 1 0-.794l.97-.956a.57.57 0 0 1 .803 0l4.06 4.005Z" />
    </svg>
  </button>`;
}

function buildNavDropdown(dropdownId: string) {
  const navDropdown = document.createElement('ul');
  navDropdown.setAttribute('id', dropdownId);
  navDropdown.setAttribute('data-testid', dropdownId);
  navDropdown.classList.add('cads-greedy-nav__dropdown');

  const headerLinks = document.querySelector('.js-cads-copy-into-nav');

  if (headerLinks) {
    // Clone header links into navigation
    const headerLinksClone = headerLinks.cloneNode(true);
    const headerLinksContainer = document.createElement('li');
    headerLinksContainer.className = 'cads-greedy-nav__header-links';
    headerLinksContainer.appendChild(headerLinksClone);

    navDropdown.appendChild(headerLinksContainer);
  }

  return navDropdown;
}

function prepareHtml(containerEl: HTMLElement) {
  const mainNavEl = getMainNavEl(containerEl);

  const toggleWrapper = document.createElement('div');
  toggleWrapper.classList.add('cads-greedy-nav');

  const dropdownId = 'cads-greedy-nav-dropdown';

  toggleWrapper.insertAdjacentHTML(
    'beforeend',
    buildToggle(containerEl, dropdownId),
  );

  toggleWrapper.appendChild(buildNavDropdown(dropdownId));

  mainNavEl.insertAdjacentElement('afterend', toggleWrapper);
}

function setToggleVisibility(containerEl: HTMLElement, breaks: number[]) {
  const toggleEl = getToggleEl(containerEl);

  if (breaks.length < 1) {
    toggleEl.parentElement?.setAttribute('aria-haspopup', 'false');
  } else {
    toggleEl.parentElement?.setAttribute('aria-haspopup', 'true');
  }
}

function openDropDown(containerEl: HTMLElement) {
  const data = extractDataAttributes(containerEl);
  const toggleEl = getToggleEl(containerEl);
  const dropdownEl = getDropdownEl(containerEl);

  toggleEl.setAttribute('aria-expanded', 'true');
  dropdownEl.setAttribute('aria-hidden', 'false');

  toggleEl.firstElementChild!.textContent = data.labelClose;
  toggleEl.setAttribute('aria-label', data.ariaLabelClose);
}

function closeDropDown(containerEl: HTMLElement) {
  const data = extractDataAttributes(containerEl);
  const toggleEl = getToggleEl(containerEl);
  const dropdownEl = getDropdownEl(containerEl);

  toggleEl.setAttribute('aria-expanded', 'false');
  dropdownEl.setAttribute('aria-hidden', 'true');

  toggleEl.firstElementChild!.textContent = data.label;
  toggleEl.setAttribute('aria-label', data.ariaLabel);
}

function toDropdown(containerEl: HTMLElement) {
  const navDropdown = getDropdownEl(containerEl);
  const mainNav = getMainNavEl(containerEl);

  if (mainNav && mainNav.children.length > 0 && mainNav.lastElementChild) {
    if (navDropdown.firstChild) {
      navDropdown.insertBefore(
        mainNav.lastElementChild,
        navDropdown.firstChild,
      );
    } else {
      navDropdown.appendChild(mainNav.lastElementChild);
    }
  }
}

function toMenu(containerEl: HTMLElement) {
  const navDropdown = getDropdownEl(containerEl);
  const mainNav = getMainNavEl(containerEl);

  if (
    mainNav &&
    navDropdown &&
    navDropdown.children.length > 0 &&
    navDropdown.firstElementChild
  ) {
    mainNav.appendChild(navDropdown.firstElementChild);
  }
}

function computeContentWidth(containerEl: HTMLElement) {
  const styles = window.getComputedStyle(containerEl);
  const padding =
    parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

  return containerEl.clientWidth - padding;
}

function computeChildrenOffsetWidth(containerEl: HTMLElement) {
  const children = containerEl.childNodes;

  let sum = 0;
  for (let i = 0; i < children.length; i++) {
    const child = <HTMLElement>children[i];

    if (child.nodeType !== 3 && !Number.isNaN(child.offsetWidth)) {
      sum += child.offsetWidth;
    }
  }

  return sum;
}

function doesItFit(containerEl: HTMLElement, breaks: number[]) {
  const mainNav = getMainNavEl(containerEl);

  let currentContentWidth = computeContentWidth(containerEl);
  let currentChildrenOffsetWidth = computeChildrenOffsetWidth(containerEl);

  while (
    currentContentWidth <= currentChildrenOffsetWidth &&
    mainNav.children.length > 0
  ) {
    toDropdown(containerEl);

    breaks.push(currentChildrenOffsetWidth);

    setToggleVisibility(containerEl, breaks);

    currentContentWidth = computeContentWidth(containerEl);
    currentChildrenOffsetWidth = computeChildrenOffsetWidth(containerEl);
  }

  while (currentContentWidth >= breaks[breaks.length - 1]) {
    toMenu(containerEl);

    breaks.pop();

    setToggleVisibility(containerEl, breaks);
  }

  setToggleVisibility(containerEl, breaks);
}

function addResizeObserver(containerEl: HTMLElement) {
  let isInitialised = false;
  const breaks: number[] = [];

  let timer: number;
  const observer = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      doesItFit(containerEl, breaks);

      // Only add initialised class once we've actually
      // moved some items into the navigation for the
      // first time.
      if (!isInitialised) {
        document.body.classList.add('cads-has-greedy-nav');
        isInitialised = true;
      }
    }, 50);
  });

  // This will fire when observed, which is desirable.
  // Use this to set up the initial state of the dropdown.
  observer.observe(containerEl);
}

function addToggleHandler(containerEl: HTMLElement) {
  const toggleEl = getToggleEl(containerEl);

  toggleEl.addEventListener('mouseup', (event: MouseEvent) => {
    if (isExpanded(toggleEl)) {
      closeDropDown(containerEl);
    } else {
      openDropDown(containerEl);
    }
  });
}

function addFocusoutHandler(containerEl: HTMLElement) {
  const navDropdownEl = getDropdownEl(containerEl);

  navDropdownEl.addEventListener('focusout', (event) => {
    const target = <HTMLElement>event.relatedTarget || document.activeElement;
    if (navDropdownEl.contains(target)) {
      return;
    }

    closeDropDown(containerEl);
  });
}

function addClickOutsideHandler(containerEl: HTMLElement) {
  const toggleEL = getToggleEl(containerEl);
  const navDropdownEl = getDropdownEl(containerEl);

  document.addEventListener('click', (event) => {
    if ('composedPath' in event) {
      const withinBoundaries =
        event.composedPath().includes(toggleEL) ||
        event.composedPath().includes(navDropdownEl);
      if (!withinBoundaries) {
        closeDropDown(containerEl);
      }
    }
  });
}

function addTabKeyHandler(containerEl: HTMLElement) {
  getToggleEl(containerEl).addEventListener('keyup', (event) => {
    if (!event.shiftKey && event.key === 'Tab') {
      openDropDown(containerEl);
    }
  });
}

function addEscapeKeyHandler(containerEl: HTMLElement) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropDown(containerEl);
    }
  });
}

export default function initNavigation() {
  const containerEl = document.querySelector<HTMLElement>(
    '.js-cads-greedy-nav',
  );

  if (containerEl) {
    prepareHtml(containerEl);
    addResizeObserver(containerEl);
    addToggleHandler(containerEl);
    addFocusoutHandler(containerEl);
    addClickOutsideHandler(containerEl);
    addTabKeyHandler(containerEl);
    addEscapeKeyHandler(containerEl);
  }
}
