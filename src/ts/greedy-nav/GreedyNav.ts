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
const breaks: number[][] = [[]];
const supports = !!document.querySelector && !!root.addEventListener; // Feature test
let defaultSettings: Config = defaultConfig; // TODO: fix this global mess
let instance = 0;
let navDropdownToggleSelector: string;
let navDropdownToggleLabel: HTMLSpanElement;
let navDropdownToggleLabelSelector: string;
let dropDownWidth: number;
let toggleWrapper: HTMLSpanElement;
let viewportWidth = 0;

type InterableInternal = Array<any> | Record<string, unknown> | NodeList;
type Callback = () => void;

type Instance = number;
type Identifier = number;

/**
 * Get the closest matching element up the DOM tree
 * @param {Element} elem Starting element
 * @param {String} selector Selector to match against (class, ID, or data attribute)
 * @return {Boolean|Element} Returns false if not match found
 */
export const getClosest = (
    elem: HTMLElement,
    selector: string
): HTMLElement | false => {
    const firstChar = selector.charAt(0);
    // eslint-disable-next-line no-param-reassign
    for (
        ;
        elem;
        // eslint-disable-next-line no-param-reassign
        elem = <HTMLElement>elem.parentElement!
    ) {
        if (firstChar === '.') {
            if (elem.classList.contains(selector.substr(1))) {
                return elem;
            }
        } else if (firstChar === '#') {
            if (elem.id === selector.substr(1)) {
                return elem;
            }
        } else if (firstChar === '[') {
            const attr = selector.substr(1, selector.length - 2);
            if (elem.hasAttribute(attr)) {
                return elem;
            }
        }
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
function debounce<Return>(
    func: () => Return,
    wait: number,
    immediate?: boolean
) {
    let timeout: Nullable<number>;
    let finishedTimeout: number;
    return function debounced(this: Return, ...args: []) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this; // TODO: figure out what this should be

        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;

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
const showToggle = (_this: HTMLElement, identifier: number) => {
    if (breaks[identifier].length < 1) {
        _this
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
            .classList.add('priority-nav-is-hidden');
        _this
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
            .classList.remove('priority-nav-is-visible');
        _this.classList.remove('priority-nav-has-dropdown');

        /**
         * Set aria attributes for accessibility
         */
        _this
            .querySelector<HTMLElement>('.priority-nav__wrapper')!
            .setAttribute('aria-haspopup', 'false');
    } else {
        _this
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
            .classList.add('priority-nav-is-visible');
        _this
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
            .classList.remove('priority-nav-is-hidden');
        _this.classList.add('priority-nav-has-dropdown');

        /**
         * Set aria attributes for accessibility
         */
        _this
            .querySelector<HTMLElement>('.priority-nav__wrapper')!
            .setAttribute('aria-haspopup', 'true');
    }
};

/**
 * Update count on dropdown toggle button
 */
const updateCount = (_this: HTMLElement, identifier: number) => {
    _this
        .querySelector<HTMLElement>(navDropdownToggleSelector)!
        .setAttribute('priorityNav-count', `${breaks[identifier].length}`);
};

const updateLabel = (_this: HTMLElement, label: string) => {
    // eslint-disable-next-line no-param-reassign
    _this.querySelector<HTMLElement>(
        navDropdownToggleSelector
    )!.innerHTML = label;
    if (label === defaultSettings.navDropdownLabelActive) {
        _this
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
            .setAttribute('aria-expanded', 'true');
    } else {
        _this
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
            .setAttribute('aria-expanded', 'false');
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
const calculateWidths = (_this: HTMLElement, navDropdownSelector: string) => {
    const totalWidth = getElementContentWidth(_this);
    // Check if parent is the navwrapper before calculating its width

    if (_this.querySelector(navDropdownSelector)?.parentNode === _this) {
        dropDownWidth = _this.querySelector<HTMLElement>(navDropdownSelector)!
            .offsetWidth;
    } else {
        dropDownWidth = 0;
    }
    const restWidth = getChildrenWidth(_this) + defaultSettings.offsetPixels;
    viewportWidth = viewportSize().width;

    return { totalWidth, restWidth };
};

class GreedyNavMenu {
    settings: Config;

    /**
     * Number of instances
     */
    count: number;

    mainNavWrapper: Nullable<HTMLElement>;

    navDropdown: Nullable<HTMLUListElement>;

    navDropdownToggle: Nullable<HTMLElement>;

    navDropdownSelector: string;

    mainNavSelector: string;

    totalWidth: number;

    restWidth: number;

    constructor(config: Config) {
        this.settings = { ...defaultConfig, ...config };
        this.count = 0;
        this.mainNavWrapper = null;

        this.navDropdown = null;
        this.navDropdownToggle = null;
        this.navDropdownSelector = '';
        this.mainNavSelector = '';

        this.totalWidth = 0;

        this.restWidth = 0;
    }

    init() {
        /**
         * Merge user options with defaults
         * @type {Object}
         */
        defaultSettings = this.settings;

        // Feature test.
        if (!supports && typeof Node === 'undefined') {
            console.warn("This browser doesn't support priorityNav");
            return;
        }

        // Options check
        if (
            !checkForSymbols(defaultSettings.navDropdownClassName) ||
            !checkForSymbols(defaultSettings.navDropdownToggleClassName)
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
            defaultSettings.mainNavWrapper
        );

        /**
         * Loop over every instance and reference _this
         */
        navWrapperList.forEach(navWrapperElement => {
            /**
             * Create breaks array
             * @type {number}
             */
            breaks[this.count] = [];

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
            this.mainNavSelector = defaultSettings.mainNav;
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
            this.navDropdownSelector = `.${defaultSettings.navDropdownClassName}`;
            if (!navWrapperElement.querySelector(this.navDropdownSelector)) {
                console.warn("couldn't find the specified navDropdown element");
                return;
            }

            /**
             * Store the dropdown toggle element
             */
            navDropdownToggleSelector = `.${defaultSettings.navDropdownToggleClassName}`;
            if (!navWrapperElement.querySelector(navDropdownToggleSelector)) {
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
            this.doesItFit(navWrapperElement);
        });

        /**
         * Count amount of instances
         */
        instance++;

        /**
         * Add class to HTML element to activate conditional CSS
         */
        document.documentElement.classList.add(defaultSettings.initClass);
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
        toggleWrapper = document.createElement('span');
        this.navDropdown = document.createElement('ul');
        this.navDropdownToggle = document.createElement('button');
        navDropdownToggleLabel = document.createElement('span');

        /**
         * Set label for dropdown toggle
         * @type {string}
         */
        this.navDropdownToggle.innerHTML = this.settings.navDropdownLabel;

        navDropdownToggleLabel.innerHTML = this.settings.navDropdownToggleAriaLabel;

        /**
         * Set aria attributes for accessibility
         */
        this.navDropdownToggle.setAttribute('aria-expanded', 'false');
        this.navDropdownToggle.setAttribute('type', 'button');
        this.navDropdownToggle.setAttribute(
            'aria-labelledby',
            'priorityNavLabel'
        );
        navDropdownToggleLabel.setAttribute('id', 'priorityNavLabel');
        this.navDropdown.setAttribute('aria-hidden', 'true');

        /**
         * Move elements to the right spot
         */
        if (_this.querySelector(this.mainNavSelector)!.parentNode !== _this) {
            console.warn(
                'mainNav is not a direct child of mainNavWrapper, double check please'
            );
            return;
        }

        insertAfter(toggleWrapper, _this.querySelector(this.mainNavSelector)!);

        toggleWrapper.appendChild(navDropdownToggleLabel);
        toggleWrapper.appendChild(this.navDropdownToggle);
        toggleWrapper.appendChild(this.navDropdown);

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

        toggleWrapper.classList.add(
            `${this.settings.navDropdownClassName}-wrapper`
        );
        toggleWrapper.classList.add('priority-nav__wrapper');

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
            this.doesItFit(_this);
        });

        window.addEventListener(
            'orientationchange',
            () => {
                this.doesItFit(_this);
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
            .querySelector(navDropdownToggleSelector)!
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

                    updateLabel(_this, navDropdownLabelActive);

                    _this
                        .querySelector<HTMLElement>(this.navDropdownSelector)!
                        .blur();
                } else {
                    _this
                        .querySelector(this.navDropdownSelector)!
                        .setAttribute('aria-hidden', 'false');

                    updateLabel(_this, navDropdownLabel);
                }
            });

        const lastItemCloseHandler = (event: FocusEvent) => {
            if (!parent(<HTMLElement>event.relatedTarget, toggleWrapper)) {
                removeClass(
                    _this.querySelector<HTMLElement>(this.navDropdownSelector)!,
                    'show'
                );
                removeClass(
                    _this.querySelector<HTMLElement>(
                        navDropdownToggleSelector
                    )!,
                    'is-open'
                );
                removeClass(_this, 'is-open');
                updateLabel(_this, navDropdownLabel);
                _this
                    .querySelector<HTMLElement>(
                        `${this.navDropdownSelector} li:last-child a`
                    )!
                    .removeEventListener(blurEventName, lastItemCloseHandler);
            }
        };

        _this
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
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
                    updateLabel(_this, navDropdownLabelActive);

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
            .querySelector<HTMLElement>(navDropdownToggleSelector)!
            .addEventListener(blurEventName, (e: FocusEvent) => {
                if (!parent(<HTMLElement>e.relatedTarget, toggleWrapper)) {
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

                    updateLabel(_this, navDropdownLabel);

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
                event.target !== _this.querySelector(navDropdownToggleSelector)
            ) {
                _this
                    .querySelector<HTMLElement>(this.navDropdownSelector)!
                    .classList.remove('show');
                _this
                    .querySelector<HTMLElement>(navDropdownToggleSelector)!
                    .classList.remove('is-open');
                _this.classList.remove('is-open');
                updateLabel(_this, navDropdownLabel);
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
                    .querySelector<HTMLElement>(navDropdownToggleSelector)!
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
    toMenu(_this: HTMLElement, identifier: Identifier) {
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
        breaks[identifier].pop();

        /**
         * Check if we need to show toggle menu button
         */
        showToggle(_this, identifier);

        /**
         * update count on dropdown toggle button
         */
        if (
            _this.querySelector<HTMLElement>(this.mainNavSelector)!.children
                .length > 0 &&
            this.settings.count
        ) {
            updateCount(_this, identifier);
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
    doesItFit(_this: HTMLElement) {
        /**
         * Check if it is the first run
         */
        const currentInstance = _this.getAttribute('instance');
        const firstRun = currentInstance === '0';

        const delay = firstRun ? 0 : defaultSettings.throttleDelay;

        /**
         * Increase instance
         */
        instance++;

        /**
         * Debounced execution of the main logic
         */
        debounce(() => {
            /**
             * Get the current element"s instance
             * @type {string}
             */
            const identifier: Identifier = parseInt(
                _this.getAttribute('instance')!,
                10
            );

            /**
             * Update width
             */
            this.totalWidth = calculateWidths(
                _this,
                this.navDropdownSelector
            ).totalWidth;
            this.restWidth = calculateWidths(
                _this,
                this.navDropdownSelector
            ).restWidth;

            /**
             * Keep executing until all menu items that are overflowing are moved
             */
            while (
                (this.totalWidth <= this.restWidth &&
                    _this.querySelector<HTMLElement>(this.mainNavSelector)!
                        .children.length > 0) ||
                (viewportWidth < defaultSettings.breakPoint &&
                    _this.querySelector<HTMLElement>(this.mainNavSelector)!
                        .children.length > 0)
            ) {
                // move item to dropdown
                this.toDropdown(_this, identifier);
                // recalculate widths
                this.totalWidth = calculateWidths(
                    _this,
                    this.navDropdownSelector
                ).totalWidth;
                this.restWidth = calculateWidths(
                    _this,
                    this.navDropdownSelector
                ).restWidth;
                // update dropdownToggle label
                if (viewportWidth < defaultSettings.breakPoint) {
                    updateLabel(
                        _this,
                        defaultSettings.navDropdownBreakpointLabel
                    );
                }
            }

            /**
             * Keep executing until all menu items that are able to move back are moved
             */
            while (
                this.totalWidth >=
                    breaks[identifier][breaks[identifier].length - 1] &&
                viewportWidth > defaultSettings.breakPoint
            ) {
                // move item to menu
                this.toMenu(_this, identifier);
                // update dropdownToggle label
                if (viewportWidth > defaultSettings.breakPoint) {
                    updateLabel(_this, defaultSettings.navDropdownLabel);
                }
            }

            /**
             * If there are no items in dropdown hide dropdown
             */
            if (breaks[identifier].length < 1) {
                _this
                    .querySelector<HTMLElement>(this.navDropdownSelector)!
                    .classList.remove('show');
                // show navDropdownLabel
                updateLabel(_this, defaultSettings.navDropdownLabel);
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
                updateLabel(_this, defaultSettings.navDropdownBreakpointLabel);
            } else {
                _this.classList.remove('is-empty');
            }

            /**
             * Check if we need to show toggle menu button
             */
            showToggle(_this, identifier);
        }, delay)();
    }

    /**
     * Move item to dropdown
     */
    toDropdown(_this: HTMLElement, identifier: Identifier) {
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
        breaks[identifier].push(this.restWidth);

        /**
         * check if we need to show toggle menu button
         */
        showToggle(_this, identifier);

        /**
         * update count on dropdown toggle button
         */
        if (
            _this.querySelector<HTMLElement>(this.mainNavSelector)!.children
                .length > 0 &&
            this.settings.count
        ) {
            updateCount(_this, identifier);
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
        // If plugin isn"t already initialized, stop
        if (!defaultSettings) return; // TODO: replace with initialised var?
        // Remove feedback class
        document.documentElement.classList.remove(this.settings.initClass);
        // Remove toggle
        toggleWrapper.remove();
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
