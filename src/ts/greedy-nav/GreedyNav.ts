/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { blurEventName } from './helpers';
import { Config, defaultConfig } from './Config';

const root = window;

/**
 * Variables
 */
const GreedyNav: any = {}; // Object for public APIs
/**
 * Object to store instances with breakpoints where the instances menu item"s didin"t fit.
 */
const supports = !!document.querySelector && !!root.addEventListener; // Feature test

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
    let finishedTimeout: number;
    return function debounced(this: Return, ...args: []) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this; // TODO: figure out what this should be

        const later = () => {
            timeout = null;
            if (immediate) func.apply(context, args);
        };
        const callNow = immediate && timeout;

        if (timeout) {
            window.clearTimeout(timeout);
        }

        timeout = window.setTimeout(later, wait);
        if (callNow) func.apply(context, args);

        // Safari requires this to correctly fire resize when leaving fullscreen mode.
        window.clearTimeout(finishedTimeout);
        finishedTimeout = window.setTimeout(() => {
            func.apply(context, args);
        }, 800);
    };
}

/**
 * return true if el has a parent
 * @param el
 * @param parent
 */
const parent = (element: HTMLElement, parentNode: Node) => {
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
 * Toggle class on element
 * @param el
 * @param className
 */
const toggleClass = (el: HTMLElement, className: string) => {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        const classes = el.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) classes.splice(existingIndex, 1);
        else classes.push(className);

        // eslint-disable-next-line no-param-reassign
        el.className = classes.join(' ');
    }
};

const removeClass = (el: HTMLElement, className: string) => {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        // eslint-disable-next-line no-param-reassign
        el.className = el.className.replace(new RegExp(`s?${className}s?`), '');
    }
};

const addClass = (el: HTMLElement, className: string) => {
    if (el.classList) {
        el.classList.add(className);
    } else {
        // eslint-disable-next-line no-param-reassign
        el.className = `${el.className} ${className}`;
    }
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

        if (navDropdownToggle == null) {
            return;
        }

        navDropdownToggle.classList.add('priority-nav-is-hidden');
        navDropdownToggle.classList.remove('priority-nav-is-visible');
        navWrapperElement.classList.remove('priority-nav-has-dropdown');

        /**
         * Set aria attributes for accessibility
         */

        const navWrapper = navWrapperElement.querySelector<HTMLElement>(
            '.priority-nav__wrapper'
        );

        if (navWrapper) {
            navWrapper.setAttribute('aria-haspopup', 'false');
        }
    } else {
        const navDropdownToggle = navWrapperElement.querySelector<HTMLElement>(
            navDropdownToggleSelector
        );

        if (navDropdownToggle == null) {
            return;
        }
        navDropdownToggle.classList.add('priority-nav-is-visible');
        navDropdownToggle.classList.remove('priority-nav-is-hidden');
        navWrapperElement.classList.add('priority-nav-has-dropdown');

        /**
         * Set aria attributes for accessibility
         */
        const navWrapper = navWrapperElement.querySelector<HTMLElement>(
            '.priority-nav__wrapper'
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
        ?.setAttribute('priorityNav-count', `${breaks.length}`);
};

export const updateLabel = (
    menu: HTMLElement,
    label: string,
    navDropdownToggleSelector: string,
    navDropdownLabelActive: string
): void => {
    const toggle = menu.querySelector<HTMLElement>(navDropdownToggleSelector);

    if (toggle == null) {
        return;
    }

    toggle.innerHTML = label;

    if (label === navDropdownLabelActive) {
        toggle.setAttribute('aria-expanded', 'true');
    } else {
        toggle.setAttribute('aria-expanded', 'false');
    }
};

export const insertAfter = (newNode: Node, referenceNode: Node): void => {
    if (referenceNode.parentNode !== null) {
        referenceNode.parentNode.insertBefore(
            newNode,
            referenceNode.nextSibling
        );
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
    // Check if parent is the navwrapper before calculating its width

    const restWidth = getChildrenWidth(_this) + offsetPixels;
    const viewportWidth = viewportSize().width;

    return { totalWidth, restWidth, viewportWidth };
};

class GreedyNavMenu {
    settings: Config;

    count: number;

    // TODO: better name, less nesting
    breaks: number[];

    instance: number;

    mainNavWrapper: Nullable<HTMLElement>;

    navDropdown: Nullable<HTMLUListElement>;

    navDropdownToggle: Nullable<HTMLElement>;

    navDropdownToggleLabel: Nullable<HTMLSpanElement>;

    toggleWrapper: Nullable<HTMLSpanElement>;

    navDropdownSelector: string;

    navDropdownToggleSelector: string;

    mainNavSelector: string;

    totalWidth: number;

    restWidth: number;

    viewportWidth: number;

    constructor(config: Config) {
        this.settings = { ...defaultConfig, ...config };
        this.count = 0;
        this.breaks = [];
        this.instance = 0;
        this.mainNavWrapper = null;

        this.navDropdown = null;
        this.navDropdownToggle = null;
        this.navDropdownToggleLabel = null;
        this.toggleWrapper = null;

        this.navDropdownSelector = '';
        this.navDropdownToggleSelector = '';
        this.mainNavSelector = '';

        this.totalWidth = 0;
        this.restWidth = 0;
        this.viewportWidth = 0;
    }

    init() {
        // Feature test.
        if (!supports && typeof Node === 'undefined') {
            console.warn("This browser doesn't support priorityNav");
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
        const navWrapperList = document.querySelectorAll<HTMLElement>(
            this.settings.mainNavWrapper
        );

        /**
         * Loop over every instance and reference _this
         */
        navWrapperList.forEach(navWrapperElement => {
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
                console.warn(
                    "couldn't find the specified mainNavWrapper element"
                );
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
            if (
                !navWrapperElement.querySelector(this.navDropdownToggleSelector)
            ) {
                console.warn(
                    "couldn't find the specified navDropdownToggle element"
                );
                return;
            }

            /**
             * Event listeners
             */
            this.listeners(navWrapperElement);

            /**
             * Start first check
             */
            this.doesItFit(navWrapperElement, this.settings.throttleDelay);
        });

        /**
         * Count amount of instances
         */
        this.instance++;

        /**
         * Add class to HTML element to activate conditional CSS
         */
        document.documentElement.classList.add(this.settings.initClass);
    }

    /**
     * Check if dropdown menu is already on page before creating it
     * @param mainNavWrapper
     */
    prepareHtml(_this: HTMLElement) {
        // TODO this function re-uses variables - navDropdown is set
        // to an HTMLElement and then changed to a string later on.

        /**
         * Create dropdow menu
         * @type {HTMLElement}
         */
        this.toggleWrapper = document.createElement('span');
        this.navDropdown = document.createElement('ul');
        this.navDropdownToggle = document.createElement('button');
        this.navDropdownToggleLabel = document.createElement('span');

        /**
         * Set label for dropdown toggle
         * @type {string}
         */
        this.navDropdownToggle.innerHTML = this.settings.navDropdownLabel;

        this.navDropdownToggleLabel.innerHTML = this.settings.navDropdownToggleAriaLabel;

        /**
         * Set aria attributes for accessibility
         */
        this.navDropdownToggle.setAttribute('aria-expanded', 'false');
        this.navDropdownToggle.setAttribute('type', 'button');
        this.navDropdownToggle.setAttribute(
            'aria-labelledby',
            'priorityNavLabel'
        );
        this.navDropdownToggleLabel.setAttribute('id', 'priorityNavLabel');
        this.navDropdown.setAttribute('aria-hidden', 'true');

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

            insertAfter(this.toggleWrapper, mainNav);
        }

        this.toggleWrapper.appendChild(this.navDropdownToggleLabel);
        this.toggleWrapper.appendChild(this.navDropdownToggle);
        this.toggleWrapper.appendChild(this.navDropdown);

        /**
         * Add classes so we can target elements
         */
        this.navDropdown.classList.add(this.settings.navDropdownClassName);
        this.navDropdown.classList.add('priority-nav__dropdown');

        this.navDropdownToggle.classList.add(
            this.settings.navDropdownToggleClassName
        );
        this.navDropdownToggle.classList.add('priority-nav__dropdown-toggle');

        // fix so button is type="button" and do not submit forms
        this.navDropdownToggle.setAttribute('type', 'button');

        this.toggleWrapper.classList.add(
            `${this.settings.navDropdownClassName}-wrapper`
        );
        this.toggleWrapper.classList.add('priority-nav__wrapper');

        _this.classList.add('priority-nav');
    }

    /**
     * Bind eventlisteners
     */
    listeners(_this: HTMLElement) {
        // Check if an item needs to move
        // if (window.attachEvent) {
        //     window.attachEvent('onresize', () => {
        //         if (priorityNav.doesItFit) priorityNav.doesItFit(_this);
        //     });
        // } else if (window.addEventListener) {
        window.addEventListener('resize', () => {
            this.doesItFit(_this, this.settings.throttleDelay);
        });

        window.addEventListener(
            'orientationchange',
            () => {
                this.doesItFit(_this, this.settings.throttleDelay);
            },
            true
        );
        // }
        const {
            navDropdownClassName,
            navDropdownLabelActive,
            navDropdownLabel
        } = this.settings;
        // Toggle dropdown
        _this
            .querySelector(this.navDropdownToggleSelector)!
            .addEventListener('mousedown', event => {
                event.stopPropagation();
                toggleClass(
                    _this.querySelector<HTMLElement>(this.navDropdownSelector)!,
                    'show'
                );
                toggleClass(<HTMLElement>event.currentTarget!, 'is-open'); // TODO find out what this is meant to be
                toggleClass(_this, 'is-open');

                /**
                 * Toggle aria hidden for accessibility
                 */
                if (_this.classList.contains('is-open')) {
                    _this
                        .querySelector(this.navDropdownSelector)!
                        .setAttribute('aria-hidden', 'true');

                    updateLabel(
                        _this,
                        navDropdownLabelActive,
                        this.navDropdownToggleSelector,
                        this.settings.navDropdownLabelActive
                    );

                    _this
                        .querySelector<HTMLElement>(this.navDropdownSelector)!
                        .blur();
                } else {
                    _this
                        .querySelector(this.navDropdownSelector)!
                        .setAttribute('aria-hidden', 'false');

                    updateLabel(
                        _this,
                        navDropdownLabel,
                        this.navDropdownToggleSelector,
                        this.settings.navDropdownLabelActive
                    );
                }
            });

        const lastItemCloseHandler = (event: FocusEvent) => {
            if (this.toggleWrapper === null) {
                return;
            }

            if (!parent(<HTMLElement>event.relatedTarget, this.toggleWrapper)) {
                removeClass(
                    _this.querySelector<HTMLElement>(this.navDropdownSelector)!,
                    'show'
                );
                removeClass(
                    _this.querySelector<HTMLElement>(
                        this.navDropdownToggleSelector
                    )!,
                    'is-open'
                );
                removeClass(_this, 'is-open');
                updateLabel(
                    _this,
                    navDropdownLabel,
                    this.navDropdownToggleSelector,
                    this.settings.navDropdownLabelActive
                );
                _this
                    .querySelector<HTMLElement>(
                        `${this.navDropdownSelector} li:last-child a`
                    )!
                    .removeEventListener(blurEventName, lastItemCloseHandler);
            }
        };

        _this
            .querySelector<HTMLElement>(this.navDropdownToggleSelector)!
            .addEventListener('focus', (event: FocusEvent) => {
                if (_this.className.indexOf('is-open') === -1) {
                    addClass(
                        _this.querySelector<HTMLElement>(
                            this.navDropdownSelector
                        )!,
                        'show'
                    );
                    if (
                        event.currentTarget &&
                        event.currentTarget instanceof HTMLElement
                    ) {
                        addClass(event.currentTarget, 'is-open');
                    }
                    addClass(_this, 'is-open');
                    updateLabel(
                        _this,
                        navDropdownLabelActive,
                        this.navDropdownToggleSelector,
                        this.settings.navDropdownLabelActive
                    );

                    /**
                     * Toggle aria hidden for accessibility
                     */
                    _this
                        .querySelector<HTMLElement>(this.navDropdownSelector)!
                        .setAttribute('aria-hidden', 'false');
                    _this
                        .querySelector<HTMLElement>(this.navDropdownSelector)!
                        .blur();
                }
            });

        _this
            .querySelector<HTMLElement>(this.navDropdownToggleSelector)!
            .addEventListener(blurEventName, (e: FocusEvent) => {
                if (this.toggleWrapper === null) {
                    return;
                }

                if (!parent(<HTMLElement>e.relatedTarget, this.toggleWrapper)) {
                    // clean up
                    document
                        .querySelector<HTMLElement>(
                            `${this.navDropdown} li:last-child a`
                        )!
                        .removeEventListener(
                            blurEventName,
                            lastItemCloseHandler
                        );

                    removeClass(
                        _this.querySelector<HTMLElement>(
                            this.navDropdownSelector
                        )!,
                        'show'
                    );
                    if (
                        e.currentTarget !== null &&
                        e.currentTarget instanceof HTMLElement
                    ) {
                        removeClass(e.currentTarget, 'is-open');
                    }
                    removeClass(_this, 'is-open');

                    updateLabel(
                        _this,
                        navDropdownLabel,
                        this.navDropdownToggleSelector,
                        this.settings.navDropdownLabelActive
                    );

                    /**
                     * Toggle aria hidden for accessibility
                     */
                    _this
                        .querySelector<HTMLElement>(this.navDropdownSelector)!
                        .setAttribute('aria-hidden', 'false');
                } else {
                    document
                        .querySelector<HTMLElement>(
                            `${this.navDropdownSelector} li:last-child a`
                        )!
                        .addEventListener(blurEventName, lastItemCloseHandler);
                }
            });

        /*
         * Close menu when last item is selected
         */

        /*
         * Remove when clicked outside dropdown
         */
        document.addEventListener('click', (event: MouseEvent) => {
            if (
                !getClosest(
                    <HTMLElement>event.target!,
                    `.${navDropdownClassName}`
                ) &&
                event.target !==
                    _this.querySelector(this.navDropdownToggleSelector)
            ) {
                _this
                    .querySelector<HTMLElement>(this.navDropdownSelector)!
                    .classList.remove('show');
                _this
                    .querySelector<HTMLElement>(this.navDropdownToggleSelector)!
                    .classList.remove('is-open');
                _this.classList.remove('is-open');
                updateLabel(
                    _this,
                    navDropdownLabel,
                    this.navDropdownToggleSelector,
                    this.settings.navDropdownLabelActive
                );
            }
        });

        /**
         * Remove when escape key is pressed
         */
        document.onkeydown = (evt: KeyboardEvent) => {
            const event = evt || window.event;
            if (event.keyCode === 27) {
                document
                    .querySelector<HTMLElement>(this.navDropdownSelector)!
                    .classList.remove('show');
                document
                    .querySelector<HTMLElement>(this.navDropdownToggleSelector)!
                    .classList.remove('is-open');

                if (this.mainNavWrapper) {
                    this.mainNavWrapper.classList.remove('is-open');
                }
            }
        };
    }

    /**
     * Move item to menu
     */
    toMenu(_this: HTMLElement) {
        /**
         * move last child of navigation menu to dropdown
         */
        if (
            _this.querySelector<HTMLElement>(this.navDropdownSelector)!.children
                .length > 0
        ) {
            _this
                .querySelector<HTMLElement>(this.mainNavSelector)!
                .appendChild(
                    _this.querySelector<HTMLElement>(this.navDropdownSelector)!
                        .firstElementChild!
                );
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
        if (
            _this.querySelector<HTMLElement>(this.mainNavSelector)!.children
                .length > 0 &&
            this.settings.count
        ) {
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
    doesItFit(_this: HTMLElement, throttleDelay: number) {
        /**
         * Check if it is the first run
         */
        const currentInstance = _this.getAttribute('instance');
        const firstRun = currentInstance === '0';

        const delay = firstRun ? 0 : throttleDelay;

        /**
         * Increase instance
         */
        this.instance++;

        /**
         * Debounced execution of the main logic
         */
        debounce(() => {
            /**
             * Update width
             */
            Object.assign(
                this,
                calculateWidths(_this, this.settings.offsetPixels)
            );

            /**
             * Keep executing until all menu items that are overflowing are moved
             */
            while (
                (this.totalWidth <= this.restWidth &&
                    _this.querySelector<HTMLElement>(this.mainNavSelector)!
                        .children.length > 0) ||
                (this.viewportWidth < this.settings.breakPoint &&
                    _this.querySelector<HTMLElement>(this.mainNavSelector)!
                        .children.length > 0)
            ) {
                // move item to dropdown
                this.toDropdown(_this);
                // recalculate widths
                Object.assign(
                    this,
                    calculateWidths(_this, this.settings.offsetPixels)
                );
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
            if (this.breaks.length < 1) {
                _this
                    .querySelector<HTMLElement>(this.navDropdownSelector)!
                    .classList.remove('show');
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
            if (
                _this.querySelector<HTMLElement>(this.mainNavSelector)!.children
                    .length < 1
            ) {
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
        }, delay)();
    }

    /**
     * Move item to dropdown
     */
    toDropdown(_this: HTMLElement) {
        /**
         * move last child of navigation menu to dropdown
         */
        if (
            _this.querySelector<HTMLElement>(this.navDropdownSelector)!
                .firstChild &&
            _this.querySelector<HTMLElement>(this.mainNavSelector)!.children
                .length > 0
        ) {
            _this
                .querySelector<HTMLElement>(this.navDropdownSelector)!
                .insertBefore(
                    _this.querySelector<HTMLElement>(this.mainNavSelector)!
                        .lastElementChild!,
                    _this.querySelector<HTMLElement>(this.navDropdownSelector)!
                        .firstChild
                );
        } else if (
            _this.querySelector<HTMLElement>(this.mainNavSelector)!.children
                .length > 0
        ) {
            _this
                .querySelector<HTMLElement>(this.navDropdownSelector)!
                .appendChild(
                    _this.querySelector<HTMLElement>(this.mainNavSelector)!
                        .lastElementChild!
                );
        }

        /**
         * store breakpoints
         */
        this.breaks.push(this.restWidth);

        /**
         * check if we need to show toggle menu button
         */
        showToggle(_this, this.navDropdownToggleSelector, this.breaks);

        /**
         * update count on dropdown toggle button
         */
        if (
            _this.querySelector<HTMLElement>(this.mainNavSelector)!.children
                .length > 0 &&
            this.settings.count
        ) {
            updateCount(_this, this.navDropdownToggleSelector, this.breaks);
        }

        /**
         * If item has been moved to dropdown trigger the callback
         */
        this.settings.moved();
    }

    /**
     * Destroy the current initialization.
     * @public
     */
    destroy() {
        // Remove feedback class
        document.documentElement.classList.remove(this.settings.initClass);
        // Remove toggle
        if (this.toggleWrapper) {
            this.toggleWrapper.remove();
        }
        // Remove settings
        // settings = null; // TODO: Cleanup settings another way
    }
}

/**
 * Initialize Plugin
 * @public
 * @param {Object} options User settings
 */
GreedyNav.init = (options: Config = defaultConfig) => {
    const menu = new GreedyNavMenu(options);
    menu.init();
};

export default GreedyNav;
