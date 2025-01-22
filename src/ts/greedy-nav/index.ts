import GreedyNav from './GreedyNav';

// Delegate to old init script for backwards compatibility
export function initGreedyNav(options = {}) {
  GreedyNav.init(options);
}

export { GreedyNav };
export default GreedyNav;
