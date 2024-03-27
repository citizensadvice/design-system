/* eslint-disable no-console */
import {
  BLUR_EVENT,
  debounce,
  parent,
  relatedTarget,
  getElementContentWidth,
  getChildrenOffsetWidth,
} from './helpers';

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
  return {
    label: containerEl.getAttribute('data-dropdown-label') || 'More',
    labelClose:
      containerEl.getAttribute('data-dropdown-label-close') || 'Close',

    // @TODO: Translated aria-labels
    ariaLabel: 'More navigation options',
    ariaLabelClose: 'Close navigation options',
  };
}

function buildToggle(containerEl: HTMLElement, dropdownId: string) {
  const data = extractDataAttributes(containerEl);

  const toggleId = 'cads-greedy-nav-toggle';

  return `<button type="button"
    class="cads-greedy-nav__dropdown-toggle"
    id="${toggleId}"
    data-testid="${toggleId}"
    aria-controls="${dropdownId}"
    aria-expanded="false"
    aria-label="${data.ariaLabel}"
  >
    ${data.label}
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
  }

  return navDropdown;
}

function prepareHtml(containerEl: HTMLElement) {
  const mainNavEl = getMainNavEl(containerEl);

  const toggleWrapper = document.createElement('div');
  toggleWrapper.classList.add('cads-greedy-nav__wrapper');

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

  toggleEl.innerHTML = data.labelClose;
  toggleEl.setAttribute('aria-label', data.ariaLabelClose);
}

function closeDropDown(containerEl: HTMLElement) {
  const data = extractDataAttributes(containerEl);
  const toggleEl = getToggleEl(containerEl);
  const dropdownEl = getDropdownEl(containerEl);

  toggleEl.setAttribute('aria-expanded', 'false');
  dropdownEl.setAttribute('aria-hidden', 'true');

  toggleEl.innerHTML = data.label;
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

function doesItFit(containerEl: HTMLElement, breaks: number[]) {
  const mainNav = getMainNavEl(containerEl);

  let currentTotalWidth = getElementContentWidth(containerEl);
  let currentRestWidth = getChildrenOffsetWidth(containerEl);

  while (currentTotalWidth <= currentRestWidth && mainNav.children.length > 0) {
    toDropdown(containerEl);

    breaks.push(currentRestWidth);

    setToggleVisibility(containerEl, breaks);

    currentTotalWidth = getElementContentWidth(containerEl);
    currentRestWidth = getChildrenOffsetWidth(containerEl);
  }

  while (currentTotalWidth >= breaks[breaks.length - 1]) {
    toMenu(containerEl);

    breaks.pop();

    setToggleVisibility(containerEl, breaks);
  }

  setToggleVisibility(containerEl, breaks);
}

function addResizeObserver(containerEl: HTMLElement) {
  const breaks: number[] = [];

  const observer = new ResizeObserver(
    debounce(() => {
      doesItFit(containerEl, breaks);
    }, 50),
  );

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
    if (navDropdownEl.contains(relatedTarget(event))) {
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

function addEventListeners(containerEl: HTMLElement) {
  addResizeObserver(containerEl);
  addToggleHandler(containerEl);
  addFocusoutHandler(containerEl);
  addClickOutsideHandler(containerEl);
  addTabKeyHandler(containerEl);
  addEscapeKeyHandler(containerEl);
}

export default function initNavigation() {
  const containerEl = document.querySelector<HTMLElement>(
    '.js-cads-greedy-nav',
  );

  if (containerEl) {
    containerEl.classList.add('cads-greedy-nav');

    document.body.classList.add('cads-has-greedy-nav');

    prepareHtml(containerEl);

    addEventListeners(containerEl);
  }
}
