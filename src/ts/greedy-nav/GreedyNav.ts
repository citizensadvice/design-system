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
let count = 0;
let mainNavWrapper: HTMLElement;
let totalWidth: number;
let restWidth: number;
let mainNav: string;
let navDropdown: HTMLUListElement;
let navDropdownSelector: string;
let navDropdownToggle: HTMLButtonElement;
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
    let timeout: number | null;
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
    let el: (Node & ParentNode) | null = element;
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
const calculateWidths = (_this: HTMLElement) => {
    totalWidth = getElementContentWidth(_this);
    // Check if parent is the navwrapper before calculating its width

    if (_this.querySelector(navDropdownSelector)?.parentNode === _this) {
        dropDownWidth = _this.querySelector<HTMLElement>(navDropdownSelector)!
            .offsetWidth;
    } else {
        dropDownWidth = 0;
    }
    restWidth = getChildrenWidth(_this) + defaultSettings.offsetPixels;
    viewportWidth = viewportSize().width;
};

/**
 * Check if dropdown menu is already on page before creating it
 * @param mainNavWrapper
 */
const prepareHtml = (_this: HTMLElement, config: Config) => {
    // TODO this function re-uses variables - navDropdown is set
    // to an HTMLElement and then changed to a string later on.

    /**
     * Create dropdow menu
     * @type {HTMLElement}
     */
    toggleWrapper = document.createElement('span');
    navDropdown = document.createElement('ul');
    navDropdownToggle = document.createElement('button');
    navDropdownToggleLabel = document.createElement('span');

    /**
     * Set label for dropdown toggle
     * @type {string}
     */
    navDropdownToggle.innerHTML = config.navDropdownLabel;

    navDropdownToggleLabel.innerHTML = config.navDropdownToggleAriaLabel;

    /**
     * Set aria attributes for accessibility
     */
    navDropdownToggle.setAttribute('aria-expanded', 'false');
    navDropdownToggle.setAttribute('type', 'button');
    navDropdownToggle.setAttribute('aria-labelledby', 'priorityNavLabel');
    navDropdownToggleLabel.setAttribute('id', 'priorityNavLabel');
    navDropdown.setAttribute('aria-hidden', 'true');

    /**
     * Move elements to the right spot
     */
    if (_this.querySelector(mainNav)!.parentNode !== _this) {
        console.warn(
            'mainNav is not a direct child of mainNavWrapper, double check please'
        );
        return;
    }

    insertAfter(toggleWrapper, _this.querySelector(mainNav)!);

    toggleWrapper.appendChild(navDropdownToggleLabel);
    toggleWrapper.appendChild(navDropdownToggle);
    toggleWrapper.appendChild(navDropdown);

    /**
     * Add classes so we can target elements
     */
    navDropdown.classList.add(config.navDropdownClassName);
    navDropdown.classList.add('priority-nav__dropdown');

    navDropdownToggle.classList.add(config.navDropdownToggleClassName);
    navDropdownToggle.classList.add('priority-nav__dropdown-toggle');

    // fix so button is type="button" and do not submit forms
    navDropdownToggle.setAttribute('type', 'button');

    toggleWrapper.classList.add(`${config.navDropdownClassName}-wrapper`);
    toggleWrapper.classList.add('priority-nav__wrapper');

    _this.classList.add('priority-nav');
};

/**
 * Move item to array
 * @param item
 */
GreedyNav.doesItFit = (_this: HTMLElement) => {
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
        calculateWidths(_this);

        /**
         * Keep executing until all menu items that are overflowing are moved
         */
        while (
            (totalWidth <= restWidth &&
                _this.querySelector<HTMLElement>(mainNav)!.children.length >
                    0) ||
            (viewportWidth < defaultSettings.breakPoint &&
                _this.querySelector<HTMLElement>(mainNav)!.children.length > 0)
        ) {
            // move item to dropdown
            GreedyNav.toDropdown(_this, identifier);
            // recalculate widths
            calculateWidths(_this);
            // update dropdownToggle label
            if (viewportWidth < defaultSettings.breakPoint) {
                updateLabel(_this, defaultSettings.navDropdownBreakpointLabel);
            }
        }

        /**
         * Keep executing until all menu items that are able to move back are moved
         */
        while (
            totalWidth >= breaks[identifier][breaks[identifier].length - 1] &&
            viewportWidth > defaultSettings.breakPoint
        ) {
            // move item to menu
            GreedyNav.toMenu(_this, identifier);
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
                .querySelector<HTMLElement>(navDropdownSelector)!
                .classList.remove('show');
            // show navDropdownLabel
            updateLabel(_this, defaultSettings.navDropdownLabel);
        }

        /**
         * If there are no items in menu
         */
        if (_this.querySelector<HTMLElement>(mainNav)!.children.length < 1) {
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
};

/**
 * Move item to dropdown
 */
GreedyNav.toDropdown = (_this: HTMLElement, identifier: Identifier) => {
    /**
     * move last child of navigation menu to dropdown
     */
    if (
        _this.querySelector<HTMLElement>(navDropdownSelector)!.firstChild &&
        _this.querySelector<HTMLElement>(mainNav)!.children.length > 0
    ) {
        _this
            .querySelector<HTMLElement>(navDropdownSelector)!
            .insertBefore(
                _this.querySelector<HTMLElement>(mainNav)!.lastElementChild!,
                _this.querySelector<HTMLElement>(navDropdownSelector)!
                    .firstChild
            );
    } else if (_this.querySelector<HTMLElement>(mainNav)!.children.length > 0) {
        _this
            .querySelector<HTMLElement>(navDropdownSelector)!
            .appendChild(
                _this.querySelector<HTMLElement>(mainNav)!.lastElementChild!
            );
    }

    /**
     * store breakpoints
     */
    breaks[identifier].push(restWidth);

    /**
     * check if we need to show toggle menu button
     */
    showToggle(_this, identifier);

    /**
     * update count on dropdown toggle button
     */
    if (
        _this.querySelector<HTMLElement>(mainNav)!.children.length > 0 &&
        defaultSettings.count
    ) {
        updateCount(_this, identifier);
    }

    /**
     * If item has been moved to dropdown trigger the callback
     */
    defaultSettings.moved();
};

/**
 * Move item to menu
 */
GreedyNav.toMenu = (_this: HTMLElement, identifier: Identifier) => {
    /**
     * move last child of navigation menu to dropdown
     */
    if (
        _this.querySelector<HTMLElement>(navDropdownSelector)!.children.length >
        0
    ) {
        _this
            .querySelector<HTMLElement>(mainNav)!
            .appendChild(
                _this.querySelector<HTMLElement>(navDropdownSelector)!
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
        _this.querySelector<HTMLElement>(mainNav)!.children.length > 0 &&
        defaultSettings.count
    ) {
        updateCount(_this, identifier);
    }

    /**
     * If item has been moved back to the main menu trigger the callback
     */
    defaultSettings.movedBack();
};

/**
 * Bind eventlisteners
 */
function listeners(_this: HTMLElement, settings: Config) {
    // Check if an item needs to move
    // if (window.attachEvent) {
    //     window.attachEvent('onresize', () => {
    //         if (priorityNav.doesItFit) priorityNav.doesItFit(_this);
    //     });
    // } else if (window.addEventListener) {
    window.addEventListener('resize', () => {
        if (GreedyNav.doesItFit) GreedyNav.doesItFit(_this);
    });

    window.addEventListener(
        'orientationchange',
        () => {
            if (GreedyNav.doesItFit) GreedyNav.doesItFit(_this);
        },
        true
    );
    // }

    // Toggle dropdown
    _this
        .querySelector(navDropdownToggleSelector)!
        .addEventListener('mousedown', event => {
            event.stopPropagation();
            toggleClass(
                _this.querySelector<HTMLElement>(navDropdownSelector)!,
                'show'
            );
            toggleClass(<HTMLElement>event.currentTarget!, 'is-open'); // TODO find out what this is meant to be
            toggleClass(_this, 'is-open');

            /**
             * Toggle aria hidden for accessibility
             */
            if (_this.classList.contains('is-open')) {
                _this
                    .querySelector(navDropdownSelector)!
                    .setAttribute('aria-hidden', 'true');

                updateLabel(_this, settings.navDropdownLabelActive);

                _this.querySelector<HTMLElement>(navDropdownSelector)!.blur();
            } else {
                _this
                    .querySelector(navDropdownSelector)!
                    .setAttribute('aria-hidden', 'false');

                updateLabel(_this, settings.navDropdownLabel);
            }
        });

    const lastItemCloseHandler = (event: FocusEvent) => {
        if (!parent(<HTMLElement>event.relatedTarget, toggleWrapper)) {
            removeClass(
                _this.querySelector<HTMLElement>(navDropdownSelector)!,
                'show'
            );
            removeClass(
                _this.querySelector<HTMLElement>(navDropdownToggleSelector)!,
                'is-open'
            );
            removeClass(_this, 'is-open');
            updateLabel(_this, settings.navDropdownLabel);
            _this
                .querySelector<HTMLElement>(
                    `${navDropdownSelector} li:last-child a`
                )!
                .removeEventListener(blurEventName, lastItemCloseHandler);
        }
    };

    _this
        .querySelector<HTMLElement>(navDropdownToggleSelector)!
        .addEventListener('focus', function handler(event: FocusEvent) {
            if (_this.className.indexOf('is-open') === -1) {
                addClass(
                    _this.querySelector<HTMLElement>(navDropdownSelector)!,
                    'show'
                );
                addClass(this, 'is-open');
                addClass(_this, 'is-open');
                updateLabel(_this, settings.navDropdownLabelActive);

                /**
                 * Toggle aria hidden for accessibility
                 */
                _this
                    .querySelector<HTMLElement>(navDropdownSelector)!
                    .setAttribute('aria-hidden', 'false');
                _this.querySelector<HTMLElement>(navDropdownSelector)!.blur();
            }
        });

    _this
        .querySelector<HTMLElement>(navDropdownToggleSelector)!
        .addEventListener(blurEventName, function handler(e: FocusEvent) {
            if (!parent(<HTMLElement>e.relatedTarget, toggleWrapper)) {
                // clean up
                document
                    .querySelector<HTMLElement>(
                        `${navDropdown} li:last-child a`
                    )!
                    .removeEventListener(blurEventName, lastItemCloseHandler);

                removeClass(
                    _this.querySelector<HTMLElement>(navDropdownSelector)!,
                    'show'
                );
                removeClass(this, 'is-open');
                removeClass(_this, 'is-open');

                updateLabel(_this, settings.navDropdownLabel);

                /**
                 * Toggle aria hidden for accessibility
                 */
                _this
                    .querySelector<HTMLElement>(navDropdownSelector)!
                    .setAttribute('aria-hidden', 'false');
            } else {
                document
                    .querySelector<HTMLElement>(
                        `${navDropdownSelector} li:last-child a`
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
                `.${settings.navDropdownClassName}`
            ) &&
            event.target !== _this.querySelector(navDropdownToggleSelector)
        ) {
            _this
                .querySelector<HTMLElement>(navDropdownSelector)!
                .classList.remove('show');
            _this
                .querySelector<HTMLElement>(navDropdownToggleSelector)!
                .classList.remove('is-open');
            _this.classList.remove('is-open');
            updateLabel(_this, settings.navDropdownLabel);
        }
    });

    /**
     * Remove when escape key is pressed
     */
    document.onkeydown = (evt: KeyboardEvent) => {
        const event = evt || window.event;
        if (event.keyCode === 27) {
            document
                .querySelector<HTMLElement>(navDropdownSelector)!
                .classList.remove('show');
            document
                .querySelector<HTMLElement>(navDropdownToggleSelector)!
                .classList.remove('is-open');
            mainNavWrapper.classList.remove('is-open');
        }
    };
}

/**
 * Remove function
 */
// Element.prototype.remove = function() {
//     this.parentElement!.removeChild(this);
// };

// /* global HTMLCollection */
// NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
//     for (let i = 0, len = this.length; i < len; i++) {
//         if (this[i] && this[i].parentElement) {
//             this[i].parentElement!.removeChild(this[i]);
//         }
//     }
// };

/**
 * Destroy the current initialization.
 * @public
 */
GreedyNav.destroy = () => {
    // If plugin isn"t already initialized, stop
    if (!defaultSettings) return;
    // Remove feedback class
    document.documentElement.classList.remove(defaultSettings.initClass);
    // Remove toggle
    toggleWrapper.remove();
    // Remove settings
    // settings = null; // TODO: Cleanup settings another way
    delete GreedyNav.init;
    delete GreedyNav.doesItFit;
};

/**
 * Initialize Plugin
 * @public
 * @param {Object} options User settings
 */
GreedyNav.init = (options?: Config) => {
    /**
     * Merge user options with defaults
     * @type {Object}
     */
    defaultSettings = { ...defaultConfig, ...(options || {}) };

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
    const elements = document.querySelectorAll<HTMLElement>(
        defaultSettings.mainNavWrapper
    );

    /**
     * Loop over every instance and reference _this
     */
    elements.forEach(_this => {
        /**
         * Create breaks array
         * @type {number}
         */
        breaks[count] = [];

        /**
         * Set the instance number as data attribute
         */
        _this.setAttribute('instance', `${count++}`);

        /**
         * Store the wrapper element
         */
        mainNavWrapper = _this;
        if (!mainNavWrapper) {
            console.warn("couldn't find the specified mainNavWrapper element");
            return;
        }

        /**
         * Store the menu elementStore the menu element
         */
        mainNav = defaultSettings.mainNav;
        if (!_this.querySelector(mainNav)) {
            console.warn("couldn't find the specified mainNav element");
            return;
        }

        /**
         * Check if we need to create the dropdown elements
         */
        prepareHtml(_this, defaultSettings);

        /**
         * Store the dropdown element
         */
        navDropdownSelector = `.${defaultSettings.navDropdownClassName}`;
        if (!_this.querySelector(navDropdownSelector)) {
            console.warn("couldn't find the specified navDropdown element");
            return;
        }

        /**
         * Store the dropdown toggle element
         */
        navDropdownToggleSelector = `.${defaultSettings.navDropdownToggleClassName}`;
        if (!_this.querySelector(navDropdownToggleSelector)) {
            console.warn(
                "couldn't find the specified navDropdownToggle element"
            );
            return;
        }

        /**
         * Event listeners
         */
        listeners(_this, defaultSettings);

        /**
         * Start first check
         */
        GreedyNav.doesItFit(_this);
    });

    /**
     * Count amount of instances
     */
    instance++;

    /**
     * Add class to HTML element to activate conditional CSS
     */
    document.documentElement.classList.add(defaultSettings.initClass);
};

export default GreedyNav;
