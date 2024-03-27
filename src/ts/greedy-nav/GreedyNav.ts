import initNavigation from '../navigation';

// Delegate to new navigation script for backwards compatibility
const GreedyNav = {
  init: (_options = {}) => {
    initNavigation();
  },
};

export default GreedyNav;
