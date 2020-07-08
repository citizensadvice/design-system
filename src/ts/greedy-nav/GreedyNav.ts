import { blurEventName } from './helpers';
import { Config, defaultConfig } from './Config';

const root = window;

/**
 * Variables
 */
const priorityNav = {}; // Object for public APIs
/**
 * Object to store instances with breakpoints where the instances menu item"s didin"t fit.
 */
const breaks: number[][] = [[]];
const supports = !!document.querySelector && !!root.addEventListener; // Feature test
let settings: Config = defaultConfig;
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

/**
 * Get the closest matching element up the DOM tree
 * @param {Element} elem Starting element
 * @param {String} selector Selector to match against (class, ID, or data attribute)
 * @return {Boolean|Element} Returns false if not match found
 */
const getClosest = (elem: HTMLElement | HTMLDocument, selector: string) => {
    const firstChar = selector.charAt(0);
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (firstChar === '.') {
            if (elem.classList.contains(selector.substr(1))) {
                return elem;
            }
        } else if (firstChar === '#') {
            if (elem.id === selector.substr(1)) {
                return elem;
            }
        } else if (firstChar === '[') {
            if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
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
function debounce(func: () => void, wait: number, immediate?: boolean) {
    let timeout: number | null;
    let finishedTimeout: number;
    return function() {
        const context = this; // TODO: figure out what this should be
        const args = arguments;
        const later = function() {
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
const parent = (element: HTMLElement, parent: Node) => {
    let el: (Node & ParentNode) | null = element;
    while (el !== null) {
        if (el.parentNode === parent) {
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

        el.className = classes.join(' ');
    }
};

const removeClass = (el: HTMLElement, className: string) => {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp(`s?${className}s?`), '');
    }
};

const addClass = (el: HTMLElement, className: string) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className = `${el.className} ${className}`;
    }
};

/**
 * Check if dropdown menu is already on page before creating it
 * @param mainNavWrapper
 */
 const prepareHtml = (_this: HTMLElement, settings: Config) => {

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
    navDropdownToggle.innerHTML = settings.navDropdownLabel;

    navDropdownToggleLabel.innerHTML = settings.navDropdownToggleAriaLabel;

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

    _this.insertAfter(toggleWrapper, _this.querySelector(mainNav));

    toggleWrapper.appendChild(navDropdownToggleLabel);
    toggleWrapper.appendChild(navDropdownToggle);
    toggleWrapper.appendChild(navDropdown);

    /**
     * Add classes so we can target elements
     */
    navDropdown.classList.add(settings.navDropdownClassName);
    navDropdown.classList.add('priority-nav__dropdown');

    navDropdownToggle.classList.add(settings.navDropdownToggleClassName);
    navDropdownToggle.classList.add('priority-nav__dropdown-toggle');

    // fix so button is type="button" and do not submit forms
    navDropdownToggle.setAttribute('type', 'button');

    toggleWrapper.classList.add(`${settings.navDropdownClassName}-wrapper`);
    toggleWrapper.classList.add('priority-nav__wrapper');

    _this.classList.add('priority-nav');
};

/**
 * Get innerwidth without padding
 * @param element
 * @returns {number}
 */
const getElementContentWidth = (element: HTMLElement) =>{
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
 * Get width
 * @param elem
 * @returns {number}
 */
const calculateWidths = (_this: HTMLElement) => {
    totalWidth = getElementContentWidth(_this);
    // Check if parent is the navwrapper before calculating its width

    if (_this.querySelector(navDropdownSelector)?.parentNode === _this) {
        dropDownWidth = _this.querySelector(navDropdownSelector).offsetWidth;
    } else {
        dropDownWidth = 0;
    }
    restWidth = getChildrenWidth(_this) + settings.offsetPixels;
    viewportWidth = viewportSize().width;
};

/**
 * Move item to array
 * @param item
 */
priorityNav.doesItFit = (_this: HTMLElement) => {
    /**
     * Check if it is the first run
     */
    var delay =
        _this.getAttribute('instance') === 0 ? delay : settings.throttleDelay;

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
        const identifier = _this.getAttribute('instance');

        /**
         * Update width
         */
        calculateWidths(_this);

        /**
         * Keep executing until all menu items that are overflowing are moved
         */
        while (
            (totalWidth <= restWidth &&
                _this.querySelector(mainNav).children.length > 0) ||
            (viewportWidth < settings.breakPoint &&
                _this.querySelector(mainNav).children.length > 0)
        ) {
            // move item to dropdown
            priorityNav.toDropdown(_this, identifier);
            // recalculate widths
            calculateWidths(_this, identifier);
            // update dropdownToggle label
            if (viewportWidth < settings.breakPoint) {
                updateLabel(_this, settings.navDropdownBreakpointLabel);
            }
        }

        /**
         * Keep executing until all menu items that are able to move back are moved
         */
        while (
            totalWidth >= breaks[identifier][breaks[identifier].length - 1] &&
            viewportWidth > settings.breakPoint
        ) {
            // move item to menu
            priorityNav.toMenu(_this, identifier);
            // update dropdownToggle label
            if (viewportWidth > settings.breakPoint) {
                updateLabel(_this, settings.navDropdownLabel);
            }
        }

        /**
         * If there are no items in dropdown hide dropdown
         */
        if (breaks[identifier].length < 1) {
            _this.querySelector(navDropdownSelector).classList.remove('show');
            // show navDropdownLabel
            updateLabel(_this, settings.navDropdownLabel);
        }

        /**
         * If there are no items in menu
         */
        if (_this.querySelector(mainNav).children.length < 1) {
            // show navDropdownBreakpointLabel
            _this.classList.add('is-empty');
            updateLabel(_this, settings.navDropdownBreakpointLabel);
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
 * Show/hide toggle button
 */
const showToggle = (_this: HTMLElement, identifier: string) => {
    if (breaks[identifier].length < 1) {
        _this
            .querySelector(navDropdownToggleSelector)
            .classList.add('priority-nav-is-hidden');
        _this
            .querySelector(navDropdownToggleSelector)
            .classList.remove('priority-nav-is-visible');
        _this.classList.remove('priority-nav-has-dropdown');

        /**
         * Set aria attributes for accessibility
         */
        _this
            .querySelector('.priority-nav__wrapper')
            .setAttribute('aria-haspopup', 'false');
    } else {
        _this
            .querySelector(navDropdownToggleSelector)
            .classList.add('priority-nav-is-visible');
        _this
            .querySelector(navDropdownToggleSelector)
            .classList.remove('priority-nav-is-hidden');
        _this.classList.add('priority-nav-has-dropdown');

        /**
         * Set aria attributes for accessibility
         */
        _this
            .querySelector('.priority-nav__wrapper')
            .setAttribute('aria-haspopup', 'true');
    }
};

/**
 * Update count on dropdown toggle button
 */
const updateCount = (_this: HTMLElement, identifier: string) {
    _this
        .querySelector(navDropdownToggleSelector)
        .setAttribute('priorityNav-count', breaks[identifier].length);
};

const updateLabel = (_this: HTMLElement, label: string) {
    _this.querySelector(navDropdownToggleSelector).innerHTML = label;
    if (label === settings.navDropdownLabelActive) {
        _this
            .querySelector(navDropdownToggleSelecotr)
            .setAttribute('aria-expanded', 'true');
    } else {
        _this
            .querySelector(navDropdownToggleSlector)
            .setAttribute('aria-expanded', 'false');
    }
};

/**
 * Move item to dropdown
 */
priorityNav.toDropdown = (_this:HTMLElement, identifier: string) =>{
    /**
     * move last child of navigation menu to dropdown
     */
    if (
        _this.querySelector(navDropdownSelector).firstChild &&
        _this.querySelector(mainNav).children.length > 0
    ) {
        _this
            .querySelector(navDropdownSelector)
            .insertBefore(
                _this.querySelector(mainNav).lastElementChild,
                _this.querySelector(navDropdownSelector).firstChild
            );
    } else if (_this.querySelector(mainNav).children.length > 0) {
        _this
            .querySelector(navDropdown)
            .appendChild(_this.querySelector(mainNav).lastElementChild);
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
    if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
        updateCount(_this, identifier);
    }

    /**
     * If item has been moved to dropdown trigger the callback
     */
    settings.moved();
};

/**
 * Move item to menu
 */
priorityNav.toMenu = (_this:HTMLElement, identifier: string) => {
    /**
     * move last child of navigation menu to dropdown
     */
    if (_this.querySelector(navDropdownSelector).children.length > 0) {
        _this
            .querySelector(mainNav)
            .appendChild(_this.querySelector(navDropdownSelector).firstElementChild);
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
    if (_this.querySelector(mainNav).children.length > 0 && settings.count) {
        updateCount(_this, identifier);
    }

    /**
     * If item has been moved back to the main menu trigger the callback
     */
    settings.movedBack();
};

/**
 * Count width of children and return the value
 * @param e
 */
const getChildrenWidth = function(e) {
    const children = e.childNodes;
    let sum = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i].nodeType !== 3) {
            if (!isNaN(children[i].offsetWidth)) {
                sum += children[i].offsetWidth;
            }
        }
    }
    return sum;
};

/**
 * Bind eventlisteners
 */
function listeners(_this:HTMLElement, settings: Config) {
    // Check if an item needs to move
    // if (window.attachEvent) {
    //     window.attachEvent('onresize', () => {
    //         if (priorityNav.doesItFit) priorityNav.doesItFit(_this);
    //     });
    // } else if (window.addEventListener) {
    window.addEventListener('resize', () => {
        if (priorityNav.doesItFit) priorityNav.doesItFit(_this);
    });

    window.addEventListener(
        'orientationchange',
        () => {
            if (priorityNav.doesItFit) priorityNav.doesItFit(_this);
        },
        true
    );
    // }

    // Toggle dropdown
    _this
        .querySelector(navDropdownToggleSelector)!
        .addEventListener('mousedown', function(event) {
            event.stopPropagation();
            toggleClass(_this.querySelector(navDropdownSelector)!, 'show');
            toggleClass(this, 'is-open'); // TODO find out what this is meant to be
            toggleClass(_this, 'is-open');

            /**
             * Toggle aria hidden for accessibility
             */
            if (_this.classList.contains('is-open')) {
                _this
                    .querySelector(navDropdownSelector)!
                    .setAttribute('aria-hidden', 'true');

                updateLabel(_this, settings.navDropdownLabelActive);

                _this.querySelector(navDropdownSelector)?.blur();
            } else {
                _this
                    .querySelector(navDropdownSelector)!
                    .setAttribute('aria-hidden', 'false');

                updateLabel(_this, settings.navDropdownLabel);
            }
        });

    const lastItemCloseHandler = (event: FocusEvent) =>{
        if (!parent(event.relatedTarget, toggleWrapper)) {
            removeClass(_this.querySelector(navDropdownSelector)!, 'show');
            removeClass(_this.querySelector(navDropdownToggleSelector)!, 'is-open');
            removeClass(_this, 'is-open');
            updateLabel(_this, settings.navDropdownLabel);
            _this
                .querySelector(`${navDropdownSelector} li:last-child a`)!
                .removeEventListener(blurEventName, lastItemCloseHandler);
        }
    };

    _this
        .querySelector(navDropdownToggleSelector)
        .addEventListener('focus', function(event) {
            if (_this.className.indexOf('is-open') === -1) {
                addClass(_this.querySelector(navDropdownSelector), 'show');
                addClass(this, 'is-open');
                addClass(_this, 'is-open');
                updateLabel(_this, settings.navDropdownLabelActive);

                /**
                 * Toggle aria hidden for accessibility
                 */
                _this
                    .querySelector(navDropdownSelector)
                    .setAttribute('aria-hidden', 'false');
                _this.querySelector(navDropdownSelector).blur();
            }
        });

    _this
        .querySelector(navDropdownToggleSelector)
        .addEventListener(blurEventName, function(e) {
            if (!parent(e.relatedTarget, toggleWrapper)) {
                // clean up
                document
                    .querySelector(`${navDropdown} li:last-child a`)
                    .removeEventListener(blurEventName, lastItemCloseHandler);

                removeClass(_this.querySelector(navDropdownSelctor), 'show');
                removeClass(this, 'is-open');
                removeClass(_this, 'is-open');

                updateLabel(_this, settings.navDropdownLabel);

                /**
                 * Toggle aria hidden for accessibility
                 */
                _this
                    .querySelector(navDropdownSelector)
                    .setAttribute('aria-hidden', 'false');
            } else {
                document
                    .querySelector(`${navDropdownSelector} li:last-child a`)
                    .addEventListener(blurEventName, lastItemCloseHandler);
            }
        });

    /*
     * Close menu when last item is selected
     */

    /*
     * Remove when clicked outside dropdown
     */
    document.addEventListener('click', event => {
        if (
            !getClosest(event.target, `.${settings.navDropdownClassName}`) &&
            event.target !== _this.querySelector(navDropdownToggleSelector)
        ) {
            _this.querySelector(navDropdownSelector).classList.remove('show');
            _this.querySelector(navDropdownToggleSelector).classList.remove('is-open');
            _this.classList.remove('is-open');
            updateLabel(_this, settings.navDropdownLabel);
        }
    });

    /**
     * Remove when escape key is pressed
     */
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode === 27) {
            document.querySelector(navDropdownSelector).classList.remove('show');
            document
                .querySelector(navDropdownToggleSelector)
                .classList.remove('is-open');
            mainNavWrapper.classList.remove('is-open');
        }
    };
};

/**
 * Remove function
 */
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

/* global HTMLCollection */
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (let i = 0, len = this.length; i < len; i++) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

/**
 * Destroy the current initialization.
 * @public
 */
priorityNav.destroy = function() {
    // If plugin isn"t already initialized, stop
    if (!settings) return;
    // Remove feedback class
    document.documentElement.classList.remove(settings.initClass);
    // Remove toggle
    toggleWrapper.remove();
    // Remove settings
    settings = null;
    delete priorityNav.init;
    delete priorityNav.doesItFit;
};

/**
 * insertAfter function
 * @param n
 * @param r
 */
if (supports && typeof Node !== 'undefined') {
    Node.prototype.insertAfter = function(n, r) {
        this.insertBefore(n, r.nextSibling);
    };
}

const checkForSymbols = function(string) {
    const firstChar = string.charAt(0);
    if (firstChar === '.' || firstChar === '#') {
        return false;
    }
    return true;
};

/**
 * Initialize Plugin
 * @public
 * @param {Object} options User settings
 */
priorityNav.init = (options?: Config) => {
    /**
     * Merge user options with defaults
     * @type {Object}
     */
    settings = { ...defaultConfig, ...(options || {}) };

    // Feature test.
    if (!supports && typeof Node === 'undefined') {
        console.warn("This browser doesn't support priorityNav");
        return;
    }

    // Options check
    if (
        !checkForSymbols(settings.navDropdownClassName) ||
        !checkForSymbols(settings.navDropdownToggleClassName)
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
    const elements = document.querySelectorAll(settings.mainNavWrapper);

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
        _this.setAttribute('instance', count++);

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
        mainNav = settings.mainNav;
        if (!_this.querySelector(mainNav)) {
            console.warn("couldn't find the specified mainNav element");
            return;
        }

        /**
         * Check if we need to create the dropdown elements
         */
        prepareHtml(_this, settings);

        /**
         * Store the dropdown element
         */
        navDropdownSelector = `.${settings.navDropdownClassName}`;
        if (!_this.querySelector(navDropdownSelector)) {
            console.warn("couldn't find the specified navDropdown element");
            return;
        }

        /**
         * Store the dropdown toggle element
         */
        navDropdownToggleSelector = `.${settings.navDropdownToggleClassName}`;
        if (!_this.querySelector(navDropdownToggleSelector)) {
            console.warn(
                "couldn't find the specified navDropdownToggle element"
            );
            return;
        }

        /**
         * Event listeners
         */
        listeners(_this, settings);

        /**
         * Start first check
         */
        priorityNav.doesItFit(_this);
    });

    /**
     * Count amount of instances
     */
    instance++;

    /**
     * Add class to HTML element to activate conditional CSS
     */
    document.documentElement.classList.add(settings.initClass);
};
