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

function setDropdownLabel(containerEl: HTMLElement) {
  const toggle = getToggleEl(containerEl);

  if (isExpanded(toggle)) {
    toggle.innerHTML =
      containerEl.getAttribute('data-dropdown-label-close') || 'Close';
    toggle.setAttribute('aria-label', `Close navigation options`);
  } else {
    toggle.innerHTML =
      containerEl.getAttribute('data-dropdown-label') || 'More';
    toggle.setAttribute('aria-label', `More navigation options`);
  }
}

function buildToggleEl(containerEl: HTMLElement, dropdownId: string) {
  const toggleId = 'cads-greedy-nav-toggle';
  const toggleEl = document.createElement('button');
  toggleEl.innerHTML =
    containerEl.getAttribute('data-dropdown-label') || 'More';
  toggleEl.setAttribute('aria-label', 'More navigation options');
  toggleEl.setAttribute('aria-expanded', 'false');
  toggleEl.setAttribute('id', toggleId);
  toggleEl.setAttribute('data-testid', toggleId);
  toggleEl.setAttribute('aria-controls', dropdownId);
  toggleEl.setAttribute('type', 'button');

  toggleEl.classList.add('cads-greedy-nav__dropdown-toggle');

  return toggleEl;
}

export function showToggle(containerEl: HTMLElement, breaks: number[]) {
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

export class GreedyNavMenu {
  navDropdown: Nullable<HTMLUListElement>;

  navDropdownToggle: Nullable<HTMLElement>;

  toggleWrapper: Nullable<HTMLDivElement>;

  constructor() {
    this.navDropdown = null;
    this.navDropdownToggle = null;
    this.toggleWrapper = null;
  }

  init(containerEl: HTMLElement) {
    // Track navigation breakpoint state
    const breaks: number[] = [];
    this.prepareHtml(containerEl);
    this.listeners(containerEl, breaks);
  }

  prepareHtml(containerEl: HTMLElement) {
    this.toggleWrapper = document.createElement('div');

    const dropdownId = 'cads-greedy-nav-dropdown';
    this.navDropdown = document.createElement('ul');
    this.navDropdown.setAttribute('id', dropdownId);
    this.navDropdown.setAttribute('data-testid', dropdownId);
    this.navDropdown.classList.add('cads-greedy-nav__dropdown');

    const headerLinks = document.querySelector('.js-cads-copy-into-nav');
    if (headerLinks) {
      // prepare items that can close the more dropdown on blur
      const closeNavOnBlur =
        headerLinks.lastElementChild?.querySelectorAll('a, button');
      closeNavOnBlur?.forEach((el) =>
        el.classList.add('js-cads-close-on-blur'),
      );

      const headerLinksClone = headerLinks.cloneNode(true);
      const headerLinksContainer = document.createElement('li');
      headerLinksContainer.className = 'cads-greedy-nav__header-links';
      headerLinksContainer.appendChild(headerLinksClone);
      this.navDropdown.appendChild(headerLinksContainer);
    }

    const mainNav = containerEl.firstElementChild;

    if (mainNav) {
      mainNav.insertAdjacentElement('afterend', this.toggleWrapper);
    }

    this.navDropdownToggle = buildToggleEl(containerEl, dropdownId);

    this.toggleWrapper.appendChild(this.navDropdownToggle);
    this.toggleWrapper.appendChild(this.navDropdown);
    this.toggleWrapper.classList.add('cads-greedy-nav__wrapper');

    containerEl.classList.add('cads-greedy-nav');
  }

  listeners(containerEl: HTMLElement, breaks: number[]) {
    const observer = new ResizeObserver(
      debounce(() => {
        this.doesItFit(containerEl, breaks);
      }, 50),
    );

    const nav = document.querySelector('.js-cads-greedy-nav');

    if (nav) {
      // this will fire when observed - which is desirable. We
      // use this to set up the initial state of the dropdown.
      observer.observe(nav);
    }

    window.addEventListener(
      'orientationchange',
      () => {
        this.doesItFit(containerEl, breaks);
      },
      true,
    );

    const navDropdownToggle = getToggleEl(containerEl);

    navDropdownToggle.addEventListener('mouseup', (event: MouseEvent) => {
      if (isExpanded(navDropdownToggle)) {
        closeDropDown(containerEl);
      } else {
        openDropDown(containerEl);
      }
    });

    const lastItemCloseHandler = (event: FocusEvent) => {
      if (this.toggleWrapper === null) {
        return;
      }

      if (!parent(relatedTarget(event), this.toggleWrapper)) {
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
    if (navDropdownToggle) {
      navDropdownToggle.addEventListener('keyup', (event) => {
        if (!event.shiftKey && event.key === 'Tab') {
          openDropDown(containerEl);
        }
      });
    }

    if (navDropdownToggle && this.toggleWrapper) {
      navDropdownToggle.addEventListener(BLUR_EVENT, (e: FocusEvent) => {
        let lastItem: HTMLElement | null | undefined;
        const headerLinksInNav: HTMLElement | null = document.querySelector(
          `#cads-greedy-nav-dropdown .js-cads-copy-into-nav`,
        );

        if (headerLinksInNav?.offsetParent) {
          lastItem = headerLinksInNav?.querySelector<HTMLElement>(
            '.js-cads-close-on-blur',
          );
        } else if (headerLinksInNav?.offsetParent === null) {
          // offsetParent returns null in this case as the header links in the nav have display: none
          // using nth-last-child(2) as the last-child in this case is the hidden header nav links
          lastItem = this.navDropdown?.querySelector(`li:nth-last-child(2) a`);
        } else {
          lastItem = this.navDropdown?.querySelector(`li:last-child a`);
        }

        if (!parent(relatedTarget(e), this.toggleWrapper)) {
          // tabbing backwards
          lastItem?.removeEventListener(BLUR_EVENT, lastItemCloseHandler);

          closeDropDown(containerEl);
        } else {
          // tabbing forwards
          lastItem?.addEventListener(BLUR_EVENT, lastItemCloseHandler);
        }
      });
    }

    document.addEventListener('click', (event: MouseEvent) => {
      const targetEl = <HTMLElement>event.target;
      if (
        targetEl &&
        targetEl.closest('#cads-greedy-nav-dropdown') &&
        targetEl !== navDropdownToggle &&
        isExpanded(navDropdownToggle)
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

  toMenu(containerEl: HTMLElement, breaks: number[]) {
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

  doesItFit(containerEl: HTMLElement, breaks: number[]) {
    let currentTotalWidth = getElementContentWidth(containerEl);
    let currentRestWidth = getChildrenOffsetWidth(containerEl);

    const mainNav = containerEl.firstElementChild;

    if (!mainNav) {
      throw new Error('main nav not found');
    }

    while (
      currentTotalWidth <= currentRestWidth &&
      mainNav.children.length > 0
    ) {
      toDropdown(containerEl);

      breaks.push(currentRestWidth);

      showToggle(containerEl, breaks);

      currentTotalWidth = getElementContentWidth(containerEl);
      currentRestWidth = getChildrenOffsetWidth(containerEl);
    }

    while (currentTotalWidth >= breaks[breaks.length - 1]) {
      this.toMenu(containerEl, breaks);

      setDropdownLabel(containerEl);
    }

    const navDropdown = document.getElementById('cads-greedy-nav-dropdown');

    if (navDropdown && breaks.length < 1) {
      navDropdown.classList.remove('show');
      setDropdownLabel(containerEl);
    }

    showToggle(containerEl, breaks);
  }
}

export default function initNavigation() {
  const containerEl = document.querySelector<HTMLElement>(
    '.js-cads-greedy-nav',
  );

  if (containerEl) {
    const menu = new GreedyNavMenu();
    menu.init(containerEl);
  }
}
