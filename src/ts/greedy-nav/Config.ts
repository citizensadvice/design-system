interface Config {
  /**
   * Class that will be printed on html element to allow conditional css styling.
   */
  initClass: string;
  /**
   * mainnav wrapper selector (must be direct parent from mainNav)
   */
  mainNavWrapper: string;
  /**
   * mainnav selector. (must be inline-block)
   */
  mainNav: string;
  /**
   * class used for the dropdown.
   */
  navDropdownClassName: string;
  /**
   * class used for the dropdown toggle.
   */
  navDropdownToggleClassName: string;
  /**
   * Aria text label for the dropdown toggle button
   */
  navDropdownToggleAriaLabel: string;
  /**
   * Text that is used for the dropdown toggle.
   */
  navDropdownLabel: string;
  /**
   * Text that is used for the dropdown toggle when menu is open
   */
  navDropdownLabelActive: string;
  /**
   * button label for navDropdownToggle when the breakPoint is reached.
   */
  navDropdownBreakpointLabel: string;
  /**
   * amount of pixels when all menu items should be moved to dropdown to simulate a mobile menu
   */
  breakPoint: number;
  /**
   * this will throttle the calculating logic on resize because i'm a responsible dev.
   */
  throttleDelay: number;
  /**
   * increase to decrease the time it takes to move an item.
   */
  offsetPixels: number;
  /**
   * prints the amount of items are moved to the attribute data-count to style with css counter.
   */
  count: true;

  // Callbacks
  moved: () => void;
  movedBack: () => void;
}

const defaultConfig: Config = {
  initClass: 'js-CadsGreedyNav',
  mainNavWrapper: '.js-cads-greedy-nav',
  mainNav: 'ul',
  navDropdownClassName: 'cads-greedy-nav__dropdown',
  navDropdownToggleClassName: 'cads-greedy-nav__dropdown-toggle',
  navDropdownToggleAriaLabel: 'More navigation options',
  navDropdownLabel: 'More',
  navDropdownLabelActive: 'Close',
  navDropdownBreakpointLabel: 'menu',
  breakPoint: 0,
  throttleDelay: 50,
  /* Offset pixels add a tolerance to when an item is removed from the nav and put in the dropdown.
   * Aligning the nav with the grid in NP-1026 makes the contents of the nav 2px too wide for
   * GreedyNav's calculations and puts the last nav item in the dropdown at lg.  This offset prevents
   * that from occuring whilst maintainng the otherwise correct behaviour of GreedyNav.
   */
  offsetPixels: -10,
  count: true,

  // Callbacks
  moved: () => null,
  movedBack: () => null,
};

export { defaultConfig, Config };
