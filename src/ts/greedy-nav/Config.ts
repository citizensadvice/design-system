interface Config {
    /*
     * Class that will be printed on html element to allow conditional css styling.
     */
    initClass: string;
    /*
     * mainnav wrapper selector (must be direct parent from mainNav)
     */
    mainNavWrapper: string;
    /*
     * mainnav selector. (must be inline-block)
     */
    mainNav: string;
    /*
     * class used for the dropdown.
     */
    navDropdownClassName: string;
    /*
     * class used for the dropdown toggle.
     */
    navDropdownToggleClassName: string;
    /*
     * Aria text label for the dropdown toggle button
     */
    navDropdownToggleAriaLabel: string;
    /*
     * Text that is used for the dropdown toggle.
     */
    navDropdownLabel: string;
    /*
     * Text that is used for the dropdown toggle when menu is open
     */
    navDropdownLabelActive: string;
    /*
     * button label for navDropdownToggle when the breakPoint is reached.
     */
    navDropdownBreakpointLabel: string;
    /*
     * amount of pixels when all menu items should be moved to dropdown to simulate a mobile menu
     */
    breakPoint: number;
    /*
     * this will throttle the calculating logic on resize because i'm a responsible dev.
     */
    throttleDelay: number;
    /*
     * increase to decrease the time it takes to move an item.
     */
    offsetPixels: number;
    /*
     * prints the amount of items are moved to the attribute data-count to style with css counter.
     */
    count: true;

    // Callbacks
    moved: () => void;
    movedBack: () => void;
}

const defaultConfig: Config = {
    initClass: 'js-priorityNav',
    mainNavWrapper: 'nav',
    mainNav: 'ul',
    navDropdownClassName: 'nav__dropdown',
    navDropdownToggleClassName: 'nav__dropdown-toggle',
    navDropdownToggleAriaLabel: 'More navigation options',
    navDropdownLabel: 'More',
    navDropdownLabelActive: 'Close',
    navDropdownBreakpointLabel: 'menu',
    breakPoint: 500,
    throttleDelay: 50,
    offsetPixels: 0,
    count: true,

    // Callbacks
    moved: () => null,
    movedBack: () => null
};

export { defaultConfig, Config };
