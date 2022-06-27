/* eslint-disable no-console */
import { Config, defaultConfig } from './Config';

const supports = !!document.querySelector && !!window.addEventListener; // Feature test

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
  'relatedTarget'
)
  ? 'focusout'
  : 'blur';
/**
 * Get the closest matching element up the DOM tree
 * @param {Element} element Starting element
 * @param {String} selector Selector to match against (class, ID, or data attribute)
 * @return {Boolean|Element} Returns false if not match found
 */
export const getClosest = (
  element: HTMLElement,
  selector: string
): HTMLElement | false => {
  const firstChar = selector.charAt(0);

  let e: Nullable<HTMLElement> = element;

  while (e) {
    if (firstChar === '.') {
      if (e.classList.contains(selector.substr(1))) {
        return e;
      }
    } else if (firstChar === '#') {
      if (e.id === selector.substr(1)) {
        return e;
      }
    } else if (firstChar === '[') {
      const attr = selector.substr(1, selector.length - 2);
      if (e.hasAttribute(attr)) {
        return e;
      }
    }
    e = e.parentElement;
  }

  return false;
};

/**
 * Debounced resize to throttle execution
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
function debounce<Return>(func: () => Return, wait: number, immediate = false) {
  let timeout: Nullable<number>;

  return function debounced(this: Return, ...args: []) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    if (timeout) {
      window.clearTimeout(timeout);
    } else if (immediate) {
      func.apply(context, args);
    }

    timeout = window.setTimeout(later, wait);
  };
}

/**
 * return true if el has a parent
 * @param el
 * @param parent
 */
const parent = (element: Nullable<HTMLElement>, parentNode: Nullable<Node>) => {
  let el: Nullable<Node & ParentNode> = element;
  while (el !== null) {
    if (el.parentNode === parentNode) {
      return true;
    }
    el = el.parentNode;
  }
  return false;
};

/**
 * Show/hide toggle button
 */
export const showToggle = (
  navWrapperElement: HTMLElement,
  navDropdownToggleSelector: string,
  breaks: number[]
): void => {
  if (breaks.length < 1) {
    const navDropdownToggle = navWrapperElement.querySelector<HTMLElement>(
      navDropdownToggleSelector
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
      '.cads-greedy-nav__wrapper'
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'false');
    }
  } else {
    const navDropdownToggle = navWrapperElement.querySelector<HTMLElement>(
      navDropdownToggleSelector
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
      '.cads-greedy-nav__wrapper'
    );

    if (navWrapper) {
      navWrapper.setAttribute('aria-haspopup', 'true');
    }
  }
};

/**
 * Update count on dropdown toggle button
 */
const updateCount = (
  _this: HTMLElement,
  navDropdownToggleSelector: string,
  breaks: number[]
): void => {
  // eslint-disable-next-line no-unused-expressions
  _this
    .querySelector<HTMLElement>(navDropdownToggleSelector)
    ?.setAttribute('cadsGreedyNav-count', `${breaks.length}`);
};

export const updateLabel = (
  menu: HTMLElement,
  label: string,
  navDropdownToggleSelector: string,
  navDropdownLabelActive: string
): void => {
  const toggle = menu.querySelector<HTMLElement>(navDropdownToggleSelector);

  if (toggle === null) {
    return;
  }

  toggle.innerHTML = label;

  if (label === navDropdownLabelActive) {
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    toggle.setAttribute('aria-expanded', 'false');
  }
};

const checkForSymbols = (str: string) => {
  const firstChar = str.charAt(0);
  if (firstChar === '.' || firstChar === '#') {
    return false;
  }
  return true;
};

/**
 * Get innerwidth without padding
 * @param element
 * @returns {number}
 */
const getElementContentWidth = (element: HTMLElement) => {
  const styles = window.getComputedStyle(element);
  const padding =
    parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

  return element.clientWidth - padding;
};

/**
 * Get viewport size
 * @returns {{width: number, height: number}}
 */
const viewportSize = () => {
  const doc = document;
  const w = window;
  const docEl =
    doc.compatMode && doc.compatMode === 'CSS1Compat'
      ? doc.documentElement
      : doc.body;

  let width = docEl.clientWidth;
  let height = docEl.clientHeight;

  // mobile zoomed in?
  if (w.innerWidth && width > w.innerWidth) {
    width = w.innerWidth;
    height = w.innerHeight;
  }

  return { width, height };
};

/**
 * Count width of children and return the value
 * @param e
 */
const getChildrenWidth = (e: HTMLElement) => {
  const children = e.childNodes;
  let sum = 0;
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType !== 3) {
      if (!Number.isNaN((<HTMLElement>children[i]).offsetWidth)) {
        sum += (<HTMLElement>children[i]).offsetWidth;
      }
    }
  }
  return sum;
};

/**
 * Get width
 * @param elem
 * @returns {number}
 */
const calculateWidths = (_this: HTMLElement, offsetPixels: number) => {
  const totalWidth = getElementContentWidth(_this);

  const restWidth = getChildrenWidth(_this) + offsetPixels;
  const viewportWidth = viewportSize().width;

  return { totalWidth, restWidth, viewportWidth };
};

const relatedTarget = (
  e: Nullable<FocusEvent>,
  document: HTMLDocument
): Nullable<HTMLElement> =>
  <HTMLElement>e?.relatedTarget || document.activeElement;

export class GreedyNavMenu {
  settings: Config;

  count: number;

  breaks: number[];

  instance: number;

  mainNavWrapper: Nullable<HTMLElement>;

  navDropdown: Nullable<HTMLUListElement>;

  navDropdownToggle: Nullable<HTMLElement>;

  navDropdownToggleLabel: Nullable<HTMLSpanElement>;

  toggleWrapper: Nullable<HTMLDivElement>;

  navDropdownSelector: string;

  navDropdownToggleSelector: string;

  mainNavSelector: string;

  totalWidth: number;

  restWidth: number;

  viewportWidth: number;

  /**
   * Only insert the document when using JSDOM for testing.
   */
  document: HTMLDocument;

  // eslint-disable-next-line default-param-last
  constructor(config: Config = defaultConfig, document?: HTMLDocument) {
    this.settings = { ...defaultConfig, ...config };
    this.count = 0;
    this.breaks = [];
    this.instance = 0;
    this.mainNavWrapper = null;

    this.navDropdown = null;
    this.navDropdownToggle = null;
    this.navDropdownToggleLabel = null;
    this.toggleWrapper = null;

    this.navDropdownSelector = `.${this.settings.navDropdownClassName}`;
    this.navDropdownToggleSelector = `.${this.settings.navDropdownToggleClassName}`;
    this.mainNavSelector = this.settings.mainNav;

    this.totalWidth = 0;
    this.restWidth = 0;
    this.viewportWidth = 0;

    this.document = document || window.document;
  }

  init(): void {
    // Feature test.
    if (!supports && typeof Node === 'undefined') {
      console.warn("This browser doesn't support GreedyNav");
      return;
    }

    // Options check
    if (
      !checkForSymbols(this.settings.navDropdownClassName) ||
      !checkForSymbols(this.settings.navDropdownToggleClassName)
    ) {
      console.warn(
        'No symbols allowed in navDropdownClassName & navDropdownToggleClassName. These are not selectors.'
      );
      return;
    }

    /**
     * Store nodes
     * @type {NodeList}
     */
    const navWrapperList = this.document.querySelectorAll<HTMLElement>(
      this.settings.mainNavWrapper
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
       * Set the instance number as data attribute
       */
      navWrapperElement.setAttribute('instance', `${this.count++}`);

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
      if (!navWrapperElement.querySelector(this.navDropdownSelector)) {
        console.warn("couldn't find the specified navDropdown element");
        return;
      }

      /**
       * Store the dropdown toggle element
       */
      this.navDropdownToggleSelector = `.${this.settings.navDropdownToggleClassName}`;
      if (!navWrapperElement.querySelector(this.navDropdownToggleSelector)) {
        console.warn("couldn't find the specified navDropdownToggle element");
        return;
      }

      /**
       * Event listeners
       */
      this.listeners(navWrapperElement);
    });

    /**
     * Count amount of instances
     */
    this.instance++;

    /**
     * Add class to HTML element to activate conditional CSS
     */
    this.document.documentElement.classList.add(this.settings.initClass);
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
    this.toggleWrapper = this.document.createElement('div');
    this.navDropdown = this.document.createElement('ul');
    this.navDropdownToggle = this.document.createElement('button');
    this.navDropdownToggleLabel = this.document.createElement('span');

    /**
     * Set ID on nav dropdown so we can reference it later
     */
    const dropdownId = 'greedy-nav-dropdown'
    this.navDropdown.setAttribute('id', dropdownId)

    /**
     * Set label for dropdown toggle
     * @type {string}
     */
    this.navDropdownToggle.innerHTML = this.settings.navDropdownLabel;

    this.navDropdownToggleLabel.innerHTML =
      this.settings.navDropdownToggleAriaLabel;

    /**
     * Set aria attributes for accessibility
     */
    this.navDropdownToggle.setAttribute('aria-expanded', 'false');
    this.navDropdownToggle.setAttribute('aria-controls', dropdownId);
    this.navDropdownToggle.setAttribute('type', 'button');
    this.navDropdownToggle.setAttribute(
      'aria-labelledby',
      'cadsGreedyNavLabel'
    );
    this.navDropdownToggleLabel.setAttribute('id', 'cadsGreedyNavLabel');
    this.navDropdownToggleLabel.className = 'cads-greedy-nav__label';
    this.navDropdown.setAttribute('aria-hidden', 'true');

    const headerLinks = document.querySelector('.js-cads-copy-into-nav');
    if (headerLinks) {
      // prepare items that can close the more dropdown on blur
      const closeNavOnBlur =
        headerLinks.lastElementChild?.querySelectorAll('a, button');
      closeNavOnBlur?.forEach((el) =>
        el.classList.add('js-cads-close-on-blur')
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
          'mainNav is not a direct child of mainNavWrapper, double check please'
        );
        return;
      }

      mainNav.insertAdjacentElement('afterend', this.toggleWrapper);
    }

    this.toggleWrapper.appendChild(this.navDropdownToggleLabel);
    this.toggleWrapper.appendChild(this.navDropdownToggle);
    this.toggleWrapper.appendChild(this.navDropdown);

    /**
     * Add classes so we can target elements
     */
    this.navDropdown.classList.add(this.settings.navDropdownClassName);
    this.navDropdown.classList.add('cads-greedy-nav__dropdown');

    this.navDropdownToggle.classList.add(
      this.settings.navDropdownToggleClassName
    );
    this.navDropdownToggle.classList.add('cads-greedy-nav__dropdown-toggle');

    // fix so button is type="button" and do not submit forms
    this.navDropdownToggle.setAttribute('type', 'button');

    this.toggleWrapper.classList.add(
      `${this.settings.navDropdownClassName}-wrapper`
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
      }, this.settings.throttleDelay)
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
      true
    );

    const { navDropdownClassName } = this.settings;

    const navDropdownToggle = navWrapper.querySelector<HTMLElement>(
      this.navDropdownToggleSelector
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

      if (!parent(relatedTarget(event, document), this.toggleWrapper)) {
        this.closeDropDown(navWrapper);

        const navLastDropdownLink = navWrapper.querySelector<HTMLElement>(
          `${this.navDropdownSelector} li:last-child a`
        );

        if (navLastDropdownLink) {
          navLastDropdownLink.removeEventListener(
            blurEventName,
            lastItemCloseHandler
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
            `${this.navDropdownSelector} .js-cads-copy-into-nav`
          );

          if (headerLinksInNav?.offsetParent) {
            lastItem = headerLinksInNav?.querySelector<HTMLElement>(
              '.js-cads-close-on-blur'
            );
          } else if (headerLinksInNav?.offsetParent === null) {
            // offsetParent returns null in this case as the header links in the nav have display: none
            // using nth-last-child(2) as the last-child in this case is the hidden header nav links
            lastItem = this.navDropdown?.querySelector(
              `li:nth-last-child(2) a`
            );
          } else {
            lastItem = this.navDropdown?.querySelector(`li:last-child a`);
          }

          if (!parent(relatedTarget(e, this.document), this.toggleWrapper)) {
            // tabbing backwards
            lastItem?.removeEventListener(blurEventName, lastItemCloseHandler);

            this.closeDropDown(navWrapper);
          } else {
            // tabbing forwards
            lastItem?.addEventListener(blurEventName, lastItemCloseHandler);
          }
        }
      );
    }

    /*
     * Remove when clicked outside dropdown
     */
    this.document.addEventListener('click', (event: MouseEvent) => {
      if (
        event.target &&
        !getClosest(<HTMLElement>event.target, `.${navDropdownClassName}`) &&
        navDropdownToggle &&
        event.target !== navDropdownToggle &&
        navWrapper.classList.contains('is-open')
      ) {
        this.closeDropDown(navWrapper);
      }
    });

    /**
     * Remove when escape key is pressed
     */
    this.document.onkeydown = (evt: KeyboardEvent) => {
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
      this.navDropdownSelector
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
          navDropdown.firstChild
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

    /**
     * update count on dropdown toggle button
     */
    if (mainNav && mainNav.children.length > 0 && this.settings.count) {
      updateCount(navigation, this.navDropdownToggleSelector, this.breaks);
    }

    /**
     * If item has been moved to dropdown trigger the callback
     */
    this.settings.moved();
  }

  /**
   * Move item to menu
   */
  toMenu(_this: HTMLElement): void {
    const navDropdown = _this.querySelector<HTMLElement>(
      this.navDropdownSelector
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

    /**
     * update count on dropdown toggle button
     */
    if (mainNav && mainNav.children.length > 0 && this.settings.count) {
      updateCount(_this, this.navDropdownToggleSelector, this.breaks);
    }

    /**
     * If item has been moved back to the main menu trigger the callback
     */
    this.settings.movedBack();
  }

  /**
   * Move item to array
   * @param item
   */
  doesItFit(_this: HTMLElement): void {
    /**
     * Increase instance
     */
    this.instance++;

    /**
     * Debounced execution of the main logic
     */

    /**
     * Update width
     */
    Object.assign(this, calculateWidths(_this, this.settings.offsetPixels));

    const mainNav = _this.querySelector<HTMLElement>(this.mainNavSelector);

    if (!mainNav) {
      throw new Error('main nav not found');
    }

    /**
     * Keep executing until all menu items that are overflowing are moved
     */
    while (
      (this.totalWidth <= this.restWidth && mainNav.children.length > 0) ||
      (this.viewportWidth < this.settings.breakPoint &&
        mainNav.children.length > 0)
    ) {
      // move item to dropdown
      this.toDropdown(_this);
      // recalculate widths
      Object.assign(this, calculateWidths(_this, this.settings.offsetPixels));
      // update dropdownToggle label
      if (this.viewportWidth < this.settings.breakPoint) {
        updateLabel(
          _this,
          this.settings.navDropdownBreakpointLabel,
          this.navDropdownToggleSelector,
          this.settings.navDropdownLabelActive
        );
      }
    }

    /**
     * Keep executing until all menu items that are able to move back are moved
     */
    while (
      this.totalWidth >= this.breaks[this.breaks.length - 1] &&
      this.viewportWidth > this.settings.breakPoint
    ) {
      // move item to menu
      this.toMenu(_this);
      // update dropdownToggle label
      if (this.viewportWidth > this.settings.breakPoint) {
        updateLabel(
          _this,
          this.settings.navDropdownLabel,
          this.navDropdownToggleSelector,
          this.settings.navDropdownLabelActive
        );
      }
    }

    /**
     * If there are no items in dropdown hide dropdown
     */

    const navDropdown = _this.querySelector<HTMLElement>(
      this.navDropdownSelector
    );
    if (navDropdown && this.breaks.length < 1) {
      navDropdown.classList.remove('show');
      // show navDropdownLabel
      updateLabel(
        _this,
        this.settings.navDropdownLabel,
        this.navDropdownToggleSelector,
        this.settings.navDropdownLabelActive
      );
    }

    /**
     * If there are no items in menu
     */
    if (mainNav && mainNav.children.length < 1) {
      // show navDropdownBreakpointLabel
      _this.classList.add('is-empty');
      updateLabel(
        _this,
        this.settings.navDropdownBreakpointLabel,
        this.navDropdownToggleSelector,
        this.settings.navDropdownLabelActive
      );
    } else {
      _this.classList.remove('is-empty');
    }

    /**
     * Check if we need to show toggle menu button
     */
    showToggle(_this, this.navDropdownToggleSelector, this.breaks);
  }

  /**
   * Destroy the current initialization.
   * @public
   */
  destroy(): void {
    // Remove feedback class
    this.document.documentElement.classList.remove(this.settings.initClass);
    // Remove toggle
    if (this.toggleWrapper) {
      this.toggleWrapper.remove();
    }
  }

  openDropDown(navWrapper: HTMLElement): void {
    const { navDropdownLabelActive } = this.settings;

    const navDropdown = navWrapper.querySelector<HTMLElement>(
      this.navDropdownSelector
    );

    const navDropdownToggle = navWrapper.querySelector<HTMLElement>(
      this.navDropdownToggleSelector
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
        navDropdownLabelActive
      );
    }
  }

  closeDropDown(navWrapper: HTMLElement): void {
    const { navDropdownLabel, navDropdownLabelActive } = this.settings;

    const navDropdown = navWrapper.querySelector<HTMLElement>(
      this.navDropdownSelector
    );

    const navDropdownToggle = navWrapper.querySelector<HTMLElement>(
      this.navDropdownToggleSelector
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
        navDropdownLabelActive
      );
    }
  }
}
const GreedyNav = {
  init: (options: Config = defaultConfig): GreedyNavMenu => {
    const menu = new GreedyNavMenu(options);
    menu.init();
    return menu;
  },
};
/**
 * Initialize Plugin
 * @public
 * @param {Object} options User settings
 */
export default GreedyNav;
