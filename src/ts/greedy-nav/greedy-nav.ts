/* eslint-disable no-console */
import { debounce, parent, calculateWidths, relatedTarget } from './helpers';

interface LegacyConfig {
  mainNavWrapper: string;
  mainNav: string;
  navDropdownClassName: string;
  navDropdownToggleClassName: string;
  navDropdownToggleAriaLabel: string;
  navDropdownLabel: string;
  navDropdownLabelActive: string;
}

const legacyDefaultConfig: LegacyConfig = {
  mainNavWrapper: '.js-cads-greedy-nav',
  mainNav: 'ul',
  navDropdownClassName: 'cads-greedy-nav__dropdown',
  navDropdownToggleClassName: 'cads-greedy-nav__dropdown-toggle',
  navDropdownToggleAriaLabel: 'More navigation options',
  navDropdownLabel: 'More',
  navDropdownLabelActive: 'Close',
};

/**
 * Provides backwards compatibility with IE 11.
 *
 * If we want to access the relatedTarget of an event we should use
 * a focusout event as per the spec, but in IE 11 we need to use blur.
 *
 * This constant should be used in place of focusout/blur when assigning
 * event handlers.
 */
const blurEventName = Object.prototype.hasOwnProperty.call(
  MouseEvent,
  'relatedTarget',
)
  ? 'focusout'
  : 'blur';

/**
 * Show/hide toggle button
 */
export const showToggle = (
  navWrapperElement: HTMLElement,
  navDropdownToggleSelector: string,
  breaks: number[],
): void => {
  if (breaks.length < 1) {
    const navDropdownToggle = navWrapperElement.querySelector<HTMLElement>(
      navDropdownToggleSelector,
    );

    if (navDropdownToggle === null) {
      return;
    }

    navDropdownToggle.classList.add('cads-greedy-nav-is-hidden');
    navDropdownToggle.classList.remove('cads-greedy-nav-is-visible');
    navWrapperElement.classList.remove('cads-greedy-nav-has-dropdown');

    /**
     * Set aria attributes for accessibility
     */

    const navWrapper = navWrapperElement.querySelector<HTMLElement>(
      '.cads-greedy-nav__wrapper',
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'false');
    }
  } else {
    const navDropdownToggle = navWrapperElement.querySelector<HTMLElement>(
      navDropdownToggleSelector,
    );

    if (navDropdownToggle === null) {
      return;
    }
    navDropdownToggle.classList.add('cads-greedy-nav-is-visible');
    navDropdownToggle.classList.remove('cads-greedy-nav-is-hidden');
    navWrapperElement.classList.add('cads-greedy-nav-has-dropdown');

    /**
     * Set aria attributes for accessibility
     */
    const navWrapper = navWrapperElement.querySelector<HTMLElement>(
      '.cads-greedy-nav__wrapper',
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'true');
    }
  }
};

export const updateLabel = (
  menu: HTMLElement,
  label: string,
  navDropdownToggleSelector: string,
  navDropdownLabelActive: string,
): void => {
  const toggle = menu.querySelector<HTMLElement>(navDropdownToggleSelector);

  if (toggle === null) {
    return;
  }

  toggle.innerHTML = label;
  toggle.setAttribute('aria-label', `${label} navigation options`);

  if (label === navDropdownLabelActive) {
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    toggle.setAttribute('aria-expanded', 'false');
  }
};

export class GreedyNavMenu {
  settings: LegacyConfig;

  breaks: number[];

  mainNavWrapper: Nullable<HTMLElement>;

  navDropdown: Nullable<HTMLUListElement>;

  navDropdownToggle: Nullable<HTMLElement>;

  toggleWrapper: Nullable<HTMLDivElement>;

  navDropdownSelector: string;

  navDropdownToggleSelector: string;

  mainNavSelector: string;

  totalWidth: number;

  restWidth: number;

  viewportWidth: number;

  // eslint-disable-next-line default-param-last
  constructor(config: LegacyConfig = legacyDefaultConfig) {
    this.settings = { ...legacyDefaultConfig, ...config };
    this.breaks = [];
    this.mainNavWrapper = null;

    this.navDropdown = null;
    this.navDropdownToggle = null;
    this.toggleWrapper = null;

    this.navDropdownSelector = `.${this.settings.navDropdownClassName}`;
    this.navDropdownToggleSelector = `.${this.settings.navDropdownToggleClassName}`;
    this.mainNavSelector = this.settings.mainNav;

    this.totalWidth = 0;
    this.restWidth = 0;
    this.viewportWidth = 0;
  }

  init(): void {
    /**
     * Store nodes
     * @type {NodeList}
     */
    const navWrapperList = document.querySelectorAll<HTMLElement>(
      this.settings.mainNavWrapper,
    );

    /**
     * Loop over every instance and reference _this
     */
    navWrapperList.forEach((navWrapperElement) => {
      /**
       * Create breaks array
       * @type {number}
       */
      this.breaks = [];

      /**
       * Store the wrapper element
       */
      this.mainNavWrapper = navWrapperElement;
      if (!this.mainNavWrapper) {
        console.warn("couldn't find the specified mainNavWrapper element");
        return;
      }

      /**
       * Store the menu elementStore the menu element
       */
      this.mainNavSelector = this.settings.mainNav;
      if (!navWrapperElement.querySelector(this.mainNavSelector)) {
        console.warn("couldn't find the specified mainNav element");
        return;
      }

      /**
       * Check if we need to create the dropdown elements
       */
      this.prepareHtml(navWrapperElement);

      /**
       * Store the dropdown element
       */
      this.navDropdownSelector = `.${this.settings.navDropdownClassName}`;

      /**
       * Store the dropdown toggle element
       */
      this.navDropdownToggleSelector = `.${this.settings.navDropdownToggleClassName}`;

      /**
       * Event listeners
       */
      this.listeners(navWrapperElement);
    });
  }

  /**
   * Check if dropdown menu is already on page before creating it
   * @param mainNavWrapper
   */
  prepareHtml(_this: HTMLElement): void {
    /**
     * Create dropdown menu
     * @type {HTMLElement}
     */
    this.toggleWrapper = document.createElement('div');
    this.navDropdown = document.createElement('ul');
    this.navDropdownToggle = document.createElement('button');

    /**
     * Set ID on nav dropdown so we can reference it later
     */
    const dropdownId = 'greedy-nav-dropdown';
    this.navDropdown.setAttribute('id', dropdownId);

    /**
     * Set label for dropdown toggle
     * @type {string}
     */
    this.navDropdownToggle.innerHTML = this.settings.navDropdownLabel;

    /**
     * Set aria attributes for accessibility
     */
    this.navDropdownToggle.setAttribute('aria-expanded', 'false');
    this.navDropdownToggle.setAttribute('aria-controls', dropdownId);
    this.navDropdownToggle.setAttribute('type', 'button');
    this.navDropdownToggle.setAttribute(
      'aria-label',
      this.settings.navDropdownToggleAriaLabel,
    );
    this.navDropdown.setAttribute('aria-hidden', 'true');

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

    /**
     * Move elements to the right spot
     */

    const mainNav = _this.querySelector<HTMLElement>(this.mainNavSelector);

    if (mainNav) {
      if (mainNav.parentNode !== _this) {
        console.warn(
          'mainNav is not a direct child of mainNavWrapper, double check please',
        );
        return;
      }

      mainNav.insertAdjacentElement('afterend', this.toggleWrapper);
    }

    this.toggleWrapper.appendChild(this.navDropdownToggle);
    this.toggleWrapper.appendChild(this.navDropdown);

    /**
     * Add classes so we can target elements
     */
    this.navDropdown.classList.add(this.settings.navDropdownClassName);
    this.navDropdown.classList.add('cads-greedy-nav__dropdown');

    this.navDropdownToggle.classList.add(
      this.settings.navDropdownToggleClassName,
    );
    this.navDropdownToggle.classList.add('cads-greedy-nav__dropdown-toggle');

    // fix so button is type="button" and do not submit forms
    this.navDropdownToggle.setAttribute('type', 'button');

    this.toggleWrapper.classList.add(
      `${this.settings.navDropdownClassName}-wrapper`,
    );
    this.toggleWrapper.classList.add('cads-greedy-nav__wrapper');

    _this.classList.add('cads-greedy-nav');
  }

  /**
   * Bind eventlisteners
   */
  listeners(navWrapper: HTMLElement): void {
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

    const navDropdownToggle = navWrapper.querySelector<HTMLElement>(
      this.navDropdownToggleSelector,
    );

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
            blurEventName,
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
      navDropdownToggle.addEventListener(
        blurEventName,
        (e: FocusEvent): void => {
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
            lastItem = this.navDropdown?.querySelector(
              `li:nth-last-child(2) a`,
            );
          } else {
            lastItem = this.navDropdown?.querySelector(`li:last-child a`);
          }

          if (!parent(relatedTarget(e), this.toggleWrapper)) {
            // tabbing backwards
            lastItem?.removeEventListener(blurEventName, lastItemCloseHandler);

            this.closeDropDown(navWrapper);
          } else {
            // tabbing forwards
            lastItem?.addEventListener(blurEventName, lastItemCloseHandler);
          }
        },
      );
    }

    /*
     * Remove when clicked outside dropdown
     */
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

    /**
     * Remove when escape key is pressed
     */
    document.onkeydown = (evt: KeyboardEvent) => {
      const event = evt || window.event;

      if (event.keyCode === 27) {
        this.closeDropDown(navWrapper);
      }
    };
  }

  /**
   * Move item to dropdown
   */

  toDropdown(navigation: HTMLElement): void {
    const navDropdown = navigation.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );
    const mainNav = navigation.querySelector<HTMLElement>(this.mainNavSelector);

    if (navDropdown && mainNav) {
      /**
       * move last child of navigation menu to dropdown
       */
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
    /**
     * store breakpoints
     */
    this.breaks.push(this.restWidth);

    /**
     * check if we need to show toggle menu button
     */
    showToggle(navigation, this.navDropdownToggleSelector, this.breaks);
  }

  /**
   * Move item to menu
   */
  toMenu(_this: HTMLElement): void {
    const navDropdown = _this.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );
    const mainNav = _this.querySelector<HTMLElement>(this.mainNavSelector);

    /**
     * Move items from dropdown to menu
     */
    if (
      mainNav &&
      navDropdown &&
      navDropdown.children.length > 0 &&
      navDropdown.firstElementChild
    ) {
      mainNav.appendChild(navDropdown.firstElementChild);
    }

    /**
     * remove last breakpoint
     */
    this.breaks.pop();

    /**
     * Check if we need to show toggle menu button
     */
    showToggle(_this, this.navDropdownToggleSelector, this.breaks);
  }

  /**
   * Move item to array
   * @param item
   */
  doesItFit(_this: HTMLElement): void {
    /**
     * Debounced execution of the main logic
     */

    /**
     * Update width
     */
    Object.assign(this, calculateWidths(_this));

    const mainNav = _this.querySelector<HTMLElement>(this.mainNavSelector);

    if (!mainNav) {
      throw new Error('main nav not found');
    }

    /**
     * Keep executing until all menu items that are overflowing are moved
     */
    while (this.totalWidth <= this.restWidth && mainNav.children.length > 0) {
      // move item to dropdown
      this.toDropdown(_this);

      // recalculate widths
      Object.assign(this, calculateWidths(_this));
    }

    /**
     * Keep executing until all menu items that are able to move back are moved
     */
    while (this.totalWidth >= this.breaks[this.breaks.length - 1]) {
      // move item to menu
      this.toMenu(_this);

      // // update dropdownToggle label
      // if (this.viewportWidth > this.settings.breakPoint) {
      updateLabel(
        _this,
        this.settings.navDropdownLabel,
        this.navDropdownToggleSelector,
        this.settings.navDropdownLabelActive,
      );
      // }
    }

    /**
     * If there are no items in dropdown hide dropdown
     */

    const navDropdown = _this.querySelector<HTMLElement>(
      this.navDropdownSelector,
    );
    if (navDropdown && this.breaks.length < 1) {
      navDropdown.classList.remove('show');
      // show navDropdownLabel
      updateLabel(
        _this,
        this.settings.navDropdownLabel,
        this.navDropdownToggleSelector,
        this.settings.navDropdownLabelActive,
      );
    }

    /**
     * Check if we need to show toggle menu button
     */
    showToggle(_this, this.navDropdownToggleSelector, this.breaks);
  }

  openDropDown(navWrapper: HTMLElement): void {
    const { navDropdownLabelActive } = this.settings;

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

      updateLabel(
        navWrapper,
        navDropdownLabelActive,
        this.navDropdownToggleSelector,
        navDropdownLabelActive,
      );
    }
  }

  closeDropDown(navWrapper: HTMLElement): void {
    const { navDropdownLabel, navDropdownLabelActive } = this.settings;

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

      updateLabel(
        navWrapper,
        navDropdownLabel,
        this.navDropdownToggleSelector,
        navDropdownLabelActive,
      );
    }
  }
}

export function initGreedyNav(options: LegacyConfig = legacyDefaultConfig) {
  console.log('Initialising refactored greedy navigation');
  const menu = new GreedyNavMenu(options);
  menu.init();
}
