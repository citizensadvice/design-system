/* eslint-disable no-console */
import {
  BLUR_EVENT,
  debounce,
  parent,
  relatedTarget,
  getElementContentWidth,
  getChildrenOffsetWidth,
} from './helpers';

interface LegacyConfig {
  mainNav: string;
  navDropdownClassName: string;
  navDropdownToggleClassName: string;
}

const legacyDefaultConfig: LegacyConfig = {
  mainNav: 'ul',
  navDropdownClassName: 'cads-greedy-nav__dropdown',
  navDropdownToggleClassName: 'cads-greedy-nav__dropdown-toggle',
};

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

export function showToggle(
  navWrapperElement: HTMLElement,
  navDropdownToggleSelector: string,
  breaks: number[],
) {
  const navDropdownToggle = getToggleEl(navWrapperElement);

  if (breaks.length < 1) {
    navDropdownToggle.classList.add('cads-greedy-nav-is-hidden');
    navDropdownToggle.classList.remove('cads-greedy-nav-is-visible');

    const navWrapper = navWrapperElement.querySelector<HTMLElement>(
      '.cads-greedy-nav__wrapper',
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'false');
    }
  } else {
    navDropdownToggle.classList.add('cads-greedy-nav-is-visible');
    navDropdownToggle.classList.remove('cads-greedy-nav-is-hidden');

    const navWrapper = navWrapperElement.querySelector<HTMLElement>(
      '.cads-greedy-nav__wrapper',
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'true');
    }
  }
}

export class GreedyNavMenu {
  settings: LegacyConfig;

  breaks: number[];

  navDropdown: Nullable<HTMLUListElement>;

  navDropdownToggle: Nullable<HTMLElement>;

  toggleWrapper: Nullable<HTMLDivElement>;

  navDropdownSelector: string;

  navDropdownToggleSelector: string;

  mainNavSelector: string;

  constructor(config: LegacyConfig = legacyDefaultConfig) {
    this.settings = { ...legacyDefaultConfig, ...config };
    this.breaks = [];

    this.navDropdown = null;
    this.navDropdownToggle = null;
    this.toggleWrapper = null;

    this.navDropdownSelector = `.${this.settings.navDropdownClassName}`;
    this.navDropdownToggleSelector = `.${this.settings.navDropdownToggleClassName}`;
    this.mainNavSelector = this.settings.mainNav;
  }

  init(navWrapperElement: HTMLElement) {
    this.breaks = [];
    this.prepareHtml(navWrapperElement);
    this.listeners(navWrapperElement);
  }

  prepareHtml(_this: HTMLElement) {
    this.toggleWrapper = document.createElement('div');

    const dropdownId = 'cads-greedy-nav-dropdown';
    this.navDropdown = document.createElement('ul');
    this.navDropdown.setAttribute('id', dropdownId);
    this.navDropdown.setAttribute('data-testid', dropdownId);
    this.navDropdown.classList.add(this.settings.navDropdownClassName);
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

    const mainNav = _this.querySelector<HTMLElement>(this.mainNavSelector);

    if (mainNav) {
      mainNav.insertAdjacentElement('afterend', this.toggleWrapper);
    }

    this.navDropdownToggle = buildToggleEl(_this, dropdownId);

    this.toggleWrapper.appendChild(this.navDropdownToggle);
    this.toggleWrapper.appendChild(this.navDropdown);
    this.toggleWrapper.classList.add(
      `${this.settings.navDropdownClassName}-wrapper`,
    );
    this.toggleWrapper.classList.add('cads-greedy-nav__wrapper');

    _this.classList.add('cads-greedy-nav');
  }

  listeners(navWrapper: HTMLElement) {
    const observer = new ResizeObserver(
      debounce(() => {
        this.doesItFit(navWrapper);
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
        this.doesItFit(navWrapper);
      },
      true,
    );

    const { navDropdownClassName } = this.settings;

    const navDropdownToggle = getToggleEl(navWrapper);

    if (navDropdownToggle) {
      navDropdownToggle.addEventListener('mouseup', (event: MouseEvent) => {
        if (navWrapper.classList.contains('is-open')) {
          this.closeDropDown(navWrapper);
        } else {
          this.openDropDown(navWrapper);
        }
      });
    }

    const lastItemCloseHandler = (event: FocusEvent) => {
      if (this.toggleWrapper === null) {
        return;
      }

      if (!parent(relatedTarget(event), this.toggleWrapper)) {
        this.closeDropDown(navWrapper);

        const navLastDropdownLink = navWrapper.querySelector<HTMLElement>(
          `${this.navDropdownSelector} li:last-child a`,
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
          this.openDropDown(navWrapper);
        }
      });
    }

    if (navDropdownToggle && this.toggleWrapper) {
      navDropdownToggle.addEventListener(BLUR_EVENT, (e: FocusEvent) => {
        let lastItem: HTMLElement | null | undefined;
        const headerLinksInNav: HTMLElement | null = document.querySelector(
          `${this.navDropdownSelector} .js-cads-copy-into-nav`,
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

          this.closeDropDown(navWrapper);
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
        targetEl.closest(`.${navDropdownClassName}`) &&
        navDropdownToggle &&
        targetEl !== navDropdownToggle &&
        navWrapper.classList.contains('is-open')
      ) {
        this.closeDropDown(navWrapper);
      }
    });

    document.onkeydown = (evt: KeyboardEvent) => {
      const event = evt || window.event;

      if (event.keyCode === 27) {
        this.closeDropDown(navWrapper);
      }
    };
  }

  toDropdown(navigation: HTMLElement) {
    const navDropdown = navigation.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );
    const mainNav = navigation.querySelector<HTMLElement>(this.mainNavSelector);

    if (navDropdown && mainNav) {
      if (
        navDropdown.firstChild &&
        mainNav.children.length > 0 &&
        mainNav.lastElementChild
      ) {
        navDropdown.insertBefore(
          mainNav.lastElementChild,
          navDropdown.firstChild,
        );
      } else if (mainNav.children.length > 0 && mainNav.lastElementChild) {
        navDropdown.appendChild(mainNav.lastElementChild);
      }
    }
  }

  toMenu(_this: HTMLElement) {
    const navDropdown = _this.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );
    const mainNav = _this.querySelector<HTMLElement>(this.mainNavSelector);

    if (
      mainNav &&
      navDropdown &&
      navDropdown.children.length > 0 &&
      navDropdown.firstElementChild
    ) {
      mainNav.appendChild(navDropdown.firstElementChild);
    }

    this.breaks.pop();

    showToggle(_this, this.navDropdownToggleSelector, this.breaks);
  }

  doesItFit(_this: HTMLElement) {
    let currentTotalWidth = getElementContentWidth(_this);
    let currentRestWidth = getChildrenOffsetWidth(_this);

    const mainNav = _this.querySelector<HTMLElement>(this.mainNavSelector);

    if (!mainNav) {
      throw new Error('main nav not found');
    }

    while (
      currentTotalWidth <= currentRestWidth &&
      mainNav.children.length > 0
    ) {
      this.toDropdown(_this);

      this.breaks.push(currentRestWidth);

      showToggle(_this, this.navDropdownToggleSelector, this.breaks);

      currentTotalWidth = getElementContentWidth(_this);
      currentRestWidth = getChildrenOffsetWidth(_this);
    }

    while (currentTotalWidth >= this.breaks[this.breaks.length - 1]) {
      this.toMenu(_this);

      setDropdownLabel(_this);
    }

    const navDropdown = _this.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );
    if (navDropdown && this.breaks.length < 1) {
      navDropdown.classList.remove('show');
      setDropdownLabel(_this);
    }

    showToggle(_this, this.navDropdownToggleSelector, this.breaks);
  }

  openDropDown(navWrapper: HTMLElement) {
    const navDropdown = navWrapper.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );

    const navDropdownToggle = navWrapper.querySelector<HTMLElement>(
      this.navDropdownToggleSelector,
    );

    if (navDropdown && navDropdownToggle) {
      navDropdown.classList.add('show');
      navDropdownToggle.classList.add('is-open');
      navWrapper.classList.add('is-open');

      navDropdown.setAttribute('aria-hidden', 'false');
      navDropdownToggle.setAttribute('aria-expanded', 'true');

      setDropdownLabel(navWrapper);
    }
  }

  closeDropDown(navWrapper: HTMLElement) {
    const navDropdown = navWrapper.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );

    const navDropdownToggle = navWrapper.querySelector<HTMLElement>(
      this.navDropdownToggleSelector,
    );

    if (navDropdown && navDropdownToggle) {
      navDropdown.classList.remove('show');
      navDropdownToggle.classList.remove('is-open');
      navWrapper.classList.remove('is-open');

      navDropdown.setAttribute('aria-hidden', 'true');
      navDropdownToggle.setAttribute('aria-expanded', 'false');

      setDropdownLabel(navWrapper);
    }
  }
}

export default function initNavigation(
  options: LegacyConfig = legacyDefaultConfig,
) {
  const containerEl = document.querySelector<HTMLElement>(
    '.js-cads-greedy-nav',
  );

  if (containerEl) {
    const menu = new GreedyNavMenu(options);
    menu.init(containerEl);
  }
}
