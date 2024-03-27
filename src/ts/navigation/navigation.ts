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

function getToggleElSelector() {
  return `button[aria-controls='cads-greedy-nav-dropdown']`;
}

function getToggleEl(containerEl: HTMLElement) {
  return containerEl.querySelector(getToggleElSelector()) as HTMLButtonElement;
}

function getDropdownSelector() {
  return '#cads-greedy-nav-dropdown';
}

function getDropdownEl(containerEl: HTMLElement) {
  return containerEl.querySelector(getDropdownSelector()) as HTMLElement;
}

function buildToggle({
  label,
  ariaLabel,
  dropdownId,
}: {
  label: string;
  ariaLabel: string;
  dropdownId: string;
}) {
  const toggleId = 'cads-greedy-nav-toggle';

  return `<button type="button"
    class="cads-greedy-nav__dropdown-toggle"
    id="${toggleId}"
    data-testid="${toggleId}"
    aria-controls="${dropdownId}"
    aria-expanded="false"
    aria-label="${ariaLabel}"
  >
    ${label}
  </button>`;
}

function buildHeaderLinks() {
  const headerLinks = document.querySelector('.js-cads-copy-into-nav');

  if (!headerLinks) {
    return null;
  }

  // prepare items that can close the more dropdown on blur
  const closeNavOnBlur =
    headerLinks.lastElementChild?.querySelectorAll('a, button');
  closeNavOnBlur?.forEach((el) => el.classList.add('js-cads-close-on-blur'));

  // Clone header links into navigation
  const headerLinksClone = headerLinks.cloneNode(true);
  const headerLinksContainer = document.createElement('li');
  headerLinksContainer.className = 'cads-greedy-nav__header-links';
  headerLinksContainer.appendChild(headerLinksClone);

  return headerLinksContainer;
}

function buildNavDropdown(dropdownId: string) {
  const navDropdown = document.createElement('ul');
  navDropdown.setAttribute('id', dropdownId);
  navDropdown.setAttribute('data-testid', dropdownId);
  navDropdown.classList.add('cads-greedy-nav__dropdown');

  const headerLinks = buildHeaderLinks();

  if (headerLinks) {
    navDropdown.appendChild(headerLinks);
  }

  return navDropdown;
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

function prepareHtml(containerEl: HTMLElement) {
  const toggleWrapper = document.createElement('div');
  toggleWrapper.classList.add('cads-greedy-nav__wrapper');

  const data = extractDataAttributes(containerEl);

  const dropdownId = 'cads-greedy-nav-dropdown';

  const toggle = buildToggle({
    label: data.label,
    ariaLabel: data.ariaLabel,
    dropdownId,
  });

  const navDropdown = buildNavDropdown(dropdownId);

  const mainNav = containerEl.firstElementChild;

  toggleWrapper.insertAdjacentHTML('beforeend', toggle);

  toggleWrapper.appendChild(navDropdown);

  if (mainNav) {
    mainNav.insertAdjacentElement('afterend', toggleWrapper);
  }

  containerEl.classList.add('cads-greedy-nav');

  document.body.classList.add('cads-has-greedy-nav');
}

function setDropdownLabel(containerEl: HTMLElement) {
  const toggle = getToggleEl(containerEl);
  const data = extractDataAttributes(containerEl);

  if (isExpanded(toggle)) {
    toggle.innerHTML = data.labelClose;
    toggle.setAttribute('aria-label', data.ariaLabelClose);
  } else {
    toggle.innerHTML = data.label;
    toggle.setAttribute('aria-label', data.ariaLabel);
  }
}

function showToggle(containerEl: HTMLElement, breaks: number[]) {
  const navDropdownToggle = getToggleEl(containerEl);

  if (breaks.length < 1) {
    navDropdownToggle.classList.add('cads-greedy-nav-is-hidden');
    navDropdownToggle.classList.remove('cads-greedy-nav-is-visible');

    const navWrapper = containerEl.querySelector<HTMLElement>(
      '.cads-greedy-nav__wrapper',
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'false');
    }
  } else {
    navDropdownToggle.classList.add('cads-greedy-nav-is-visible');
    navDropdownToggle.classList.remove('cads-greedy-nav-is-hidden');

    const navWrapper = containerEl.querySelector<HTMLElement>(
      '.cads-greedy-nav__wrapper',
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'true');
    }
  }
}

function openDropDown(containerEl: HTMLElement) {
  const navDropdown = getDropdownEl(containerEl);
  const navDropdownToggle = getToggleEl(containerEl);

  navDropdown.classList.add('show');
  navDropdownToggle.classList.add('is-open');
  containerEl.classList.add('is-open');

  navDropdown.setAttribute('aria-hidden', 'false');
  navDropdownToggle.setAttribute('aria-expanded', 'true');

  setDropdownLabel(containerEl);
}

function closeDropDown(containerEl: HTMLElement) {
  const navDropdown = getDropdownEl(containerEl);
  const navDropdownToggle = getToggleEl(containerEl);

  navDropdown.classList.remove('show');
  navDropdownToggle.classList.remove('is-open');
  containerEl.classList.remove('is-open');

  navDropdown.setAttribute('aria-hidden', 'true');
  navDropdownToggle.setAttribute('aria-expanded', 'false');

  setDropdownLabel(containerEl);
}

function toDropdown(containerEl: HTMLElement) {
  const navDropdown = getDropdownEl(containerEl);
  const mainNav = containerEl.firstElementChild;

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

function toMenu(containerEl: HTMLElement, breaks: number[]) {
  const navDropdown = document.getElementById('cads-greedy-nav-dropdown');
  const mainNav = containerEl.firstElementChild;

  if (
    mainNav &&
    navDropdown &&
    navDropdown.children.length > 0 &&
    navDropdown.firstElementChild
  ) {
    mainNav.appendChild(navDropdown.firstElementChild);
  }

  breaks.pop();

  showToggle(containerEl, breaks);
}

function doesItFit(containerEl: HTMLElement, breaks: number[]) {
  let currentTotalWidth = getElementContentWidth(containerEl);
  let currentRestWidth = getChildrenOffsetWidth(containerEl);

  const mainNav = containerEl.firstElementChild;

  if (!mainNav) {
    throw new Error('main nav not found');
  }

  while (currentTotalWidth <= currentRestWidth && mainNav.children.length > 0) {
    toDropdown(containerEl);

    breaks.push(currentRestWidth);

    showToggle(containerEl, breaks);

    currentTotalWidth = getElementContentWidth(containerEl);
    currentRestWidth = getChildrenOffsetWidth(containerEl);
  }

  while (currentTotalWidth >= breaks[breaks.length - 1]) {
    toMenu(containerEl, breaks);

    setDropdownLabel(containerEl);
  }

  const navDropdown = document.getElementById('cads-greedy-nav-dropdown');

  if (navDropdown && breaks.length < 1) {
    navDropdown.classList.remove('show');
    setDropdownLabel(containerEl);
  }

  showToggle(containerEl, breaks);
}

function addEventListeners(containerEl: HTMLElement, breaks: number[]) {
  const observer = new ResizeObserver(
    debounce(() => {
      doesItFit(containerEl, breaks);
    }, 50),
  );

  // This will fire when observed, which is desirable.
  // Use this to set up the initial state of the dropdown.
  observer.observe(containerEl);

  window.addEventListener(
    'orientationchange',
    () => {
      doesItFit(containerEl, breaks);
    },
    true,
  );

  const toggleEl = getToggleEl(containerEl);

  const navDropdownEl = getDropdownEl(containerEl);

  toggleEl.addEventListener('mouseup', (event: MouseEvent) => {
    if (isExpanded(toggleEl)) {
      closeDropDown(containerEl);
    } else {
      openDropDown(containerEl);
    }
  });

  const lastItemCloseHandler = (event: FocusEvent) => {
    if (!parent(relatedTarget(event), toggleEl.parentElement)) {
      closeDropDown(containerEl);

      const navLastDropdownLink = containerEl.querySelector<HTMLElement>(
        `#cads-greedy-nav-dropdown li:last-child a`,
      );

      if (navLastDropdownLink) {
        navLastDropdownLink.removeEventListener(
          BLUR_EVENT,
          lastItemCloseHandler,
        );
      }
    }
  };

  /* Open when tabbing into the toggle */
  if (toggleEl) {
    toggleEl.addEventListener('keyup', (event) => {
      if (!event.shiftKey && event.key === 'Tab') {
        openDropDown(containerEl);
      }
    });
  }

  toggleEl.addEventListener(BLUR_EVENT, (e: FocusEvent) => {
    let lastItem: HTMLElement | null;

    const headerLinksInNav = navDropdownEl.querySelector<HTMLElement>(
      `.js-cads-copy-into-nav`,
    );

    if (headerLinksInNav?.offsetParent) {
      lastItem = headerLinksInNav.querySelector<HTMLElement>(
        '.js-cads-close-on-blur',
      );
    } else if (headerLinksInNav?.offsetParent === null) {
      // offsetParent returns null in this case as the header links in the nav have display: none
      // using nth-last-child(2) as the last-child in this case is the hidden header nav links
      lastItem = navDropdownEl.querySelector(`li:nth-last-child(2) a`);
    } else {
      lastItem = navDropdownEl.querySelector(`li:last-child a`);
    }

    if (!parent(relatedTarget(e), toggleEl.parentElement)) {
      // tabbing backwards
      lastItem?.removeEventListener(BLUR_EVENT, lastItemCloseHandler);

      closeDropDown(containerEl);
    } else {
      // tabbing forwards
      lastItem?.addEventListener(BLUR_EVENT, lastItemCloseHandler);
    }
  });

  document.addEventListener('click', (event: MouseEvent) => {
    const targetEl = <HTMLElement>event.target;
    if (
      targetEl &&
      targetEl.closest('#cads-greedy-nav-dropdown') &&
      targetEl !== toggleEl &&
      isExpanded(toggleEl)
    ) {
      closeDropDown(containerEl);
    }
  });

  document.onkeydown = (evt: KeyboardEvent) => {
    const event = evt || window.event;

    if (event.keyCode === 27) {
      closeDropDown(containerEl);
    }
  };
}

export default function initNavigation() {
  const containerEl = document.querySelector<HTMLElement>(
    '.js-cads-greedy-nav',
  );

  if (containerEl) {
    // Track navigation breakpoint state
    const breaks: number[] = [];
    prepareHtml(containerEl);
    addEventListeners(containerEl, breaks);
  }
}
